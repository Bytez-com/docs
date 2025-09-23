/* eslint-disable max-len */
const INPUT_MAP = {
  'text-generation': {
    exampleModel: 'openai-community/gpt2',
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
          requestInputHttp: { text: 'Once upon a time there was a beautiful home where' },
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
    exampleModel: 'Qwen/Qwen3-4B',
    docExamples: {
      shouldSucceed: [
        {
          testName: 'Basic usage, non streaming, no params',
          testDescription: 'Send a conversation to a model to generate text',
          docsExample: {
            mintlify: true,
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
            exampleTitle: '',
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
  'sentence-similarity': {
    exampleModel: 'sentence-transformers/all-MiniLM-L6-v2',
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
          requestInputHttp: { text: 'A beautiful landscape with mountains and a river' },
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
          requestInputHttp: { text: "Hello, how are you? Beautiful day today, isn't it?" },
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
          params: { max_new_tokens: 200, min_new_tokens: 50, temperature: 0.5 },
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
            input: 'data:audio/flac;base64,UklGRuQAAABXQVZFZm10IBAAAAABAAIAESsAACJWAAACABAAZGF0YXX',
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
            input: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
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
            input: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
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
            exampleDescription: 'Send an image to a model to detect objects and get bounding boxes',
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
            input: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
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
            exampleDescription: 'Send an image to a depth estimation model to generate a depth map',
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
            input: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
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
            input: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
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
            input: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
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
            input: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
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
            input: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA',
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
};

module.exports = { INPUT_MAP };
