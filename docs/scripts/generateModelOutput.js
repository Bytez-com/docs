const fsSync = require('fs');
const fs = require('fs').promises;
const { INPUT_MAP } = require('./inputMap');
const jsTemplate = fsSync.readFileSync(`${__dirname}/jsTemplate.js`).toString();
const pyTemplate = fsSync.readFileSync(`${__dirname}/pyTemplate.py`).toString();

async function main() {
  // await modifyInputMap();

  for (const [task, { exampleModel: modelId, docExamples, http, sdk }] of Object.entries(
    INPUT_MAP
  )) {
    if (task !== 'object-detection') {
      continue;
    }

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
        console.log('On test: ', testName);
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
  }
}

async function generateCodeSnippets(modelId, requestInput, requestInputHttp, params, stream) {
  const js = formatIntoCodeSnippet(
    jsTemplate,
    params,
    stream,
    (sectionsAsString) => {
      if (params) {
        return sectionsAsString;
      }
      return sectionsAsString.replace(
        // notice how we're removing params
        `const { error, output } = await model.run(input, params);`,
        `const { error, output } = await model.run(input);`
      );
    },
    [
      { tokenId: `'$MODEL_ID'`, replaceWith: modelId },
      { tokenId: `'$INPUT'`, replaceWith: JSON.stringify(requestInput) },
      { tokenId: `'$PARAMS_PAYLOAD'`, replaceWith: JSON.stringify(params) },
    ]
  );

  const py = formatIntoCodeSnippet(
    pyTemplate,
    params,
    stream,
    (sectionsAsString) => {
      if (params) {
        return sectionsAsString;
      }
      // notice how we're removing params
      return sectionsAsString.replace(
        `error, output = model.run(input, params)`,
        `error, output = model.run(input)`
      );
    },
    [
      { tokenId: `"$MODEL_ID"`, replaceWith: modelId },
      { tokenId: `"$INPUT"`, replaceWith: JSON.stringify(requestInput) },
      { tokenId: `"$PARAMS_PAYLOAD"`, replaceWith: JSON.stringify(params) },
    ]
  );

  const curl = formatCurl(modelId, params, requestInputHttp, params, stream);

  console.log(curl);

  return {
    js,
    py,
    curl,
  };
}

function formatCurl(modelId, params, requestInput, params, stream) {
  if (requestInput.constructor.name !== 'Object'){
    throw new Error(`requestInput is not an object!`)
  }
  
  const body = {
    ...requestInput,
    params: params && Object.keys(params).length > 0 ? params : undefined,
    // do not include stream in the json if it's false, as it is redundant
    stream: stream || undefined
  }

  const lines = [
    `curl -X POST 'https://api.bytez.com/models/v2/${modelId}' \\`,
    `-H 'Authorization: BYTEZ_KEY' \\`,
    `-H 'Content-Type: application/json' \\`,
    `--data '${JSON.stringify(body, null, 2)}'`,
  ];

  const finalString = lines.join('\n');

  return finalString
}

function formatIntoCodeSnippet(template, params, stream, onBeforeUpdateTemplateIds, replacements) {
  const sectionsAsString = formatIntoSections(template, params, stream);
  const adjustedString = onBeforeUpdateTemplateIds(sectionsAsString);
  const finalString = updateTemplateIds(adjustedString, replacements);

  return finalString;
}

// this needs to handle 3 cases
// 1. no params, no streaming
// 2. params, with streaming
// 3. streaming with params
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

  if (!params) {
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

// async function modifyInputMap() {
//   for (const [task, { http, sdk }] of Object.entries(INPUT_MAP)) {
//     for (const tests of [http.shouldSucceed, http.shouldFail, sdk.shouldSucceed, sdk.shouldFail]) {
//       for (let i = 0; i < tests.length; i++) {
//         tests[i] = {
//           testName: '',
//           testDescription: '',
//           docsExample: {
//             mintlify: false,
//             dockerhub: false,
//           },
//           requestInput: tests[i],
//           params: {},
//           options: { stream: false },

//           mintlifyProps: {
//             exampleTitle: '',
//             exampleDescription: '',
//           },
//           dockerhubProps: {
//             description: '',
//           },
//         };
//       }

//       const a = 2;
//     }

//     const a = 2;

//     const tempSdk = sdk;
//     const tempHttp = http;

//     delete INPUT_MAP[task].sdk;
//     delete INPUT_MAP[task].http;

//     INPUT_MAP[task].docExamples = { shouldSucceed: [], shouldFail: [] };
//     INPUT_MAP[task].sdk = sdk;
//     INPUT_MAP[task].http = http;
//   }

//   await fs.writeFile(`${__dirname}/newInputMap.json`, JSON.stringify(INPUT_MAP, null, 2));

//   debugger;
// }
if (require.main === module) {
  main();
}
