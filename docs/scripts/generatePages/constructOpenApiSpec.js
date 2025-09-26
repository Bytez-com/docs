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
            401: {
              description: "Auth error - check your api key and how you're sending it.",
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        example: 'Unauthorized',
                      },
                      output: {
                        type: 'string',
                        example: null,
                      },
                    },
                  },
                },
              },
            },
            429: {
              description: 'Too Many Requests – You have hit the rate limit.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        example: 'Rate limit exceeded',
                      },
                      output: {
                        type: 'string',
                        example: null,
                      },
                    },
                  },
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
