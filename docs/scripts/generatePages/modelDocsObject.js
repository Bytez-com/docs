/* eslint-disable max-len */
const MODEL_DOCS_OBJECT = {
  // serves as the preamble for the api
  openapiSpec: {
    openapi: '3.0.3',
    info: {
      title: 'Open Source AI Models API – Multimodal',
      description:
        'API for running open-source AI models that take text, vision, audio, and video as input.',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://api.bytez.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        apiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description:
            "Set `Authorization` header to `BYTEZ_KEY` \n``` 'Authorization: YOUR_BYTEZ_KEY_HERE' ```\n",
        },
      },
    },
  },
  tasks: {
    'text-generation': {
      exampleModel: 'openai-community/gpt2',
      description:
        'Generate text from an initial prompt for applications like story generation, dialogue systems, and creative writing',
      icon: 'message-text',
      supportsTextStreaming: true,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The input text prompt to generate text from.',
              example: 'Once upon a time there was a beautiful home where',
            },
            stream: {
              type: 'boolean',
              description: 'Enable text streaming.',
            },
            params: {
              type: 'object',
              description: 'Model-specific parameters.',
              properties: {
                min_length: {
                  type: 'integer',
                  description: 'Minimum length of the generated text.',
                  example: 10,
                },
                max_length: {
                  type: 'integer',
                  description: 'Maximum length of the generated text.',
                  example: 100,
                },
                temperature: {
                  type: 'number',
                  format: 'float',
                  description: 'Sampling temperature. Higher values = more random output.',
                  example: 0.7,
                },
              },
            },
          },
          required: ['text'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'string',
              description: 'The generated text completion.',
              example:
                'Once upon a time there was a beautiful home where a woman, who, after a long journey, had been able to return to her family...',
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, no params',
            testDescription: 'Send a prompt to a model to generate text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: 'Once upon a time there was a beautiful home where',
            requestInputHttp: {
              text: 'Once upon a time there was a beautiful home where',
            },
            params: undefined,
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send a prompt to a model to generate text',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'Once upon a time there was a beautiful home where',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              text: 'Once upon a time there was a beautiful home where',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'Once upon a time there was a beautiful home where',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    chat: {
      title: "Get started",
      exampleModel: 'Qwen/Qwen3-4B',
      description: 'Use the latest AI chat models',
      icon: 'comments',
      supportsTextStreaming: true,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            messages: {
              type: 'array',
              description: 'Conversation history.',
              items: {
                type: 'object',
                required: ['role', 'content'],
                properties: {
                  role: {
                    type: 'string',
                    enum: ['system', 'user', 'assistant'],
                  },
                  content: {
                    oneOf: [
                      {
                        type: 'string',
                      },
                      {
                        type: 'array',
                        items: {
                          type: 'object',
                          required: ['type', 'text'],
                          properties: {
                            type: {
                              type: 'string',
                              enum: ['text'],
                            },
                            text: {
                              type: 'string',
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
              example: [
                {
                  role: 'system',
                  content: 'You are a friendly chatbot',
                },
                {
                  role: 'assistant',
                  content: "Hello, I'm a friendly bot",
                },
                {
                  role: 'user',
                  content: 'Hello bot, what is the capital of England?',
                },
              ],
            },
            stream: {
              type: 'boolean',
              description: 'Enable text streaming.',
            },
            params: {
              type: 'object',
              description: 'Model-specific parameters.',
              properties: {
                min_length: {
                  type: 'integer',
                  description: 'Minimum length of the generated text.',
                  example: 10,
                },
                max_length: {
                  type: 'integer',
                  description: 'Maximum length of the generated text.',
                  example: 100,
                },
                temperature: {
                  type: 'number',
                  format: 'float',
                  description: 'Sampling temperature. Higher values = more random output.',
                  example: 0.5,
                },
              },
            },
          },
          required: ['messages'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'object',

              description: 'The output message generated by the model',
              example: {
                role: 'assistant',
                content: 'Aaaaaaaargh matey',
              },
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, no params',
            testDescription: 'Send a conversation to a model to generate text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: [
              {
                role: 'system',
                content: 'You are a friendly chatbot',
              },
              {
                role: 'assistant',
                content: "Hello, I'm a friendly bot",
              },
              {
                role: 'user',
                content: 'Hello bot, what is the capital of England?',
              },
            ],
            requestInputHttp: {
              messages: [
                {
                  role: 'system',
                  content: 'You are a friendly chatbot',
                },
                {
                  role: 'assistant',
                  content: "Hello, I'm a friendly bot",
                },
                {
                  role: 'user',
                  content: 'Hello bot, what is the capital of England?',
                },
              ],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: 'Basic usage, non streaming, with params',
            testDescription: 'Send a conversation to a model to generate text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: [
              {
                role: 'system',
                content: 'You are a friendly chatbot',
              },
              {
                role: 'assistant',
                content: "Hello, I'm a friendly bot",
              },
              {
                role: 'user',
                content: 'Hello bot, what is the capital of England?',
              },
            ],
            requestInputHttp: {
              messages: [
                {
                  role: 'system',
                  content: 'You are a friendly chatbot',
                },
                {
                  role: 'assistant',
                  content: "Hello, I'm a friendly bot",
                },
                {
                  role: 'user',
                  content: 'Hello bot, what is the capital of England?',
                },
              ],
            },
            params: { temperature: 0 },
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Add params',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: 'Basic usage, with streaming, no params',
            testDescription: 'Send a conversation to a model to generate text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: [
              {
                role: 'system',
                content: 'You are a friendly chatbot',
              },
              {
                role: 'assistant',
                content: "Hello, I'm a friendly bot",
              },
              {
                role: 'user',
                content: 'Hello bot, what is the capital of England?',
              },
            ],
            requestInputHttp: {
              messages: [
                {
                  role: 'system',
                  content: 'You are a friendly chatbot',
                },
                {
                  role: 'assistant',
                  content: "Hello, I'm a friendly bot",
                },
                {
                  role: 'user',
                  content: 'Hello bot, what is the capital of England?',
                },
              ],
            },
            params: {},
            options: {
              stream: true,
            },
            mintlifyProps: {
              exampleTitle: 'Stream text',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: 'Basic usage, with streaming, with params',
            testDescription: 'Send a conversation to a model to generate text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: [
              {
                role: 'system',
                content: 'You are a friendly chatbot',
              },
              {
                role: 'assistant',
                content: "Hello, I'm a friendly bot",
              },
              {
                role: 'user',
                content: 'Hello bot, what is the capital of England?',
              },
            ],
            requestInputHttp: {
              messages: [
                {
                  role: 'system',
                  content: 'You are a friendly chatbot',
                },
                {
                  role: 'assistant',
                  content: "Hello, I'm a friendly bot",
                },
                {
                  role: 'user',
                  content: 'Hello bot, what is the capital of England?',
                },
              ],
            },
            params: { temperature: 0 },
            options: {
              stream: true,
            },
            mintlifyProps: {
              exampleTitle: 'Add params + Stream text',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: [
                {
                  role: 'system',
                  content: 'You are a friendly chatbot',
                },
                {
                  role: 'assistant',
                  content: "Hello, I'm a friendly bot",
                },
                {
                  role: 'user',
                  content: 'Hello bot, what is the capital of England?',
                },
              ],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              messages: [
                {
                  role: 'system',
                  content: 'You are a friendly chatbot',
                },
                {
                  role: 'assistant',
                  content: "Hello, I'm a friendly bot",
                },
                {
                  role: 'user',
                  content: 'Hello bot, what is the capital of England?',
                },
              ],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: [
                {
                  role: 'system',
                  content: 'You are a friendly chatbot',
                },
                {
                  role: 'assistant',
                  content: "Hello, I'm a friendly bot",
                },
                {
                  role: 'user',
                  content: 'Hello bot, what is the capital of England?',
                },
              ],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'audio-text-to-text': {
      exampleModel: 'Qwen/Qwen2-Audio-7B-Instruct',
      title: 'Multimodal - Audio',
      description:
        'Chat with AI models using text and audio. Also known as audio-text-to-text',
      icon: 'comments',
      supportsTextStreaming: true,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            messages: {
              type: 'array',
              description: 'Conversation history.',
              example: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this audio' },
                    {
                      type: 'audio',
                      url: 'https://dn720307.ca.archive.org/0/items/various-bird-sounds/Various%20Bird%20Sounds.mp3',
                    },
                  ],
                },
              ],
              items: {
                type: 'object',
                required: ['role', 'content'],
                properties: {
                  role: {
                    type: 'string',
                    enum: ['system', 'user', 'assistant'],
                  },
                  content: {
                    oneOf: [
                      {
                        type: 'string',
                      },
                      {
                        type: 'array',
                        items: {
                          type: 'object',
                          required: ['type'],
                          properties: {
                            type: {
                              type: 'string',
                              enum: ['text', 'audio'],
                            },
                            text: {
                              type: 'string',
                            },
                            url: {
                              type: 'string',
                              format: 'uri',
                            },
                            base64: {
                              type: 'string',
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            stream: {
              type: 'boolean',
              description: 'Enable text streaming.',
            },
            params: {
              type: 'object',
              description: 'Model-specific parameters.',
              properties: {
                min_length: {
                  type: 'integer',
                  description: 'Minimum length of the generated text.',
                  example: 10,
                },
                max_length: {
                  type: 'integer',
                  description: 'Maximum length of the generated text.',
                  example: 100,
                },
                temperature: {
                  type: 'number',
                  format: 'float',
                  description: 'Sampling temperature. Higher values = more random output.',
                  example: 0.5,
                },
              },
            },
          },
          required: ['messages'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'object',

              description: 'The output message generated by the model',
              example: {
                role: 'assistant',
                content: 'The sound is of raindrops and birds chirping.',
              },
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, no params',
            testDescription: 'Send a conversation to a model to generate text from text and audio',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: 'Describe this audio' },
                  {
                    type: 'audio',
                    url: 'https://dn720307.ca.archive.org/0/items/various-bird-sounds/Various%20Bird%20Sounds.mp3',
                  },
                ],
              },
            ],
            requestInputHttp: {
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this audio' },
                    {
                      type: 'audio',
                      url: 'https://dn720307.ca.archive.org/0/items/various-bird-sounds/Various%20Bird%20Sounds.mp3',
                    },
                  ],
                },
              ],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription:
                'Send a conversation to a model to generate text from text and audio',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: 'Basic usage, non streaming, with params',
            testDescription: 'Send a conversation to a model to generate text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: 'Describe this audio' },
                  {
                    type: 'audio',
                    url: 'https://dn720307.ca.archive.org/0/items/various-bird-sounds/Various%20Bird%20Sounds.mp3',
                  },
                ],
              },
            ],
            requestInputHttp: {
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this audio' },
                    {
                      type: 'audio',
                      url: 'https://dn720307.ca.archive.org/0/items/various-bird-sounds/Various%20Bird%20Sounds.mp3',
                    },
                  ],
                },
              ],
            },
            params: { temperature: 0 },
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Add params',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: 'Basic usage, with streaming, no params',
            testDescription: 'Send a conversation to a model to generate text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: 'Describe this audio' },
                  {
                    type: 'audio',
                    url: 'https://dn720307.ca.archive.org/0/items/various-bird-sounds/Various%20Bird%20Sounds.mp3',
                  },
                ],
              },
            ],
            requestInputHttp: {
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this audio' },
                    {
                      type: 'audio',
                      url: 'https://dn720307.ca.archive.org/0/items/various-bird-sounds/Various%20Bird%20Sounds.mp3',
                    },
                  ],
                },
              ],
            },
            params: {},
            options: {
              stream: true,
            },
            mintlifyProps: {
              exampleTitle: 'Stream text',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: 'Basic usage, with streaming, with params',
            testDescription: 'Send a conversation to a model to generate text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: 'Describe this audio' },
                  {
                    type: 'audio',
                    url: 'https://dn720307.ca.archive.org/0/items/various-bird-sounds/Various%20Bird%20Sounds.mp3',
                  },
                ],
              },
            ],
            requestInputHttp: {
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this audio' },
                    {
                      type: 'audio',
                      url: 'https://dn720307.ca.archive.org/0/items/various-bird-sounds/Various%20Bird%20Sounds.mp3',
                    },
                  ],
                },
              ],
            },
            params: { temperature: 0 },
            options: {
              stream: true,
            },
            mintlifyProps: {
              exampleTitle: 'Add params + Stream text',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this audio' },
                    {
                      type: 'audio',
                      url: 'https://dn720307.ca.archive.org/0/items/various-bird-sounds/Various%20Bird%20Sounds.mp3',
                    },
                  ],
                },
              ],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this audio' },
                    {
                      type: 'audio',
                      url: 'https://dn720307.ca.archive.org/0/items/various-bird-sounds/Various%20Bird%20Sounds.mp3',
                    },
                  ],
                },
              ],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this audio' },
                    {
                      type: 'audio',
                      url: 'https://dn720307.ca.archive.org/0/items/various-bird-sounds/Various%20Bird%20Sounds.mp3',
                    },
                  ],
                },
              ],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'image-text-to-text': {
      exampleModel: 'google/gemma-3-4b-it',
      title: 'Multimodal - Vision',
      description:
        'Chat with AI models using text and images. Also known as image-text-to-text',
      icon: 'comments',
      supportsTextStreaming: true,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            messages: {
              type: 'array',
              description: 'Conversation history.',
              example: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this image' },
                    {
                      type: 'image',
                      url: 'https://hips.hearstapps.com/hmg-prod/images/how-to-keep-ducks-call-ducks-1615457181.jpg?crop=0.670xw:1.00xh;0.157xw,0&resize=980:*',
                    },
                  ],
                },
              ],
              items: {
                type: 'object',
                required: ['role', 'content'],
                properties: {
                  role: {
                    type: 'string',
                    enum: ['system', 'user', 'assistant'],
                  },
                  content: {
                    oneOf: [
                      {
                        type: 'string',
                      },
                      {
                        type: 'array',
                        items: {
                          type: 'object',
                          required: ['type'],
                          properties: {
                            type: {
                              type: 'string',
                              enum: ['text', 'image'],
                            },
                            text: {
                              type: 'string',
                            },
                            url: {
                              type: 'string',
                              format: 'uri',
                            },
                            base64: {
                              type: 'string',
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            stream: {
              type: 'boolean',
              description: 'Enable text streaming.',
            },
            params: {
              type: 'object',
              description: 'Model-specific parameters.',
              properties: {
                min_length: {
                  type: 'integer',
                  description: 'Minimum length of the generated text.',
                  example: 10,
                },
                max_length: {
                  type: 'integer',
                  description: 'Maximum length of the generated text.',
                  example: 100,
                },
                temperature: {
                  type: 'number',
                  format: 'float',
                  description: 'Sampling temperature. Higher values = more random output.',
                  example: 0.5,
                },
              },
            },
          },
          required: ['messages'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'object',

              description: 'The output message generated by the model',
              example: {
                role: 'assistant',
                content: 'Aaaaaaaargh matey',
              },
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, no params',
            testDescription: 'Send a conversation to a model to generate text from text and audio',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: 'Describe this image' },
                  {
                    type: 'image',
                    url: 'https://hips.hearstapps.com/hmg-prod/images/how-to-keep-ducks-call-ducks-1615457181.jpg?crop=0.670xw:1.00xh;0.157xw,0&resize=980:*',
                  },
                ],
              },
            ],
            requestInputHttp: {
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this image' },
                    {
                      type: 'image',
                      url: 'https://hips.hearstapps.com/hmg-prod/images/how-to-keep-ducks-call-ducks-1615457181.jpg?crop=0.670xw:1.00xh;0.157xw,0&resize=980:*',
                    },
                  ],
                },
              ],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription:
                'Send a conversation to a model to generate text from text and audio',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: 'Basic usage, non streaming, with params',
            testDescription: 'Send a conversation to a model to generate text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: 'Describe this image' },
                  {
                    type: 'image',
                    url: 'https://hips.hearstapps.com/hmg-prod/images/how-to-keep-ducks-call-ducks-1615457181.jpg?crop=0.670xw:1.00xh;0.157xw,0&resize=980:*',
                  },
                ],
              },
            ],
            requestInputHttp: {
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this image' },
                    {
                      type: 'image',
                      url: 'https://hips.hearstapps.com/hmg-prod/images/how-to-keep-ducks-call-ducks-1615457181.jpg?crop=0.670xw:1.00xh;0.157xw,0&resize=980:*',
                    },
                  ],
                },
              ],
            },
            params: { temperature: 0 },
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Add params',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: 'Basic usage, with streaming, no params',
            testDescription: 'Send a conversation to a model to generate text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: 'Describe this image' },
                  {
                    type: 'image',
                    url: 'https://hips.hearstapps.com/hmg-prod/images/how-to-keep-ducks-call-ducks-1615457181.jpg?crop=0.670xw:1.00xh;0.157xw,0&resize=980:*',
                  },
                ],
              },
            ],
            requestInputHttp: {
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this image' },
                    {
                      type: 'image',
                      url: 'https://hips.hearstapps.com/hmg-prod/images/how-to-keep-ducks-call-ducks-1615457181.jpg?crop=0.670xw:1.00xh;0.157xw,0&resize=980:*',
                    },
                  ],
                },
              ],
            },
            params: {},
            options: {
              stream: true,
            },
            mintlifyProps: {
              exampleTitle: 'Stream text',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: 'Basic usage, with streaming, with params',
            testDescription: 'Send a conversation to a model to generate text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: 'Describe this image' },
                  {
                    type: 'image',
                    url: 'https://hips.hearstapps.com/hmg-prod/images/how-to-keep-ducks-call-ducks-1615457181.jpg?crop=0.670xw:1.00xh;0.157xw,0&resize=980:*',
                  },
                ],
              },
            ],
            requestInputHttp: {
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this image' },
                    {
                      type: 'image',
                      url: 'https://hips.hearstapps.com/hmg-prod/images/how-to-keep-ducks-call-ducks-1615457181.jpg?crop=0.670xw:1.00xh;0.157xw,0&resize=980:*',
                    },
                  ],
                },
              ],
            },
            params: { temperature: 0 },
            options: {
              stream: true,
            },
            mintlifyProps: {
              exampleTitle: 'Add params + Stream text',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this image' },
                    {
                      type: 'image',
                      url: 'https://hips.hearstapps.com/hmg-prod/images/how-to-keep-ducks-call-ducks-1615457181.jpg?crop=0.670xw:1.00xh;0.157xw,0&resize=980:*',
                    },
                  ],
                },
              ],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this image' },
                    {
                      type: 'image',
                      url: 'https://hips.hearstapps.com/hmg-prod/images/how-to-keep-ducks-call-ducks-1615457181.jpg?crop=0.670xw:1.00xh;0.157xw,0&resize=980:*',
                    },
                  ],
                },
              ],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this image' },
                    {
                      type: 'image',
                      url: 'https://hips.hearstapps.com/hmg-prod/images/how-to-keep-ducks-call-ducks-1615457181.jpg?crop=0.670xw:1.00xh;0.157xw,0&resize=980:*',
                    },
                  ],
                },
              ],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'video-text-to-text': {
      exampleModel: 'llava-hf/LLaVA-NeXT-Video-7B-hf',
      title: 'Multimodal - Video',
      description:
        'Chat with AI models using text and videos. Also known as video-text-to-text',
      icon: 'comments',
      supportsTextStreaming: true,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            messages: {
              type: 'array',
              description: 'Conversation history.',
              example: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this video' },
                    {
                      type: 'video',
                      url: 'https://huggingface.co/datasets/raushan-testing-hf/videos-test/resolve/main/sample_demo_1.mp4',
                    },
                  ],
                },
              ],
              items: {
                type: 'object',
                required: ['role', 'content'],
                properties: {
                  role: {
                    type: 'string',
                    enum: ['system', 'user', 'assistant'],
                  },
                  content: {
                    oneOf: [
                      {
                        type: 'string',
                      },
                      {
                        type: 'array',
                        items: {
                          type: 'object',
                          required: ['type'],
                          properties: {
                            type: {
                              type: 'string',
                              enum: ['text', 'video'],
                            },
                            text: {
                              type: 'string',
                            },
                            url: {
                              type: 'string',
                              format: 'uri',
                            },
                            base64: {
                              type: 'string',
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            stream: {
              type: 'boolean',
              description: 'Enable text streaming.',
            },
            params: {
              type: 'object',
              description: 'Model-specific parameters.',
              properties: {
                min_length: {
                  type: 'integer',
                  description: 'Minimum length of the generated text.',
                  example: 10,
                },
                max_length: {
                  type: 'integer',
                  description: 'Maximum length of the generated text.',
                  example: 100,
                },
                temperature: {
                  type: 'number',
                  format: 'float',
                  description: 'Sampling temperature. Higher values = more random output.',
                  example: 0.5,
                },
              },
            },
          },
          required: ['messages'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'object',
              description: 'The output message generated by the model',
              example: {
                role: 'assistant',
                content:
                  " In this video, a toddler child is captured in the midst of an engaging and noisy activity. They are sitting on a wooden bed, busy with what appears to be a game or activity involving books. The child's face is framed by a pair of glasses that are being worn, and their hand is seen in motion, possibly pushing a button or perhaps interacting with a device. The child seems to be concentrating on something distant in their hand, with their body language suggesting a sense of excitement or engagement. The room appears to be a child's room, possibly with a greenish tone, and there's a white object in the background that resembles bedding, possibly children's furniture. Another player or toy is seen behind the child, contributing to the lively atmosphere. In front of the child, a blanket-like object could be perceived as a part of the game, its color or texture not clearly distinguishable. The tone of the video is lively, capturing everyday moments in an animated and playful context.",
              },
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, no params',
            testDescription: 'Send a conversation to a model to generate text from text and audio',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: 'Describe this video' },
                  {
                    type: 'video',
                    url: 'https://huggingface.co/datasets/raushan-testing-hf/videos-test/resolve/main/sample_demo_1.mp4',
                  },
                ],
              },
            ],
            requestInputHttp: {
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this video' },
                    {
                      type: 'video',
                      url: 'https://huggingface.co/datasets/raushan-testing-hf/videos-test/resolve/main/sample_demo_1.mp4',
                    },
                  ],
                },
              ],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription:
                'Send a conversation to a model to generate text from text and audio',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: 'Basic usage, non streaming, with params',
            testDescription: 'Send a conversation to a model to generate text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: 'Describe this video' },
                  {
                    type: 'video',
                    url: 'https://huggingface.co/datasets/raushan-testing-hf/videos-test/resolve/main/sample_demo_1.mp4',
                  },
                ],
              },
            ],
            requestInputHttp: {
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this video' },
                    {
                      type: 'video',
                      url: 'https://huggingface.co/datasets/raushan-testing-hf/videos-test/resolve/main/sample_demo_1.mp4',
                    },
                  ],
                },
              ],
            },
            params: { temperature: 0 },
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Add params',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: 'Basic usage, with streaming, no params',
            testDescription: 'Send a conversation to a model to generate text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: 'Describe this video' },
                  {
                    type: 'video',
                    url: 'https://huggingface.co/datasets/raushan-testing-hf/videos-test/resolve/main/sample_demo_1.mp4',
                  },
                ],
              },
            ],
            requestInputHttp: {
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this video' },
                    {
                      type: 'video',
                      url: 'https://huggingface.co/datasets/raushan-testing-hf/videos-test/resolve/main/sample_demo_1.mp4',
                    },
                  ],
                },
              ],
            },
            params: {},
            options: {
              stream: true,
            },
            mintlifyProps: {
              exampleTitle: 'Stream text',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: 'Basic usage, with streaming, with params',
            testDescription: 'Send a conversation to a model to generate text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: 'Describe this video' },
                  {
                    type: 'video',
                    url: 'https://huggingface.co/datasets/raushan-testing-hf/videos-test/resolve/main/sample_demo_1.mp4',
                  },
                ],
              },
            ],
            requestInputHttp: {
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this video' },
                    {
                      type: 'video',
                      url: 'https://huggingface.co/datasets/raushan-testing-hf/videos-test/resolve/main/sample_demo_1.mp4',
                    },
                  ],
                },
              ],
            },
            params: { temperature: 0 },
            options: {
              stream: true,
            },
            mintlifyProps: {
              exampleTitle: 'Add params + Stream text',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this video' },
                    {
                      type: 'video',
                      url: 'https://huggingface.co/datasets/raushan-testing-hf/videos-test/resolve/main/sample_demo_1.mp4',
                    },
                  ],
                },
              ],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              messages: [
                { type: 'text', text: 'Describe this video' },
                {
                  type: 'video',
                  url: 'https://huggingface.co/datasets/raushan-testing-hf/videos-test/resolve/main/sample_demo_1.mp4',
                },
              ],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: 'Describe this video' },
                    {
                      type: 'video',
                      url: 'https://huggingface.co/datasets/raushan-testing-hf/videos-test/resolve/main/sample_demo_1.mp4',
                    },
                  ],
                },
              ],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'sentence-similarity': {
      exampleModel: 'sentence-transformers/all-MiniLM-L6-v2',
      description:
        'Measure how similar two sentences are for applications like duplicate question detection, paraphrase detection, and text clustering',
      icon: 'waves-sine',
      supportsTextStreaming: false,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The input text',
              example: 'search_document: Turn this text into a vector',
            },
          },
          required: ['text'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'array',
              description: 'Successful response with the vector for the text',
              example: [0.1, 0.2, 0.3, 0.4],
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, no params',
            testDescription:
              'Send sentences to generate embeddings so you can compare their similarity',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: 'Turn this sentence into a vector',
            requestInputHttp: { text: 'Turn this sentence into a vector' },
            params: undefined,
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription:
                'Send sentences to generate embeddings so you can compare their similarity',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'Turn this sentence into a vector',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              text: 'Turn this sentence into a vector',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'Turn this sentence into a vector',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'fill-mask': {
      exampleModel: 'almanach/camembert-base',
      description:
        'Predict missing words in a sentence for tasks like text completion, language modeling, and text generation',
      icon: 'mask',
      supportsTextStreaming: false,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The input text',
              example: 'Hello <mask>',
            },
          },
          required: ['text'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'array',
              description: 'The generated mask predictions',
              example: [
                {
                  score: 0.85,
                  token: 83,
                  token_str: 'world',
                  sequence: 'Hello world!',
                },
                {
                  score: 0.1,
                  token: 84,
                  token_str: 'there',
                  sequence: 'Hello there!',
                },
              ],
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, no params',
            testDescription: 'Send a masked sentence to a model to predict the missing word',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: 'The capital of France is <mask>.',
            requestInputHttp: { text: 'The capital of France is <mask>.' },
            params: undefined,
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send a masked sentence to a model to predict the missing word',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'The capital of France is <mask>.',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              text: 'The capital of France is <mask>.',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'The capital of France is <mask>.',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'text-to-speech': {
      exampleModel: 'suno/bark-small',
      description:
        'Convert text into natural-sounding speech for applications like virtual assistants, accessibility features, and content creation',
      icon: 'volume-high',
      supportsTextStreaming: false,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The input text',
              example: 'Hello, how are you today?',
            },
          },
          required: ['text'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'string',
              description: 'Successful response with the generated audio link',
              example: 'https://api.bytez.com/audio/1234567890',
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, no params',
            testDescription: 'Send a text input to generate an audio output',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: 'Hello, how are you today?',
            requestInputHttp: { text: 'Hello, how are you today?' },
            params: undefined,
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send a text input to generate an audio output',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'Hello, how are you today?',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              text: 'Hello, how are you today?',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'Hello, how are you today?',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'text-to-audio': {
      exampleModel: 'facebook/musicgen-stereo-small',
      description: 'Send a text input to generate an audio output',
      icon: 'volume-high',
      supportsTextStreaming: false,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The input text',
              example: 'Moody jazz music with saxophones',
            },
          },
          required: ['text'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'string',
              description: 'Successful response with the generated audio link',
              example: 'https://api.bytez.com/audio/1234567890',
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, no params',
            testDescription: 'Send a text input to generate an audio output',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: 'Moody jazz music with saxophones',
            requestInputHttp: { text: 'Moody jazz music with saxophones' },
            params: undefined,
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send a text input to generate an audio output',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'Moody jazz music with saxophones',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              text: 'Moody jazz music with saxophones',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'Moody jazz music with saxophones',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'text-to-image': {
      exampleModel: 'dreamlike-art/dreamlike-photoreal-2.0',
      description: 'Generate images using text',
      icon: 'image',
      supportsTextStreaming: false,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The input text',
              example: 'A beautiful landscape with mountains and a river',
            },
          },
          required: ['text'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'string',
              description: 'Successful response with the generated image link',
              example: 'https://api.bytez.com/image/1234567890',
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, no params',
            testDescription: 'Generate images using text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: 'A beautiful landscape with mountains and a river',
            requestInputHttp: {
              text: 'A beautiful landscape with mountains and a river',
            },
            params: undefined,
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Generate images using text',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'A beautiful landscape with mountains and a river',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              text: 'A beautiful landscape with mountains and a river',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'A beautiful landscape with mountains and a river',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    translation: {
      exampleModel: 'Helsinki-NLP/opus-mt-en-zh',
      description:
        'Translate text from one language to another for multilingual communication, content localization, and language learning',
      icon: 'language',
      supportsTextStreaming: true,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The input text',
              example: 'Hello',
            },
            stream: {
              type: 'boolean',
              description: 'Enable text streaming.',
            },
          },
          required: ['text'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'string',
              description: 'Successful response with the translated text',
              example: 'Bonjour',
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, no params',
            testDescription: 'Send a text input to translate it into another language',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: "Hello, how are you? Beautiful day today, isn't it?",
            requestInputHttp: {
              text: "Hello, how are you? Beautiful day today, isn't it?",
            },
            params: undefined,
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send a text input to translate it into another language',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: "Hello, how are you? Beautiful day today, isn't it?",
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              text: "Hello, how are you? Beautiful day today, isn't it?",
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: "Hello, how are you? Beautiful day today, isn't it?",
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    summarization: {
      exampleModel: 'ainize/bart-base-cnn',
      description:
        'Summarization involves creating concise summaries of longer texts. Use cases include news summarization, document summarization, and generating abstracts',
      icon: 'align-justify',
      supportsTextStreaming: true,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The input text',
              example: `The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. It was the first structure to reach a height of 300 metres. Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.`,
            },
            stream: {
              type: 'boolean',
              description: 'Enable text streaming.',
            },
          },
          required: ['text'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'string',
              description: 'Successful response with the summary',
              example: 'The Eiffel Tower is the tallest structure in Paris.',
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, with params',
            testDescription: 'Generate a summary',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: `The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. It was the first structure to reach a height of 300 metres. Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.`,
            requestInputHttp: {
              text: `The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. It was the first structure to reach a height of 300 metres. Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.`,
            },
            params: { max_length: 40 },
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Generate a summary',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. It was the first structure to reach a height of 300 metres. Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              text: 'The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. It was the first structure to reach a height of 300 metres. Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow:
                'The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. It was the first structure to reach a height of 300 metres. Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'text-to-video': {
      exampleModel: 'ali-vilab/text-to-video-ms-1.7b',
      description:
        'Generate videos from textual descriptions for applications like content creation, entertainment, and education',
      icon: 'video',
      supportsTextStreaming: false,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The input text',
              example: 'A cat playing with a rose',
            },
          },
          required: ['text'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'string',
              description: 'Successful response with the generated video link',
              example: 'https://api.bytez.com/video/1234567890',
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription: 'Send a text prompt to generate a video output',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: 'A cat playing with a rose',
            requestInputHttp: {
              text: 'A cat playing with a rose',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send a text prompt to generate a video output',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'A cat playing with a rose',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              text: 'A cat playing with a rose',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'A cat playing with a rose',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'feature-extraction': {
      exampleModel: 'nomic-ai/nomic-embed-text-v1.5',
      description: 'Convert text into vectors (embeddings) that capture semantic meaning',
      icon: 'vector-square',
      supportsTextStreaming: false,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The input text',
              example: 'search_document: Turn this text into a vector',
            },
          },
          required: ['text'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'array',
              description: 'Successful response with extracted features',
              example: [0.1, 0.2, 0.3, 0.4],
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription:
              'Each feature extraction model is different, so check readme.md for the model manual. Below is an example of text embedding model',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: 'search_document: Turn this text into a vector',
            requestInputHttp: {
              text: 'search_document: Turn this text into a vector',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription:
                'Each feature extraction model is different, so check readme.md for the model manual. Below is an example of text embedding model',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'search_document: Turn this text into a vector',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              text: 'search_document: Turn this text into a vector',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'search_document: Turn this text into a vector',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'text-classification': {
      exampleModel: 'AdamCodd/distilbert-base-uncased-finetuned-sentiment-amazon',
      description:
        'Categorize text into predefined classes for applications like sentiment analysis, spam detection, and topic classification',
      icon: 'input-text',
      supportsTextStreaming: false,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The input text',
              example: 'We are furious with the results of the experiment!',
            },
          },
          required: ['text'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'array',
              description: 'Successful response with the classification',
              example: [
                {
                  label: 'negative',
                  score: 0.8025179505348206,
                },
              ],
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription: 'Example, sentiment analysis',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: 'We are furious with the results of the experiment!',
            requestInputHttp: {
              text: 'We are furious with the results of the experiment!',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Example, sentiment analysis',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'We are furious with the results of the experiment!',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              text: 'We are furious with the results of the experiment!',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'We are furious with the results of the experiment!',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'token-classification': {
      exampleModel: 'dslim/bert-base-NER',
      description:
        'Identify and categorize tokens in text for Named Entity Recognition (NER), Part-of-Speech tagging, and other NLP tasks',
      icon: 'vector-square',
      supportsTextStreaming: false,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The input text',
              example: 'John Doe is a software engineer at Google',
            },
          },
          required: ['text'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'array',
              description: 'Successful response with classified tokens',
              example: [
                {
                  entity: 'B-PER',
                  score: 0.9996556043624878,
                  index: 1,
                  word: 'John',
                  start: 0,
                  end: 4,
                },
                {
                  entity: 'I-PER',
                  score: 0.999683141708374,
                  index: 2,
                  word: 'Do',
                  start: 5,
                  end: 7,
                },
                {
                  entity: 'I-PER',
                  score: 0.9945255517959595,
                  index: 3,
                  word: '##e',
                  start: 7,
                  end: 8,
                },
                {
                  entity: 'B-ORG',
                  score: 0.9984006285667419,
                  index: 9,
                  word: 'Google',
                  start: 35,
                  end: 41,
                },
              ],
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription: 'Send a text input to classify individual tokens',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: 'John Doe is a software engineer at Google',
            requestInputHttp: {
              text: 'John Doe is a software engineer at Google',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send a text input to classify individual tokens',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'John Doe is a software engineer at Google',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              text: 'John Doe is a software engineer at Google',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'John Doe is a software engineer at Google',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'text2text-generation': {
      exampleModel: 'google/flan-t5-base',
      description:
        'Generate text from input text for applications like text completion, content generation, and dialogue systems',
      icon: 'text-size',
      supportsTextStreaming: true,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The input text',
              example: 'Once upon a time there was a beautiful home where',
            },
            stream: {
              type: 'boolean',
              description: 'Enable text streaming.',
            },
          },
          required: ['text'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'string',
              description: 'Successful response with generated text',
              example: 'Once upon a time there was a beautiful home where there was a happy cat',
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, with params',
            testDescription: 'Send a prompt to a model to generate text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: 'Once upon a time there was a beautiful home where',
            requestInputHttp: {
              text: 'Once upon a time there was a beautiful home where',
            },
            params: {
              max_new_tokens: 200,
              min_new_tokens: 50,
              temperature: 0.5,
            },
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send a prompt to a model to generate text',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'Once upon a time there was a beautiful home where',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              text: 'Once upon a time there was a beautiful home where',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'Once upon a time there was a beautiful home where',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'video-classification': {
      exampleModel: 'ahmedabdo/video-classifier',
      description:
        'Categorize videos into predefined classes for applications in video content analysis, security surveillance, and media organization',
      icon: 'video',
      supportsTextStreaming: false,
      supportsUrlInput: true,
      supportsBase64Input: true,
      mediaInputType: 'video',
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              example: `https://cdn.bytez.com/model/example/meditate.mp4`,
            },
            base64: {
              type: 'string',
              example: `data:video/mp4;base64,...BASE_64_GOES_HERE (Only use this is you are not using a url)`,
            },
          },
          required: ['url'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'array',
              description: 'Successful response with video-classification scores and labels',
              example: [
                {
                  score: 0.635999858379364,
                  label: 'LABEL_0',
                },
                {
                  score: 0.364000141620636,
                  label: 'LABEL_1',
                },
              ],
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription: 'Send a video input URL to classify its contents',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://video-previews.elements.envatousercontent.com/6d07b79d-b17a-47b5-9d24-4fe984c7ca36/watermarked_preview/watermarked_preview.mp4',
            },
            requestInputHttp: {
              url: 'https://video-previews.elements.envatousercontent.com/6d07b79d-b17a-47b5-9d24-4fe984c7ca36/watermarked_preview/watermarked_preview.mp4',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send a video input URL to classify its contents',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'https://video-previews.elements.envatousercontent.com/6d07b79d-b17a-47b5-9d24-4fe984c7ca36/watermarked_preview/watermarked_preview.mp4',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'data:video/mp4;base64,AAAAGGZ0eXBtcDQyAAAAAG1wNDFtcDQyaXNvbX',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'AAAAGGZ0eXBtcDQyAAAAAG1wNDFtcDQyaXNvbX',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                url: 'https://video-previews.elements.envatousercontent.com/6d07b79d-b17a-47b5-9d24-4fe984c7ca36/watermarked_preview/watermarked_preview.mp4',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64: 'data:video/mp4;base64,AAAAGGZ0eXBtcDQyAAAAAG1wNDFtcDQyaXNvbX',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64: 'AAAAGGZ0eXBtcDQyAAAAAG1wNDFtcDQyaXNvbX',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://video-previews.elements.envatousercontent.com/6d07b79d-b17a-47b5-9d24-4fe984c7ca36/watermarked_preview/watermarked_preview.mp4',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64: 'data:video/mp4;base64,AAAAGGZ0eXBtcDQyAAAAAG1wNDFtcDQyaXNvbX',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64: 'AAAAGGZ0eXBtcDQyAAAAAG1wNDFtcDQyaXNvbX',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow:
                'https://video-previews.elements.envatousercontent.com/6d07b79d-b17a-47b5-9d24-4fe984c7ca36/watermarked_preview/watermarked_preview.mp4',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'automatic-speech-recognition': {
      exampleModel: 'facebook/data2vec-audio-base-960h',
      description:
        'Convert spoken language into written text for transcription services, voice assistants, and accessibility features',
      icon: 'file-music',
      supportsTextStreaming: false,
      supportsUrlInput: true,
      supportsBase64Input: true,
      mediaInputType: 'audio',
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              example: `https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav`,
            },
            base64: {
              type: 'string',
              example: `data:audio/wav;base64,...BASE_64_GOES_HERE (Only use this is you are not using a url)`,
            },
          },
          required: ['url'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'string',
              description: 'Successful response with the textual translation of the audio',
              example: 'Down',
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription: 'Send an audio file to an ASR model to generate text',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/automatic-speech-recognition/input.flac',
            },
            requestInputHttp: {
              url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/automatic-speech-recognition/input.flac',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send an audio file to an ASR model to generate text',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/automatic-speech-recognition/input.flac',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'data:audio/flac;base64,UklGRuQAAABXQVZFZm10IBAAAAABAAIAESsAACJWAAACABAAZGF0YXX',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'UklGRuQAAABXQVZFZm10IBAAAAABAAIAESsAACJWAAACABAAZGF0YXX',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/automatic-speech-recognition/input.flac',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64:
                  'data:audio/flac;base64,UklGRuQAAABXQVZFZm10IBAAAAABAAIAESsAACJWAAACABAAZGF0YXX',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64: 'UklGRuQAAABXQVZFZm10IBAAAAABAAIAESsAACJWAAACABAAZGF0YXX',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/automatic-speech-recognition/input.flac',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64:
                'data:audio/flac;base64,UklGRuQAAABXQVZFZm10IBAAAAABAAIAESsAACJWAAACABAAZGF0YXX',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64: 'UklGRuQAAABXQVZFZm10IBAAAAABAAIAESsAACJWAAACABAAZGF0YXX',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/automatic-speech-recognition/input.flac',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'audio-classification': {
      exampleModel: 'aaraki/wav2vec2-base-finetuned-ks',
      description:
        'Classify audio clips into predefined categories such as speech emotion, sound detection, and music genres',
      icon: 'music-magnifying-glass',
      supportsTextStreaming: false,
      supportsUrlInput: true,
      supportsBase64Input: true,
      mediaInputType: 'audio',
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              example: `https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav`,
            },
            base64: {
              type: 'string',
              example: `data:audio/wav;base64,...BASE_64_GOES_HERE (Only use this is you are not using a url)`,
            },
          },
          required: ['url'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'array',
              description: 'Successful response with audio-classification scores and labels',
              example: [
                {
                  score: 0.12049942463636398,
                  label: 'no',
                },
                {
                  score: 0.11662919074296951,
                  label: 'down',
                },
                {
                  score: 0.1127392128109932,
                  label: '_unknown_',
                },
                {
                  score: 0.10831832140684128,
                  label: 'stop',
                },
                {
                  score: 0.10017725080251694,
                  label: 'go',
                },
                {
                  score: 0.09701883047819138,
                  label: 'left',
                },
                {
                  score: 0.07834923267364502,
                  label: 'on',
                },
                {
                  score: 0.07112456858158112,
                  label: 'right',
                },
                {
                  score: 0.06147514656186104,
                  label: 'off',
                },
                {
                  score: 0.04827316105365753,
                  label: 'yes',
                },
                {
                  score: 0.047529637813568115,
                  label: 'up',
                },
                {
                  score: 0.03786593675613403,
                  label: '_silence_',
                },
              ],
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription: 'Send an audio file to a model for classification',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav',
            },
            requestInputHttp: {
              url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send an audio file to a model for classification',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'data:audio/wav;base64,UklGRjQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YYQAAABJ',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'UklGRjQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YYQAAABJ',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64:
                  'data:audio/wav;base64,UklGRjQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YYQAAABJ',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64: 'UklGRjQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YYQAAABJ',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64:
                'data:audio/wav;base64,UklGRjQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YYQAAABJ',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64: 'UklGRjQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YYQAAABJ',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'mask-generation': {
      exampleModel: 'facebook/sam-vit-base',
      description:
        'Generate masks for objects in images for tasks like image segmentation, medical imaging, and computer vision applications',
      icon: 'draw-polygon',
      supportsTextStreaming: false,
      supportsUrlInput: true,
      supportsBase64Input: true,
      mediaInputType: 'image',
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              example: `https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png`,
            },
            base64: {
              type: 'string',
              example: `data:image/png;base64,...BASE_64_GOES_HERE (Only use this is you are not using a url)`,
            },
          },
          required: ['url'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'object',
              description: 'Successful response with the mask image URL',
              properties: {
                input_image_dimensions: {
                  type: 'object',
                  properties: {
                    width: { type: 'number', example: 1264 },
                    height: { type: 'number', example: 770 },
                  },
                  example: { width: 1264, height: 770 },
                },
                masks: {
                  type: 'array',
                  example: [[[0, 0, 0]], [[1, 1, 1]], [[1, 0, 1]]],
                },
                scores: {
                  type: 'array',
                  example: [0.996, 0.999, 0.601],
                },
              },
              example: {
                input_image_dimensions: { width: 1264, height: 770 },
                masks: [[[0, 0, 0]], [[1, 1, 1]], [[1, 0, 1]]],
                scores: [0.996, 0.999, 0.601],
              },
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription: 'Send an image to a model to generate object masks',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            requestInputHttp: {
              url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send an image to a model to generate object masks',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'image-to-text': {
      exampleModel: 'Salesforce/blip-image-captioning-base',
      description:
        'Generate textual descriptions from images for tasks like image captioning, content generation, and accessibility features',
      icon: 'comment-image',
      supportsTextStreaming: false,
      supportsUrlInput: true,
      supportsBase64Input: true,
      mediaInputType: 'image',
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              example: `https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg`,
            },
            base64: {
              type: 'string',
              example: `data:image/jpg;base64,...BASE_64_GOES_HERE (Only use this is you are not using a url)`,
            },
          },
          required: ['url'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'string',
              description: 'Successful response with a generated caption',
              example: 'A blind man walking a dog',
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription: 'For example, ask a model to describe an image',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg',
            },
            requestInputHttp: {
              url: 'https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'For example, ask a model to describe an image',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'hi',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'object-detection': {
      exampleModel: 'facebook/detr-resnet-50',
      description:
        'Identify and locate objects in images for applications like security systems, autonomous driving, and retail analytics',
      icon: 'binoculars',
      supportsTextStreaming: false,
      supportsUrlInput: true,
      supportsBase64Input: true,
      mediaInputType: 'image',
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              example: `https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg`,
            },
            base64: {
              type: 'string',
              example: `data:image/jpg;base64,...BASE_64_GOES_HERE (Only use this is you are not using a url)`,
            },
          },
          required: ['url'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'array',
              description: 'Successful response with detected objects',
              example: [
                {
                  score: 0.9996581077575684,
                  label: 'cat',
                  box: {
                    xmin: 255,
                    ymin: 175,
                    xmax: 1110,
                    ymax: 1531,
                  },
                },
              ],
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription: 'Send an image to a model to detect objects and get bounding boxes',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg',
            },
            requestInputHttp: {
              url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription:
                'Send an image to a model to detect objects and get bounding boxes',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'depth-estimation': {
      exampleModel: 'vinvino02/glpn-nyu',
      description:
        'Predict object distances from a camera using depth estimation models for robotics, AR, and autonomous vehicles',
      icon: 'layer-group',
      supportsTextStreaming: false,
      supportsUrlInput: true,
      supportsBase64Input: true,
      mediaInputType: 'image',
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              example: `https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg`,
            },
            base64: {
              type: 'string',
              example: `data:image/jpg;base64,...BASE_64_GOES_HERE (Only use this is you are not using a url)`,
            },
          },
          required: ['url'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'object',
              description: 'Successful response with depth estimation results',
              example: {
                depth_png: 'iVBORw0KGgoAAAANSUhE...',
                formatted_predicted_depth_array: [
                  [0, 1, 2],
                  [0, 1, 2],
                  [0, 1, 2],
                ],
              },
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription: 'Send an image to a depth estimation model to generate a depth map',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg',
            },
            requestInputHttp: {
              url: 'https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription:
                'Send an image to a depth estimation model to generate a depth map',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'image-segmentation': {
      exampleModel: 'sayeed99/segformer-b3-fashion',
      description:
        'Divide an image into multiple segments for applications like medical imaging, object detection, and computer vision tasks',
      icon: 'shapes',
      supportsTextStreaming: false,
      supportsUrlInput: true,
      supportsBase64Input: true,
      mediaInputType: 'image',
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              example: `https://www.padoniavets.com/sites/default/files/field/image/cats-and-dogs.jpg`,
            },
            base64: {
              type: 'string',
              example: `data:image/jpg;base64,...BASE_64_GOES_HERE (Only use this is you are not using a url)`,
            },
          },
          required: ['url'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'object',
              description: 'Successful response with segmentation results (URL to the result)',
              example: [
                {
                  label: 'unlabelled',
                  score: null,
                  mask_png: 'iVBORw0KGgoAAAANSUhEUgAAAn8AAAHgCAAAAADx/',
                },
                {
                  label: 'top, t-shirt, sweatshirt',
                  score: null,
                  mask_png: 'iVBORw0KGgoAAAANSUhEUgAAAn8AAAHgCAAAAADx/',
                },
                {
                  label: 'sleeve',
                  score: null,
                  mask_png: 'iVBORw0KGgoAAAANSUhEUgAAAn8AAAHgCAAAAADx/',
                },
              ],
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription: 'Send an image to a model to generate segmentation masks',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
            },
            requestInputHttp: {
              url: 'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send an image to a model to generate segmentation masks',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'image-classification': {
      exampleModel: 'google/vit-base-patch16-224',
      description:
        'Categorize images into predefined classes for tasks like object recognition, medical imaging, and security systems',
      icon: 'image',
      supportsTextStreaming: false,
      supportsUrlInput: true,
      supportsBase64Input: true,
      mediaInputType: 'image',
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              example: `https://www.padoniavets.com/sites/default/files/field/image/cats-and-dogs.jpg`,
            },
            base64: {
              type: 'string',
              example: `data:image/jpg;base64,...BASE_64_GOES_HERE (Only use this is you are not using a url)`,
            },
          },
          required: ['url'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'array',
              description: 'Successful response with the classification labels',
              example: [
                {
                  label: 'beagle',
                  score: 0.5398777723312378,
                },
                {
                  label: 'Egyptian cat',
                  score: 0.12709936499595642,
                },
                {
                  label: 'English foxhound',
                  score: 0.04305768758058548,
                },
                {
                  label: 'tabby, tabby cat',
                  score: 0.03387906029820442,
                },
                {
                  label: 'Walker hound, Walker foxhound',
                  score: 0.02507072128355503,
                },
              ],
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription: 'Send an image to a model to generate classification labels',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://www.padoniavets.com/sites/default/files/field/image/cats-and-dogs.jpg',
            },
            requestInputHttp: {
              url: 'https://www.padoniavets.com/sites/default/files/field/image/cats-and-dogs.jpg',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send an image to a model to generate classification labels',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'image-feature-extraction': {
      exampleModel: 'nomic-ai/nomic-embed-vision-v1',
      description:
        'Extract features from images for tasks like object detection, image classification, and image retrieval',
      icon: 'vector-square',
      supportsTextStreaming: false,
      supportsUrlInput: true,
      supportsBase64Input: true,
      mediaInputType: 'image',
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              example: `https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg`,
            },
            base64: {
              type: 'string',
              example: `data:image/jpg;base64,...BASE_64_GOES_HERE (Only use this is you are not using a url)`,
            },
          },
          required: ['url'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'array',
              description: 'Successful response with extracted features',
              example: [
                [0.23, 0.45, 0.89, 0.67],
                [0.23, 0.45, 0.89, 0.67],
              ],
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription: 'For example, generate visual embeddings from an image',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg',
            },
            requestInputHttp: {
              url: 'https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'For example, generate visual embeddings from an image',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow:
                'https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'question-answering': {
      exampleModel: 'deepset/roberta-base-squad2',
      description:
        'Answer questions based on a given context for applications like customer support, information retrieval, and educational tools',
      icon: 'comments-question',
      supportsTextStreaming: false,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            question: {
              type: 'string',
              example: `Who's the lead character?`,
            },
            context: {
              type: 'string',
              example: `Ron, the hero, looked at Greybeard and smote him asunder`,
            },
          },
          required: ['question', 'context'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'object',
              description: 'Successful response with the answer, score, and start and end indices',
              example: {
                score: 0.2002170979976654,
                start: 0,
                end: 3,
                answer: 'Ron',
              },
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription: 'Send a question with context to a model to generate an answer',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: {
              question: 'Where does Holly live?',
              context: 'My name is Holly and I live in NYC',
            },
            requestInputHttp: {
              question: 'Where does Holly live?',
              context: 'My name is Holly and I live in NYC',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send a question with context to a model to generate an answer',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                question: 'Where does Holly live?',
                context: 'My name is Holly and I live in NYC',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              question: 'Where does Holly live?',
              context: 'My name is Holly and I live in NYC',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'hi',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'document-question-answering': {
      exampleModel: 'cloudqi/CQI_Visual_Question_Awnser_PT_v0',
      description:
        'Answer questions based on document content for tasks like contract analysis, document understanding, and information retrieval',
      icon: 'file-invoice',
      supportsTextStreaming: false,
      supportsUrlInput: true,
      supportsBase64Input: true,
      mediaInputType: 'document image',
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            question: {
              type: 'string',
              example: `Whats the total cost?`,
            },
            url: {
              type: 'string',
              example: `https://templates.invoicehome.com/invoice-template-us-neat-750px.png`,
            },
            base64: {
              type: 'string',
              example: `data:image/png;base64,...BASE_64_GOES_HERE (Only use this is you are not using a url)`,
            },
          },
          required: ['question', 'url'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'array',
              description: 'Successful response with the answer from the document',
              example: [
                {
                  score: 0.997048556804657,
                  answer: '$154.06',
                  start: 75,
                  end: 75,
                },
              ],
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription:
              'Send an image of a document along with a question to get relevant answers',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: {
              question: 'Whats the total cost?',
              url: 'https://templates.invoicehome.com/invoice-template-us-neat-750px.png',
            },
            requestInputHttp: {
              question: 'Whats the total cost?',
              url: 'https://templates.invoicehome.com/invoice-template-us-neat-750px.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription:
                'Send an image of a document along with a question to get relevant answers',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                question: 'Whats the total cost?',
                url: 'https://templates.invoicehome.com/invoice-template-us-neat-750px.png',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                question: 'Whats the total cost?',
                base64:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                question: 'Whats the total cost?',
                base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'https://templates.invoicehome.com/invoice-template-us-neat-750px.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                question: 'Whats the total cost?',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              question: 'Whats the total cost?',
              url: 'https://templates.invoicehome.com/invoice-template-us-neat-750px.png',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              question: 'Whats the total cost?',
              base64:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              question: 'Whats the total cost?',
              base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'hi',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'visual-question-answering': {
      exampleModel: 'Salesforce/blip-vqa-base',
      description:
        'Answer questions based on image content for applications like interactive learning, accessibility features, and content analysis',
      icon: 'comments-question-check',
      supportsTextStreaming: false,
      supportsUrlInput: true,
      supportsBase64Input: true,
      mediaInputType: 'image',
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            question: {
              type: 'string',
              example: `What animal is this?`,
            },
            url: {
              type: 'string',
              example: `https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9`,
            },
            base64: {
              type: 'string',
              example: `data:image/webp;base64,...BASE_64_GOES_HERE (Only use this is you are not using a url)`,
            },
          },
          example: {
            question: 'What animal is this?',
            url: 'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
          },
          required: ['question', 'image'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'array',
              description: 'Successful response with the answers to the visual question',
              example: [
                {
                  answer: 'octopus',
                },
              ],
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription: 'Send an image URL and a question to receive an answer',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: {
              question: 'What kind of animal is this?',
              image:
                'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
            },
            requestInputHttp: {
              question: 'What kind of animal is this?',
              image:
                'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send an image URL and a question to receive an answer',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                question: 'What kind of animal is this?',
                url: 'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                question: 'What kind of animal is this?',
                base64:
                  'data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                question: 'What kind of animal is this?',
                base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                question: 'What kind of animal is this?',
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              question: 'What kind of animal is this?',
              url: 'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              question: 'What kind of animal is this?',
              base64:
                'data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              question: 'What kind of animal is this?',
              base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'hi',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'zero-shot-object-detection': {
      exampleModel: 'google/owlv2-base-patch16-finetuned',
      description:
        'Detect objects in images without prior training on those specific objects. Use cases include novel object detection, transfer learning, and few-shot learning',
      icon: 'scanner-image',
      supportsTextStreaming: false,
      supportsUrlInput: true,
      supportsBase64Input: true,
      mediaInputType: 'image',
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              example: `https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9`,
            },
            candidate_labels: {
              type: 'array',
              example: ['squid', 'octopus', 'human', 'cat'],
            },
            base64: {
              type: 'string',
              example: `data:image/webp;base64,...BASE_64_GOES_HERE (Only use this is you are not using a url)`,
            },
          },
          example: {
            url: 'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
            candidate_labels: ['squid', 'octopus', 'human', 'cat'],
          },
          required: ['url'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'array',
              description: 'Successful response with detected objects, scores, labels, and boxes',
              example: [
                {
                  score: 0.838,
                  label: 'octopus',
                  box: { xmin: 0, ymin: -2, xmax: 990, ymax: 665 },
                },
              ],
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription:
              'Send an image URL and a set of candidate labels to detect objects in the image',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
              candidate_labels: ['squid', 'octopus', 'human', 'cat'],
            },
            requestInputHttp: {
              url: 'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
              candidate_labels: ['squid', 'octopus', 'human', 'cat'],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription:
                'Send an image URL and a set of candidate labels to detect objects in the image',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                url: 'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
                candidate_labels: ['squid', 'octopus', 'human', 'cat'],
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64:
                  'data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
                candidate_labels: ['squid', 'octopus', 'human', 'cat'],
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
                candidate_labels: ['squid', 'octopus', 'human', 'cat'],
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                candidate_labels: ['squid', 'octopus', 'human', 'cat'],
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
              candidate_labels: ['squid', 'octopus', 'human', 'cat'],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64:
                'data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              candidate_labels: ['squid', 'octopus', 'human', 'cat'],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              candidate_labels: ['squid', 'octopus', 'human', 'cat'],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'hi',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'zero-shot-image-classification': {
      exampleModel: 'BilelDJ/clip-hugging-face-finetuned',
      description:
        'Classify images into categories not seen during training for applications like novel object recognition, transfer learning, and few-shot learning',
      icon: 'file-image',
      supportsTextStreaming: false,
      supportsUrlInput: true,
      supportsBase64Input: true,
      mediaInputType: 'image',
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              example: `https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9`,
            },
            candidate_labels: {
              type: 'array',
              example: ['octopus', 'cat', 'lizard'],
              items: { type: 'string' },
            },
            base64: {
              type: 'string',
              example: `data:image/webp;base64,...BASE_64_GOES_HERE (Only use this is you are not using a url)`,
            },
          },
          required: ['url', 'candidate_labels'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'array',
              description: 'Successful response with image-classification scores and labels',
              example: [
                {
                  score: 0.3334539234638214,
                  label: 'cat',
                },
                {
                  score: 0.3332984447479248,
                  label: 'octopus',
                },
                {
                  score: 0.3332476019859314,
                  label: 'lizard',
                },
              ],
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription:
              'Send an image URL and a set of candidate labels to receive classification results',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg',
              candidate_labels: ['squid', 'octopus', 'human', 'cat'],
            },
            requestInputHttp: {
              url: 'https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg',
              candidate_labels: ['squid', 'octopus', 'human', 'cat'],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription:
                'Send an image URL and a set of candidate labels to receive classification results',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                url: 'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
                candidate_labels: ['squid', 'octopus', 'human', 'cat'],
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64:
                  'data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
                candidate_labels: ['squid', 'octopus', 'human', 'cat'],
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
                candidate_labels: ['squid', 'octopus', 'human', 'cat'],
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input:
                'data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                candidate_labels: ['squid', 'octopus', 'human', 'cat'],
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              url: 'https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9',
              candidate_labels: ['squid', 'octopus', 'human', 'cat'],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64:
                'data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              candidate_labels: ['squid', 'octopus', 'human', 'cat'],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              base64: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
              candidate_labels: ['squid', 'octopus', 'human', 'cat'],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'hi',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'zero-shot-classification': {
      exampleModel: 'facebook/bart-large-mnli',
      description:
        'Classify text into categories not seen during training for applications like intent detection, content moderation, and dynamic classification',
      icon: 'magnifying-glass',
      supportsTextStreaming: false,
      openapiSpec: {
        requestBodyContentSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              example: `One day I will see the world`,
            },
            candidate_labels: {
              type: 'array',
              example: ['travel', 'cooking', 'dancing'],
              items: { type: 'string' },
            },
          },
          required: ['text', 'candidate_labels'],
        },
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'object',
              description:
                'Successful response with text-classification sequence, labels, and scores',
              example: {
                sequence: 'One day I will see the world',
                labels: ['travel', 'dancing', 'cooking'],
                scores: [0.9941015839576721, 0.0031261409167200327, 0.002772255800664425],
              },
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription:
              'Send a text input and a set of candidate labels to receive classification results',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: {
              text: 'One day I will see the world',
              candidate_labels: ['travel', 'cooking', 'dancing'],
            },
            requestInputHttp: {
              text: 'One day I will see the world',
              candidate_labels: ['travel', 'cooking', 'dancing'],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription: 'Send a text prompt to generate a video output',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              input: {
                text: 'One day I will see the world',
                candidate_labels: ['travel', 'cooking', 'dancing'],
              },
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              text: 'One day I will see the world',
              candidate_labels: ['travel', 'cooking', 'dancing'],
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'text',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'hi',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
    'unconditional-image-generation': {
      exampleModel: 'afshr/cam_finetune',
      description: 'Randomly generate images without an input',
      icon: 'image',
      supportsTextStreaming: false,
      openapiSpec: {
        requestBodyContentSchema: {},
        responseBodyContentSchema: {
          type: 'object',
          required: ['error', 'output'],
          properties: {
            error: {
              type: 'string',
              nullable: true,
              description: 'Null on success; otherwise an error message.',
            },
            output: {
              type: 'string',
              description: 'Successful response with the generated image link',
              example: 'https://api.bytez.com/image/1234567890',
            },
          },
        },
      },
      docExamples: {
        shouldSucceed: [
          {
            testName: 'Basic usage, non streaming, without params',
            testDescription:
              'Generate images without specific conditions or inputs for applications in art generation, creative design, and data augmentation',
            docsExample: {
              mintlify: true,
              dockerhub: false,
            },
            requestInput: undefined,
            requestInputHttp: {},
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: 'Basic usage',
              exampleDescription:
                'Generate images without specific conditions or inputs for applications in art generation, creative design, and data augmentation',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
        shouldFail: [],
      },
      sdk: {
        shouldSucceed: [],
        shouldFail: [],
      },
      http: {
        shouldSucceed: [],
        shouldFail: [
          {
            testName: '',
            testDescription: '',
            docsExample: {
              mintlify: false,
              dockerhub: false,
            },
            requestInput: {
              thisPropShouldThrow: 'hi',
            },
            params: {},
            options: {
              stream: false,
            },
            mintlifyProps: {
              exampleTitle: '',
              exampleDescription: '',
            },
            dockerhubProps: {
              description: '',
            },
          },
        ],
      },
    },
  },
};

module.exports = { MODEL_DOCS_OBJECT };
