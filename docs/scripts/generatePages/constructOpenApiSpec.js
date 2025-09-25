const { MODEL_DOCS_OBJECT } = require('./modelDocsObject');

function constructOpenApiSpec(task) {
  const config = MODEL_DOCS_OBJECT.tasks[task];

  const { description, exampleModel: modelId, openapiSpec } = config;

  const spec = {
    ...MODEL_DOCS_OBJECT.openapiSpec,
    paths: {
      [`/models/v2/${modelId}`]: {
        post: {
          summary: task,
          description,
          operationId: task,
          requestBody: {
            description: `Schema for ${task} models`,
            required: true,
            content: {
              'application/json': {
                schema: openapiSpec.requestBodyContentSchema,
              },
            },
          },
          responses: {
            200: {
              description: `Successful ${task} response.`,
              content: {
                'application/json': {
                  schema: openapiSpec.responseBodyContentSchema,
                },
              },
            },
          },
          security: [
            {
              apiKeyAuth: [],
            },
          ],
        },
      },
    },
  };

  return spec;
}

module.exports = { constructOpenApiSpec };
