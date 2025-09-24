const fsSync = require('fs');
const fs = require('fs').promises;
const { Component } = require('./Component');
const { MODEL_DOCS_OBJECT } = require('./modelDocsObject');
const jsTemplate = fsSync.readFileSync(`${__dirname}/jsTemplate.js`).toString();
const pyTemplate = fsSync.readFileSync(`${__dirname}/pyTemplate.py`).toString();

async function main() {
  for (const [
    task,
    {
      title,
      description,
      icon,
      exampleModel: modelId,
      supportsUrlInput,
      supportsBase64Input,
      mediaInputType,
      docExamples,
    },
  ] of Object.entries(MODEL_DOCS_OBJECT)) {
    const tasksToProcess = [
      // 'text-generation',
      'audio-text-to-text',
      'image-text-to-text',
      'video-text-to-text',
    ];

    if (!tasksToProcess.includes(task)) {
      continue;
    }
    console.log('Generating pages for task: ', task);

    const taskSnippets = [];

    for (const test of docExamples.shouldSucceed) {
      const {
        testName,
        requestInput,
        requestInputHttp,
        params,
        options: { stream },
        docsExample: { mintlify },
        mintlifyProps,
      } = test;

      if (mintlify) {
        const { exampleTitle, exampleDescription } = mintlifyProps;

        const { js, py, curl } = await generateCodeSnippets(
          modelId,
          requestInput,
          requestInputHttp,
          params,
          stream
        );

        taskSnippets.push({ exampleTitle, exampleDescription, js, py, curl });
      }
    }

    const accordions = [];

    let defaultOpen = true;

    for (const taskSnippet of taskSnippets) {
      const { exampleTitle, exampleDescription, js, py, curl } = taskSnippet;
      const accordion = toAccordion({
        exampleTitle,
        exampleDescription,
        supportsUrlInput,
        supportsBase64Input,
        mediaInputType,
        defaultOpen,
        js,
        py,
        curl,
      });

      // we only want the first one to be open
      defaultOpen = false;

      accordions.push(accordion);
    }

    const AccordionGroup = new Component({ name: 'AccordionGroup', children: accordions });

    const headerLines = [
      //
      `---`,
      `title: '${title || task}'`,
      `description: ${description}`,
      `icon: '${icon}'`,
      `mode: 'wide'`,
      `---`,
    ];

    const header = headerLines.join('\n');

    const treeString = AccordionGroup.toString();

    const taskPage = `${header}\n\n${treeString}`;

    await fs.writeFile(`${__dirname}/../../model-api/docs/task/${task}.mdx`, taskPage);
  }
}

function toAccordion({
  exampleTitle,
  exampleDescription,
  supportsUrlInput,
  supportsBase64Input,
  mediaInputType,
  defaultOpen,
  js,
  py,
  curl,
}) {
  const codeGroupItems = [];

  for (const { snippet, renderAs, label } of [
    { snippet: js, renderAs: 'javascript', label: 'javascript' },
    { snippet: py, renderAs: 'python', label: 'python' },
    { snippet: curl, renderAs: 'bash', label: 'http' },
  ]) {
    const codeGroupItem = `
\`\`\`${renderAs} ${label}
${snippet}
\`\`\`
`.trim();

    codeGroupItems.push(codeGroupItem);
  }

  const codeGroupsString = codeGroupItems.join('\n');

  const shouldHaveBase64Details = supportsUrlInput && supportsBase64Input;

  const base64Details = `
You can send the **${mediaInputType}** via \`url\` or \`base64\` data URL.

We recommend \`url\` for better performance, as \`base64\` increases payload size.
`.trim();

  const Accordion = new Component({
    name: 'Accordion',
    props: { defaultOpen, title: exampleTitle },
    children: [
      exampleDescription,
      new Component({
        name: 'CodeGroup',
        children: [codeGroupsString, ...(shouldHaveBase64Details ? [base64Details] : [])],
      }),
    ],
  });

  return Accordion;
}

