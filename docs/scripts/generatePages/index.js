const fsSync = require('fs');
const fs = require('fs').promises;
const { Component } = require('./Component');
const { MODEL_DOCS_OBJECT } = require('./modelDocsObject');
const { constructOpenApiSpec } = require('./constructOpenApiSpec');

const JS_TEMPLATE = fsSync.readFileSync(`${__dirname}/jsTemplate.js`).toString();
const PY_TEMPLATE = fsSync.readFileSync(`${__dirname}/pyTemplate.py`).toString();

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
  ] of Object.entries(MODEL_DOCS_OBJECT.tasks)) {
    const tasksToProcess = [
      // 'text-generation',
      // 'chat',
      // 'audio-text-to-text',
      // 'image-text-to-text',
      // 'video-text-to-text',
      // 'fill-mask',
      // 'text-to-speech',
      // 'text-to-audio',
      // 'text-to-image',
      // 'translation',
      // 'summarization',
      // 'feature-extraction',
      // 'text-classification',
      // 'token-classification',
      // 'text2text-generation',
      // 'question-answering',
      // 'document-question-answering',
      // 'visual-question-answering',
      // 'zero-shot-object-detection',
      // 'zero-shot-image-classification',
      // 'zero-shot-classification',
      // 'image-to-text',
      // 'image-classification',
      // 'image-segmentation',
      // 'object-detection',
      // 'mask-generation',
      // 'image-feature-extraction',
      // 'sentence-similarity',
      // 'text-to-video',
      // 'video-classification',
      // 'automatic-speech-recognition',
      // 'audio-classification',
      // 'unconditional-image-generation',
    ];

    // if (!tasksToProcess.includes(task)) {
    //   continue;
    // }

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

        // if (exampleTitle !== 'Stream text') {
        //   continue;
        // }

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

    const treeString = AccordionGroup.toString();

    const header = constructPageHeader({ title, task, description, icon });

    const taskPage = `${header}\n\n${treeString}`;

    await fs.writeFile(`${__dirname}/../../model-api/docs/task/${task}.mdx`, taskPage);

    // now we make the HTTP spec
    const httpDir = `${__dirname}/../../http-reference/examples/open-source/${task}`;

    await fs.mkdir(httpDir, { recursive: true });

    const restTaskPage = [`---`, `openapi: post /models/v2/${modelId}`, `---`].join('\n');

    await fs.writeFile(`${httpDir}/${task}.mdx`, restTaskPage);

    const openApiSpec = constructOpenApiSpec(task, {
      title,
      description,
      icon,
      exampleModel: modelId,
      supportsUrlInput,
      supportsBase64Input,
      mediaInputType,
      docExamples,
    });

    await fs.writeFile(`${httpDir}/openapi.json`, JSON.stringify(openApiSpec, null, 2));
  }

  console.log('DONE');
  debugger;
}

function constructPageHeader({ title, task, description, icon }) {
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

  return header;
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
    JS_TEMPLATE,
    params,
    stream,
    (sectionsAsString) => {
      if (paramsExist(params)) {
        return sectionsAsString;
      }

      const replacedString = sectionsAsString
        .replace(
          // notice how we're removing params
          `const { error, output } = await model.run(input, params);`,
          `const { error, output } = await model.run(input);`
        )
        // notice how we're removing params, this is for the streaming case
        .replace(
          `const readStream = await model.run(input, params, stream);`,
          `const readStream = await model.run(input, stream);`
        );

      return replacedString;
    },
    [
      { tokenId: `'$MODEL_ID'`, replaceWith: `'${modelId}'` },
      { tokenId: `'$INPUT'`, replaceWith: JSON.stringify(requestInput, null, 2) },
      { tokenId: `'$PARAMS_PAYLOAD'`, replaceWith: JSON.stringify(params, null, 2) },
    ]
  );

  const py = formatIntoCodeSnippet(
    PY_TEMPLATE,
    params,
    stream,
    (sectionsAsString) => {
      if (paramsExist(params)) {
        return sectionsAsString;
      }

      const replacedString = sectionsAsString
        .replace(
          // notice how we're removing params
          `result = model.run(input, params)`,
          `result = model.run(input)`
        )
        // notice how we're removing params, this is for the streaming case
        .replace(
          `readStream = model.run(input, params, stream)`,
          `readStream = model.run(input, stream=stream)`
        );

      return replacedString;
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

  if (!paramsExist(params) && !stream) {
    const nonStreamingWithOutParamsString = [
      ...linesBeforeParamsSection,
      ...lines.slice(nonStreamingSectionIndex + 1, streamingSectionIndex),
    ].join('\n');

    return nonStreamingWithOutParamsString;
  }

  if (!paramsExist(params) && stream) {
    const streamingWithOutParamsString = [
      ...linesBeforeParamsSection,
      ...lines.slice(streamingSectionIndex + 1),
    ].join('\n');

    return streamingWithOutParamsString;
  }

  if (paramsExist(params) && stream) {
    const streamingWithParamsString = [
      ...linesBeforeParamsSection,
      ...lines.slice(paramsSectionIndex + 1, nonStreamingSectionIndex),
      ...lines.slice(streamingSectionIndex + 1),
    ].join('\n');

    return streamingWithParamsString;
  }

  if (paramsExist(params) && !stream) {
    const nonStreamingWithParamsString = [
      ...linesBeforeParamsSection,
      ...lines.slice(paramsSectionIndex + 1, nonStreamingSectionIndex),
      ...lines.slice(nonStreamingSectionIndex + 1, streamingSectionIndex),
    ].join('\n');

    return nonStreamingWithParamsString;
  }

  throw new Error('Unmatched case, this should never happen, there should only be 4 cases');
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
