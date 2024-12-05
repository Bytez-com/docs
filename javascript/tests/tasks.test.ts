import assert from "node:assert/strict";
import { describe, it, after } from "node:test";
//
// import Bytez from "bytez.js";
import Bytez from "../src/index";

async function getImageData(url) {
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();

  return {
    url,
    base64: Buffer.from(arrayBuffer).toString("base64")
  };
}

// const getModels = (task, limit = 10) =>
//   client.list.models
//     .all()
//     .then(models =>
//       models
//         .filter(model => model.task === task)
//         .sort((a, b) => a.ramRequired - b.ramRequired)
//         .slice(0, limit)
//     )
//     .then(console.log);

const client = new Bytez(process.env.BYTEZ_KEY ?? "");

// text input
describe.skip("text generation", async () => {
  it("list models", async () => {
    const list = await client.list.models.all();

    assert(Array.isArray(list), "should return array of models");
    assert(list.length !== 0, "array is not empty");
    assert(
      list.every(
        model => model.modelId !== undefined && model.ramRequired !== undefined
      ),
      "all models should have name and RAM"
    );
  });

  it("lists running instances", async () => {
    const instances = await client.list.instances();

    assert(Array.isArray(instances), "should return array of instances");
  });

  const modelId = "openai-community/gpt2";
  const model = client.model(modelId);

  it("creates a model class", () => {
    assert(model.id === modelId, "loads the right model");
  });

  await it("starts a model", async () => {
    const { status, error } = await model.start();

    if (status) {
      assert(status === "started", "model starts");
    } else {
      assert(
        error.message.includes("already loaded") ||
          (error.message.includes(modelId) &&
            error.message.includes("operation already in progress: load")),
        "model already started"
      );
    }
  });

  it("returns model status", async () => {
    const { status } = await model.status();

    assert(
      ["STARTING", "RUNNING", "INSTANTIATING"].includes(status),
      "returns status deploying"
    );
  });

  await it("awaits model load", async () => {
    await model.load();

    const { status } = await model.status();

    assert(status === "RUNNING", "model is now running");
  });

  await it("runs a model", async () => {
    const response = await model.run("Jack and jill");
    console.log(response);
    assert(
      typeof response.output?.[0]?.generated_text === "string",
      "returns output"
    );
  });

  await it("streams text", async () => {
    const stream = await model.run("Jack and jill", {
      stream: true
    });
    const textStream = stream.pipeThrough(new TextDecoderStream());
    let testPass = false;
    // console.log(textStream);

    for await (const chunk of textStream) {
      // console.log({ chunk });
      if (testPass === false) {
        testPass = typeof chunk === "string";
        assert(testPass, "streams output");
      }
    }
  });

  await it("runs a model with params", async () => {
    const input = "Jack and Jill ";
    const response = await model.run(input, {
      min_new_tokens: 1,
      max_new_tokens: 1
    });
    // console.log(response);
    const newText = response.output?.[0]?.generated_text;
    // console.log(newText);
    assert(typeof newText === "string", "returns output");
    assert(
      newText.split(" ").length === input.trim().split(" ").length + 1,
      "returns output"
    );
  });

  await it("stops a model", async () => {
    await model.stop();

    const response = await model.status();

    assert(response.status !== "RUNNING", "model is stopped");
  });
});
describe.skip("chat models", async () => {
  const model = client.model("microsoft/Phi-3-mini-4k-instruct");
  const messages = [
    {
      role: "system",
      content:
        "You are a friendly chatbot who always responds in the style of a pirate"
    },
    {
      role: "user",
      content: "How many helicopters can a human eat in one sitting?"
    }
  ];

  await model.load();

  await it("runs a model", async () => {
    const response = await model.run(messages, { max_length: 40 });
    const generatedMessages = response.output?.[0]?.generated_text;

    assert(
      Array.isArray(generatedMessages) &&
        generatedMessages.length === messages.length + 1,
      "returns output"
    );
  });

  await it("streams text", async () => {
    const stream = await model.run(messages, { stream: true, max_length: 40 });
    const textStream = stream.pipeThrough(new TextDecoderStream());
    let testPass = false;
    // console.log(textStream);

    for await (const chunk of textStream) {
      // console.log({ chunk });
      if (testPass === false) {
        testPass = typeof chunk === "string";
        assert(testPass, "streams output");
      }
    }
  });

  after(() => model.stop());
});
describe.skip("summarization", async () => {
  const model = client.model("ainize/bart-base-cnn");
  const input =
    "The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. It was the first structure to reach a height of 300 metres. Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.";

  await model.load();

  await it("passes", async () => {
    const response = await model.run(input, { max_length: 40 });
    const output = response.output?.[0]?.summary_text;

    assert(output.length < input.length + 1, "returns output");
  });

  after(() => model.stop());
});
describe.skip("translation", async () => {
  const model = client.model("Areeb123/En-Fr_Translation_Model");

  await model.load();

  await it("passes", async () => {
    const response = await model.run("Hello");
    const output = response.output?.[0]?.translation_text;

    assert(output.length !== 0, "returns output");
  });

  after(() => model.stop());
});
describe.skip("text2text-generation", async () => {
  const model = client.model("bigscience/mt0-small");

  await model.load();

  await it("passes", async () => {
    const response = await model.run("Hello");
    const output = response.output?.[0]?.generated_text;

    assert(output.length !== 0, "returns output");
  });

  after(() => model.stop());
});
describe.skip("text-to-image", async () => {
  const model = client.model("IDKiro/sdxs-512-0.9");

  await model.load();

  await it("passes", async () => {
    const response = await model.run("A cat in the hat");
    const output = response.output_png;

    assert(output.length !== 0, "returns output");
  });

  after(() => model.stop());
});
describe.skip("text-to-video", async () => {
  const model = client.model("ali-vilab/text-to-video-ms-1.7b");

  await model.load();

  await it("passes", async () => {
    const response = await model.run("A cat in the hat");
    const output = response.output_mp4;

    assert(output.length !== 0, "returns output");
  });

  after(() => model.stop());
});
// image input
describe.skip("image-to-text", async () => {
  const model = client.model("captioner/caption-gen");
  const [{ url, base64 }] = await Promise.all([
    getImageData(
      "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9"
    ),
    model.load()
  ]);

  await it("passes - input url", async () => {
    const response = await model.run(url);
    const output = response.output?.[0].generated_text;

    assert(output.length !== 0, "returns output");
  });
  await it("passes - input -> png base64 encoded", async () => {
    const response = await model.run(base64);
    const output = response.output?.[0].generated_text;

    console.log(response);

    assert(output.length !== 0, "returns output");
  });

  after(() => model.stop());
});
// json input
describe.skip("question-answering", async () => {
  const model = client.model("airesearch/xlm-roberta-base-finetune-qa");

  await model.load();

  await it("passes", async () => {
    const response = await model.run({
      question: "Where do I live?",
      context: "My name is Merve and I live in İstanbul."
    });
    const output = response.output;

    assert(
      !!(output.score && output.start && output.end && output.answer),
      "returns output"
    );
  });

  after(() => model.stop());
});
describe.skip("visual-question-answering", async () => {
  const model = client.model("aqachun/Vilt_fine_tune_2000");
  const [{ url, base64 }] = await Promise.all([
    getImageData(
      "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9"
    ),
    model.load()
  ]);

  await it("passes - input url", async () => {
    const response = await model.run({
      image: url,
      question: "What kind of animal is this?"
    });
    const output = response.output;

    assert(Array.isArray(output), "returns output");
    assert(
      output.every(entry => entry.score && entry.answer),
      "schema test"
    );
  });
  await it("passes - input -> png base64 encoded", async () => {
    const response = await model.run({
      image: base64,
      question: "What kind of animal is this?"
    });
    const output = response.output;

    assert(Array.isArray(output), "returns output");
    assert(
      output.every(entry => entry.score && entry.answer),
      "schema test"
    );
  });

  // after(() => model.stop());
});
describe.skip("document-question-answering", async () => {
  const model = client.model("cloudqi/CQI_Visual_Question_Awnser_PT_v0");
  const [{ url, base64 }] = await Promise.all([
    getImageData(
      "https://templates.invoicehome.com/invoice-template-us-neat-750px.png"
    ),
    model.load()
  ]);

  await it("passes - input url", async () => {
    const response = await model.run({
      image: url,
      question: "What's the total cost?"
    });
    const output = response.output;

    assert(Array.isArray(output), "returns output");
    assert(
      output.every(
        entry => entry.score && entry.answer && entry.start && entry.end
      ),
      "schema test"
    );
  });
  await it("passes - input -> png base64 encoded", async () => {
    const response = await model.run({
      image: base64,
      question: "What's the total cost?"
    });
    const output = response.output;

    assert(Array.isArray(output), "returns output");
    assert(
      output.every(
        entry => entry.score && entry.answer && entry.start && entry.end
      ),
      "schema test"
    );
  });

  after(() => model.stop());
});
describe.skip("depth-estimation", async () => {
  const model = client.model("depth-anything/Depth-Anything-V2-Base-hf");
  const [{ url, base64 }] = await Promise.all([
    getImageData(
      "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9"
    ),
    model.load()
  ]);

  await it("passes - input url", async () => {
    const response = await model.run(url);
    const output = response.output;

    assert(
      output.depth_png && Array.isArray(output.formatted_predicted_depth_array),
      "returns output"
    );
  });
  await it("passes - input -> png base64 encoded", async () => {
    const response = await model.run(base64);
    const output = response.output;

    assert(
      output.depth_png && Array.isArray(output.formatted_predicted_depth_array),
      "returns output"
    );
  });

  after(() => model.stop());
});
describe.skip("mask-generation", async () => {
  const model = client.model("ahishamm/skinsam");
  const [{ base64 }] = await Promise.all([
    getImageData(
      "https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png"
    ),
    model.load()
  ]);

  await model.load();

  const test = output =>
    assert(
      output.input_image_dimensions && output.masks && output.scores,
      "returns output"
    );

  await it("passes - input -> png base64 encoded", async () => {
    const response = await model.run(base64);
    const output = response.output ?? {};

    test(output);
  });

  after(() => model.stop());
});
describe.skip("image-segmentation", async () => {
  const model = client.model("apple/deeplabv3-mobilevit-small");
  const [{ url, base64 }] = await Promise.all([
    getImageData(
      "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9"
    ),
    model.load()
  ]);
  const test = output =>
    assert(
      output?.every(
        entry =>
          entry.label !== undefined &&
          entry.score !== undefined &&
          entry.mask_png !== undefined
      ),
      "returns output"
    );

  await it("passes - input url", async () => {
    const response = await model.run(url);
    const output = response.output;

    test(output);
  });
  await it("passes - input -> png base64 encoded", async () => {
    const response = await model.run(base64);
    const output = response.output;

    test(output);
  });

  after(() => model.stop());
});
describe.skip("image-classification", async () => {
  const model = client.model("akahana/vit-base-cats-vs-dogs");
  const [{ url, base64 }] = await Promise.all([
    getImageData(
      "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9"
    ),
    model.load()
  ]);
  const test = output =>
    assert(
      output?.every(
        entry => entry.label !== undefined && entry.score !== undefined
      ),
      "returns output"
    );

  await it("passes - input url", async () => {
    const response = await model.run(url);
    const output = response.output;

    console.log(response);

    test(output);
  });
  await it("passes - input -> png base64 encoded", async () => {
    const response = await model.run(base64);
    const output = response.output;
    console.log(response);

    test(output);
  });

  after(() => model.stop());
});
describe.skip("zero-shot-image-classification", async () => {
  const model = client.model("BilelDJ/clip-hugging-face-finetuned");
  const [{ url, base64 }] = await Promise.all([
    getImageData(
      "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9"
    ),
    model.load()
  ]);
  const test = output =>
    assert(
      output?.every(
        entry => entry.label !== undefined && entry.score !== undefined
      ),
      "returns output"
    );

  await it("passes - input url", async () => {
    const response = await model.run({
      image: url,
      candidate_labels: ["squid", "octopus", "human", "cat"]
    });
    const output = response.output;

    test(output);
  });
  await it("passes - input -> png base64 encoded", async () => {
    const response = await model.run({
      image: base64,
      candidate_labels: ["squid", "octopus", "human", "cat"]
    });
    const output = response.output;

    test(output);
  });

  after(() => model.stop());
});
describe.skip("object-detection", async () => {
  const model = client.model("aisak-ai/aisak-detect");
  const [{ url, base64 }] = await Promise.all([
    getImageData(
      "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9"
    ),
    model.load()
  ]);
  const test = output =>
    assert(
      output?.every(
        entry =>
          entry.label !== undefined && entry.score !== undefined && !!entry.box
      ),
      "returns output"
    );

  await it("passes - input url", async () => {
    const response = await model.run(url);
    const output = response.output;

    console.log(response);

    test(output);
  });
  await it("passes - input -> png base64 encoded", async () => {
    const response = await model.run(base64);
    const output = response.output;
    console.log(response);

    test(output);
  });

  after(() => model.stop());
});
describe.skip("zero-shot-object-detection", async () => {
  const model = client.model("google/owlv2-base-patch16-finetuned");
  const [{ url, base64 }] = await Promise.all([
    getImageData(
      "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9"
    ),
    model.load()
  ]);
  const test = output =>
    assert(
      output?.every(
        entry =>
          entry.label !== undefined &&
          entry.score !== undefined &&
          entry.box !== undefined
      ),
      "returns output"
    );

  await it("passes - input url", async () => {
    const response = await model.run({
      image: url,
      candidate_labels: ["squid", "octopus", "human", "cat"]
    });
    const output = response.output;

    test(output);
  });
  await it("passes - input -> png base64 encoded", async () => {
    const response = await model.run({
      image: base64,
      candidate_labels: ["squid", "octopus", "human", "cat"]
    });

    const output = response.output;

    test(output);
  });

  after(() => model.stop());
});
// works inconsistently
describe.skip("video-classification", async () => {
  const model = client.model("ahmedabdo/video-classifier");
  const [{ url, base64 }] = await Promise.all([
    getImageData(
      "https://videos.pexels.com/video-files/3010138/3010138-hd_1920_1080_24fps.mp4"
    ),
    model.load()
  ]);
  const test = output =>
    assert(
      output?.every(
        entry => entry.label !== undefined && entry.score !== undefined
      ),
      "returns output"
    );

  await it("passes - input url", async () => {
    const response = await model.run({ mp4Url: url });
    const output = response.output?.[0];

    test(output);
  });
  await it("passes - input -> png base64 encoded", async () => {
    const response = await model.run({
      b64VideoBufferMp4: base64
    });
    const output = response.output?.[0];

    test(output);
  });

  after(() => model.stop());
});
describe.skip("unconditional-image-generation", async () => {
  const model = client.model("afshr/cam_finetune");

  await model.load();
  await it("passes - params only", async () => {
    const response = await model.run({}, {});
    const output = response.output_png;

    assert(output !== undefined);
  });

  after(() => model.stop());
});
describe.skip("image-feature-extraction", async () => {
  const model = client.model("facebook/dinov2-base");
  const [{ url, base64 }] = await Promise.all([
    getImageData(
      "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9"
    ),
    model.load()
  ]);
  const test = output =>
    assert(
      output?.every(vector => Array.isArray(vector)),
      "returns output"
    );

  await it("passes - input url", async () => {
    const response = await model.run(url);
    const output = response.output;

    test(output);
  });
  await it("passes - input -> png base64 encoded", async () => {
    const response = await model.run(base64);
    const output = response.output;

    test(output);
  });

  after(() => model.stop());
});
describe.skip("feature-extraction", async () => {
  const model = client.model("allenai/specter2_base");

  await model.load();
  await it("passes", async () => {
    const response = await model.run("Hello");
    const output = response.output;

    assert(Array.isArray(output));
  });

  after(() => model.stop());
});
describe.skip("sentence-similarity", async () => {
  const model = client.model(
    "embedding-data/distilroberta-base-sentence-transformer"
  );

  await model.load();
  await it("passes", async () => {
    const response = await model.run("Hello");
    const output = response.output;

    assert(Array.isArray(output));
  });

  after(() => model.stop());
});
describe.skip("fill-mask", async () => {
  const model = client.model("almanach/camembert-base");

  await model.load();
  await it("passes", async () => {
    const response = await model.run("Hello <mask>");
    const output = response.output;

    assert(Array.isArray(output));
  });

  after(() => model.stop());
});
describe.skip("text-classification", async () => {
  const model = client.model(
    "AdamCodd/distilbert-base-uncased-finetuned-sentiment-amazon"
  );

  await model.load();
  await it("passes", async () => {
    const response = await model.run("Me likely long time");
    const output = response.output;

    assert(output.every(entry => entry.label && entry.score));
  });

  after(() => model.stop());
});
describe.skip("token-classification", async () => {
  const model = client.model("2rtl3/mn-xlm-roberta-base-named-entity");

  await model.load();
  await it("passes", async () => {
    const response = await model.run("John went to NYC");
    const output = response.output;

    assert(Array.isArray(output));
  });

  after(() => model.stop());
});
describe.skip("zero-shot-classification", async () => {
  const model = client.model("AyoubChLin/DistilBERT_eco_ZeroShot");

  await model.load();
  await it("passes", async () => {
    const response = await model.run({
      text: "Ninja turtles are cool",
      candidate_labels: ["positive,", "negative"]
    });
    const output = response.output;

    assert(output.sequence && output.labels && output.scores);
  });

  after(() => model.stop());
});
// must accept URLS
describe.skip("audio-classification", async () => {
  const model = client.model("aaraki/wav2vec2-base-finetuned-ks");
  const [{ base64 }] = await Promise.all([
    getImageData(
      "https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav"
    ),
    model.load()
  ]);

  await it("passes", async () => {
    const response = await model.run({ b64AudioBufferWav: base64 });
    const output = response.output;

    assert(Array.isArray(output));
  });

  after(() => model.stop());
});
describe.skip("text-to-speech", async () => {
  const model = client.model("facebook/mms-tts-eng");

  await model.load();
  await it("passes", async () => {
    const response = await model.run("Hello");
    const output = response.output_wav;

    assert(!!output);
  });

  after(() => model.stop());
});
describe.skip("automatic-speech-recognition", async () => {
  const model = client.model("facebook/data2vec-audio-base-960h");
  const [{ base64 }] = await Promise.all([
    getImageData(
      "https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/automatic-speech-recognition/input.flac"
    ),
    model.load()
  ]);

  await it("passes", async () => {
    const response = await model.run({ b64AudioBufferWav: base64 });
    const output = response.output;

    assert(!!output.text);
  });

  after(() => model.stop());
});
// fails to work
describe.skip("text-to-audio", async () => {
  const model = client.model("facebook/musicgen-stereo-large");

  await model.load();
  await it("passes", async () => {
    const response = await model.run("lo-fi music with a soothing melody");
    const output = response.output_wav;
    console.log({ response, output });
    assert(!!response.output_wav);
  });

  after(() => model.stop());
});

//
// getModels("text-to-audio", 100);