async function generateCodeSnippets(modelId, requestInput, requestInputHttp, params, stream) {
  const js = formatIntoCodeSnippet(
    jsTemplate,
    params,
    stream,
    (sectionsAsString) => {
      if (paramsExist(params)) {
        return sectionsAsString;
      }
      return sectionsAsString.replace(
        // notice how we're removing params
        `const { error, output } = await model.run(input, params);`,
        `const { error, output } = await model.run(input);`
      );
    },
    [
      { tokenId: `'$MODEL_ID'`, replaceWith: `'${modelId}'` },
      { tokenId: `'$INPUT'`, replaceWith: JSON.stringify(requestInput, null, 2) },
      { tokenId: `'$PARAMS_PAYLOAD'`, replaceWith: JSON.stringify(params, null, 2) },
    ]
  );

  const py = formatIntoCodeSnippet(
    pyTemplate,
    params,
    stream,
    (sectionsAsString) => {
      if (paramsExist(params)) {
        return sectionsAsString;
      }
      // notice how we're removing params
      return sectionsAsString.replace(
        `error, output = model.run(input, params)`,
        `error, output = model.run(input)`
      );
    },
    [
      { tokenId: `"$MODEL_ID"`, replaceWith: `"${modelId}"` },
      { tokenId: `"$INPUT"`, replaceWith: JSON.stringify(requestInput, null, 2) },
      { tokenId: `"$PARAMS_PAYLOAD"`, replaceWith: JSON.stringify(params, null, 2) },
    ]
  );

  const curl = formatCurl(modelId, requestInputHttp, params, stream);

  return {
    js,
    py,
    curl,
  };
}

function formatCurl(modelId, requestInput, params, stream) {
  if (requestInput.constructor.name !== 'Object') {
    throw new Error(`requestInput is not an object!`);
  }

  const body = {
    ...requestInput,
    params: paramsExist(params) ? params : undefined,
    // do not include stream in the json if it's false, as it is redundant
    stream: stream || undefined,
  };

  const lines = [
    `curl -X POST 'https://api.bytez.com/models/v2/${modelId}' \\`,
    `-H 'Authorization: BYTEZ_KEY' \\`,
    `-H 'Content-Type: application/json' \\`,
    `--data '${JSON.stringify(body, null, 2)}'`,
  ];

  const finalString = lines.join('\n');

  return finalString;
}

function formatIntoCodeSnippet(template, params, stream, onBeforeUpdateTemplateIds, replacements) {
  const sectionsAsString = formatIntoSections(template, params, stream);
  const adjustedString = onBeforeUpdateTemplateIds(sectionsAsString);
  const finalString = updateTemplateIds(adjustedString, replacements);

  return finalString;
}

function formatIntoSections(templateString, params, stream) {
  const lines = templateString.split('\n');

  const sections = [
    { templateId: '$PARAMS_SECTION', index: undefined },
    { templateId: '$NON_STREAMING_SECTION', index: undefined },
    { templateId: '$STREAMING_SECTION', index: undefined },
  ];

  for (const section of sections) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.includes(section.templateId)) {
        section.index = i;
      }
    }
  }

  const [
    { index: paramsSectionIndex },
    { index: nonStreamingSectionIndex },
    { index: streamingSectionIndex },
  ] = sections;

  const linesBeforeParamsSection = lines.slice(0, paramsSectionIndex);

  if (!paramsExist(params)) {
    const nonStreamingWithOutParamsString = [
      ...linesBeforeParamsSection,
      ...lines.slice(nonStreamingSectionIndex + 1, streamingSectionIndex),
    ].join('\n');

    return nonStreamingWithOutParamsString;
  }

  if (!stream) {
    const nonStreamingWithParamsString = [
      ...linesBeforeParamsSection,
      ...lines.slice(paramsSectionIndex + 1, nonStreamingSectionIndex),
      ...lines.slice(nonStreamingSectionIndex + 1, streamingSectionIndex),
    ].join('\n');

    return nonStreamingWithParamsString;
  }

  const streamingWithParamsString = [
    ...linesBeforeParamsSection,
    ...lines.slice(paramsSectionIndex + 1, nonStreamingSectionIndex),
    ...lines.slice(streamingSectionIndex + 1),
  ].join('\n');

  return streamingWithParamsString;
}

function updateTemplateIds(string, replacements) {
  let updatedString = string;
  for (const { tokenId, replaceWith } of replacements) {
    updatedString = updatedString.replaceAll(tokenId, replaceWith);
  }

  return updatedString;
}

function paramsExist(params) {
  return params && Object.keys(params).length > 0;
}

if (require.main === module) {
  main();
}
