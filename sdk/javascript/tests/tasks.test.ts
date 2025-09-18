import assert from "node:assert/strict";
import { describe, it, after } from "node:test";
//
// import Bytez from "bytez.js";
import Bytez from "../src/index";
// import Bytez from "../src/index.browser";;

async function getDataUrl(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const buffer = await blob.arrayBuffer().then(Buffer.from);

  return `data:${blob.type};base64,${buffer.toString("base64")}`;
}

const client = new Bytez(process.env.BYTEZ_KEY ?? "", true);

describe.skip("list", async () => {
  it("models", async () => {
    const [allModels, chatModels, singleModel] = await Promise.all([
      client.list.models(),
      client.list.models({ task: "chat" }),
      client.list.models({ modelId: "openai-community/gpt2" })
    ]);

    assert(allModels.error === null && Array.isArray(allModels.output));
    assert(
      chatModels.error === null &&
        Array.isArray(chatModels.output) &&
        chatModels.output.length < allModels.output.length
    );
    assert(
      singleModel.error === null &&
        Array.isArray(singleModel.output) &&
        singleModel.output.length === 1
    );
  });

  it("tasks", async () => {
    const { error, output } = await client.list.tasks();

    assert(error === null);
    assert(Array.isArray(output), "should return array ");
  });
});
// text input
describe.skip("text generation", async () => {
  const modelId = "openai-community/gpt2";

  const model = client.model(modelId);

  it("creates a model class", () => {
    assert(model.id === modelId, "loads the right model");
  });

  it("runs a model", async () => {
    const { error, output } = await model.run("Jack and jill", {
      min_new_tokens: 1,
      max_new_tokens: 1
    });

    assert(error === null);
    assert(typeof output === "string", "returns output");
  });

  it("runs a model with params", async () => {
    const input = "Jack and Jill ";
    const { error, output } = await model.run(input, {
      min_new_tokens: 1,
      max_new_tokens: 1
    });

    assert(error === null);
    assert(typeof output === "string", "returns output");
    assert(
      output.split(" ").length === input.trim().split(" ").length + 1,
      "returns output"
    );
  });

  it("streams text in node.js", async () => {
    let readStream = await model.run("Jack and jill", true);
    let testPass = false;
    // console.log(textStream);

    for await (const chunk of readStream.setEncoding("utf8")) {
      // console.log({ chunk });
      if (testPass === false) {
        testPass = typeof chunk === "string";
        assert(testPass, "streams output");
      }
    }

    readStream = await model.run("Jack and jill", { max_length: 100 }, true);

    testPass = false;

    for await (const chunk of readStream.setEncoding("utf8")) {
      if (testPass === false) {
        testPass = typeof chunk === "string";
        assert(testPass, "streams output");
      }
    }
  });

  it("streams text in browsers", async () => {
    const browserClient = new Bytez(process.env.BYTEZ_KEY ?? "", true, true);
    const model = browserClient.model("openai-community/gpt2");
    const readStream = await model.run("Jack and jill", true);
    const textStream = readStream.pipeThrough(new TextDecoderStream());
    let testPass = false;

    for await (const chunk of textStream) {
      // console.log({ chunk });
      if (testPass === false) {
        testPass = typeof chunk === "string";

        assert(testPass, "streams output");
      }
    }
  });

  it("`stream = false` does not stream", async () => {
    let { error, output } = await model.run("Jack and jill", false);

    assert(error === null);
    assert(typeof output === "string", "returns output");

    ({ error, output } = await model.run(
      "Jack and jill",
      { max_length: 100 },
      false
    ));

    assert(error === null);
    assert(typeof output === "string", "returns output");
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

  it("runs a model", async () => {
    const { error, output } = await model.run(messages, { max_length: 40 });

    assert(error === null);
    assert(typeof output?.content === "string", "returns output");
  });

  it("streams text", async () => {
    const stream = await model.run(messages, { max_length: 40 }, true);
    let testPass = false;
    // console.log(textStream);

    for await (const chunk of stream.setEncoding("utf8")) {
      // console.log({ chunk });
      if (testPass === false) {
        testPass = typeof chunk === "string";
        assert(testPass, "streams output");
      }
    }
  });
});
describe.skip("chat model - closed source", async () => {
  const model = client.model(
    "google/gemini-2.0-flash-thinking-exp-01-21",
    process.env.GEMINI_API_KEY
  );
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

  it("runs a model", async () => {
    const { error, output } = await model.run(messages);

    assert(error === null);
    assert(typeof output?.content === "string", "returns output");
  });

  it("streams text", async () => {
    const stream = await model.run(messages, true);
    let testPass = false;

    for await (const chunk of stream.setEncoding("utf8")) {
      // console.log({ chunk });
      if (testPass === false) {
        testPass = typeof chunk === "string";
        assert(testPass, "streams output");
      }
    }
  });
});
describe.skip("summarization", async () => {
  const model = client.model("ainize/bart-base-cnn");
  const input =
    "The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. It was the first structure to reach a height of 300 metres. Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.";

  it("passes", async () => {
    const { error, output } = await model.run(input, { max_length: 40 });

    assert(error === null);
    assert(output.length < input.length + 1, "returns output");
  });
});
describe.skip("translation", async () => {
  const model = client.model("Areeb123/En-Fr_Translation_Model");

  it("passes", async () => {
    const { error, output } = await model.run("Hello");

    assert(error === null);
    assert(output.length !== 0, "returns output");
  });
});
describe.skip("text2text-generation", async () => {
  const model = client.model("bigscience/mt0-small");

  it("passes", async () => {
    const { error, output } = await model.run("Hello");

    assert(error === null);
    assert(typeof output === "string" && output.length !== 0, "returns output");
  });
});
describe.skip("text-to-image", async () => {
  const model = client.model("IDKiro/sdxs-512-0.9");

  it("sends back data-url", async () => {
    const { error, output } = await model.run("A cat in the hat");

    assert(error === null);
    assert(output?.startsWith("https://cdn.bytez.com"), "returns output");
  });

  it("streams back pure media", async () => {
    const readStream = await model.run("A cat in the hat", true);

    for await (const chunk of readStream) {
      assert(chunk.toString()?.includes("PNG"), "streams output");
    }
  });
});
// works consistently?
describe.skip("text-to-video", async () => {
  const model = client.model("ali-vilab/text-to-video-ms-1.7b");

  it("passes", async () => {
    const { error, output } = await model.run("A cat in the hat");

    assert(error === null);
    assert(typeof output === "string" && output.length !== 0, "returns output");
  });

  it("streams back pure media", async () => {
    const readStream = await model.run("A cat in the hat", true);

    for await (const chunk of readStream) {
      assert(typeof chunk.toString(), "streams output");
    }
  });
});
// image input
describe.skip("image-to-text", async () => {
  const model = client.model("captioner/caption-gen");
  const url =
    "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9";
  const dataUrl = await getDataUrl(url);

  it("passes - input url", async () => {
    const { error, output } = await model.run(url);

    assert(error === null);
    assert(output.length !== 0, "returns output");
  });
  it("passes - input -> png base64 encoded", async () => {
    const { error, output } = await model.run(dataUrl);

    assert(error === null);
    assert(output.length !== 0, "returns output");
  });
});
// // json input
describe.skip("question-answering", async () => {
  const model = client.model("airesearch/xlm-roberta-base-finetune-qa");

  it("passes", async () => {
    const { error, output } = await model.run({
      question: "Where do I live?",
      context: "My name is Merve and I live in İstanbul."
    });

    assert(error === null);
    assert(
      !!(output.score && output.start && output.end && output.answer),
      "returns output"
    );
  });
});
describe.skip("visual-question-answering", async () => {
  const url =
    "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9";
  const model = client.model("aqachun/Vilt_fine_tune_2000");
  const [base64] = await Promise.all([getDataUrl(url), model.create()]);

  it("passes - input url", async () => {
    const { error, output } = await model.run({
      url,
      question: "What kind of animal is this?"
    });

    assert(error === null);
    assert(Array.isArray(output), "returns output");
    assert(
      output.every(entry => entry.score && entry.answer),
      "schema test"
    );
  });
  it("passes - input -> png base64 encoded", async () => {
    const { error, output } = await model.run({
      base64,
      question: "What kind of animal is this?"
    });

    assert(error === null);
    assert(Array.isArray(output), "returns output");
    assert(
      output.every(entry => entry.score && entry.answer),
      "schema test"
    );
  });
});
describe.skip("document-question-answering", async () => {
  const url =
    "https://templates.invoicehome.com/invoice-template-us-neat-750px.png";

  const model = client.model("cloudqi/CQI_Visual_Question_Awnser_PT_v0");
  const [base64] = await Promise.all([getDataUrl(url), model.create()]);

  it("passes - input url", async () => {
    const { error, output } = await model.run({
      url,
      question: "What's the total cost?"
    });

    assert(error === null);
    assert(Array.isArray(output), "returns output");
    assert(
      output.every(
        entry => entry.score && entry.answer && entry.start && entry.end
      ),
      "schema test"
    );
  });
  it("passes - input -> png base64 encoded", async () => {
    const { error, output } = await model.run({
      base64,
      question: "What's the total cost?"
    });

    assert(error === null);
    assert(Array.isArray(output), "returns output");
    assert(
      output.every(
        entry => entry.score && entry.answer && entry.start && entry.end
      ),
      "schema test"
    );
  });
});
describe.skip("depth-estimation", async () => {
  const url =
    "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9";
  const model = client.model("depth-anything/Depth-Anything-V2-Base-hf");
  const dataUrl = await getDataUrl(url);

  it("passes - input url", async () => {
    const { error, output } = await model.run(url);

    assert(error === null);
    assert(
      output.depth_png && Array.isArray(output.formatted_predicted_depth_array),
      "returns output"
    );
  });
  it("passes - input -> png base64 encoded", async () => {
    const { error, output } = await model.run(dataUrl);

    assert(error === null);
    assert(
      output.depth_png && Array.isArray(output.formatted_predicted_depth_array),
      "returns output"
    );
  });
});
// check mask generation - works inconsistently?
describe.skip("mask-generation", async () => {
  const url =
    "https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png";

  const model = client.model("ahishamm/skinsam");
  const dataUrl = await getDataUrl(url);

  const test = output =>
    assert(
      output.input_image_dimensions && output.masks && output.scores,
      "returns output"
    );

  it("passes - url", async () => {
    const { error, output } = await model.run(url);

    assert(error === null);
    test(output);
  });

  it("passes - input -> png base64 encoded", async () => {
    const { error, output } = await model.run(dataUrl);

    assert(error === null);
    test(output);
  });
});
describe.skip("image-segmentation", async () => {
  const model = client.model("apple/deeplabv3-mobilevit-small");
  const url =
    "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9";
  const dataUrl = await getDataUrl(url);

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

  it("passes - input url", async () => {
    const { error, output } = await model.run(url);

    assert(error === null);
    test(output);
  });
  it("passes - input -> png base64 encoded", async () => {
    const { error, output } = await model.run(dataUrl);

    assert(error === null);
    test(output);
  });
});
describe.skip("image-classification", async () => {
  const model = client.model("akahana/vit-base-cats-vs-dogs");
  const url =
    "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9";
  const dataUrl = await getDataUrl(url);

  const test = output =>
    assert(
      output?.every(
        entry => entry.label !== undefined && entry.score !== undefined
      ),
      "returns output"
    );

  it("passes - input url", async () => {
    const { error, output } = await model.run(url);

    console.log({ error, output });

    assert(error === null);
    test(output);
  });
  it("passes - input -> png base64 encoded", async () => {
    const { error, output } = await model.run(dataUrl);

    console.log({ error, output });

    assert(error === null);
    test(output);
  });
});
describe.skip("zero-shot-image-classification", async () => {
  const model = client.model("BilelDJ/clip-hugging-face-finetuned");
  const url =
    "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9";
  const [base64] = await Promise.all([getDataUrl(url), model.create()]);

  const test = output =>
    assert(
      output?.every(
        entry => entry.label !== undefined && entry.score !== undefined
      ),
      "returns output"
    );

  it("passes - input url", async () => {
    const { error, output } = await model.run({
      url,
      candidate_labels: ["squid", "octopus", "human", "cat"]
    });

    assert(error === null);
    test(output);
  });
  it("passes - input -> png base64 encoded", async () => {
    const { error, output } = await model.run({
      base64,
      candidate_labels: ["squid", "octopus", "human", "cat"]
    });

    assert(error === null);
    test(output);
  });
});
describe.skip("object-detection", async () => {
  const model = client.model("aisak-ai/aisak-detect");
  const url =
    "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9";
  const dataUrl = await getDataUrl(url);

  const test = output =>
    assert(
      output?.every(
        entry =>
          entry.label !== undefined && entry.score !== undefined && !!entry.box
      ),
      "returns output"
    );

  it("passes - input url", async () => {
    const { error, output } = await model.run(url);

    assert(error === null);
    test(output);
  });
  it("passes - input -> png base64 encoded", async () => {
    const { error, output } = await model.run(dataUrl);

    assert(error === null);
    test(output);
  });
});
describe.skip("zero-shot-object-detection", async () => {
  const model = client.model("google/owlv2-base-patch16-finetuned");
  const url =
    "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9";
  const [base64] = await Promise.all([getDataUrl(url), model.create()]);

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

  it("passes - input url", async () => {
    const { error, output } = await model.run({
      url,
      candidate_labels: ["squid", "octopus", "human", "cat"]
    });

    assert(error === null);
    test(output);
  });
  it("passes - input -> png base64 encoded", async () => {
    const { error, output } = await model.run({
      base64,
      candidate_labels: ["squid", "octopus", "human", "cat"]
    });

    assert(error === null);
    test(output);
  });
});
// works inconsistently?
describe.skip("video-classification", async () => {
  const model = client.model("ahmedabdo/video-classifier");
  const url =
    "https://videos.pexels.com/video-files/3010138/3010138-hd_1920_1080_24fps.mp4";
  const dataUrl = await getDataUrl(url);
  const test = output =>
    assert(
      output?.every(
        entry => entry.label !== undefined && entry.score !== undefined
      ),
      "returns output"
    );

  it("passes - input url", async () => {
    const { error, output } = await model.run(url);

    assert(error === null);
    test(output);
  });
  it("passes - input -> png base64 encoded", async () => {
    const { error, output } = await model.run(dataUrl);

    assert(error === null);
    test(output);
  });
});
describe.skip("unconditional-image-generation", async () => {
  const model = client.model("afshr/cam_finetune");

  it("passes - params only", async () => {
    const { error, output } = await model.run();

    assert(error === null);
    assert(output !== null);
  });
});
describe.skip("image-feature-extraction", async () => {
  const model = client.model("facebook/dinov2-base");
  const url =
    "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9";
  const dataUrl = await getDataUrl(url);

  const test = output =>
    assert(
      output?.every(vector => Array.isArray(vector)),
      "returns output"
    );

  it("passes - input url", async () => {
    const { error, output } = await model.run(url);

    assert(error === null);
    test(output);
  });
  it("passes - input -> png base64 encoded", async () => {
    const { error, output } = await model.run(dataUrl);

    assert(error === null);
    test(output);
  });
});
describe.skip("feature-extraction", async () => {
  const model = client.model("allenai/specter2_base");

  it("passes", async () => {
    const { error, output } = await model.run("Hello");

    assert(error === null);
    assert(Array.isArray(output));
  });
});
describe.skip("sentence-similarity", async () => {
  const model = client.model(
    "embedding-data/distilroberta-base-sentence-transformer"
  );

  it("passes", async () => {
    const { error, output } = await model.run("Hello");

    assert(error === null);
    assert(Array.isArray(output));
  });

  //
});
describe.skip("fill-mask", async () => {
  const model = client.model("almanach/camembert-base");

  it("passes", async () => {
    const { error, output } = await model.run("Hello <mask>");

    assert(error === null);
    assert(Array.isArray(output));
  });
});
describe.skip("text-classification", async () => {
  const model = client.model(
    "AdamCodd/distilbert-base-uncased-finetuned-sentiment-amazon"
  );

  it("passes", async () => {
    const { error, output } = await model.run("Me likely long time");

    assert(error === null);
    assert(output.every(entry => entry.label && entry.score));
  });
});
describe.skip("token-classification", async () => {
  const model = client.model("2rtl3/mn-xlm-roberta-base-named-entity");

  it("passes", async () => {
    const { error, output } = await model.run("John went to NYC");

    assert(error === null);
    assert(Array.isArray(output));
  });
});
describe.skip("zero-shot-classification", async () => {
  const model = client.model("AyoubChLin/DistilBERT_eco_ZeroShot");

  it("passes", async () => {
    const { error, output } = await model.run({
      text: "Ninja turtles are cool",
      candidate_labels: ["positive,", "negative"]
    });

    assert(error === null);
    assert(output.sequence && output.labels && output.scores);
  });
});
// check audio model work?
describe.skip("audio-classification", async () => {
  const model = client.model("aaraki/wav2vec2-base-finetuned-ks");
  const url =
    "https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav";
  const dataUrl = await getDataUrl(url);

  it("url", async () => {
    const { error, output } = await model.run(url);

    assert(error === null);
    assert(Array.isArray(output));
  });

  it("data url", async () => {
    const { error, output } = await model.run(dataUrl);

    assert(error === null);
    assert(Array.isArray(output));
  });
});
describe.skip("text-to-speech", async () => {
  const model = client.model("facebook/mms-tts-eng");

  it("passes", async () => {
    const { error, output } = await model.run("Hello");

    assert(error === null);
    assert(output);
  });

  it("streams back pure media", async () => {
    const readStream = await model.run("Hello", true);

    for await (const chunk of readStream) {
      assert(typeof chunk.toString(), "streams output");
    }
  });
});
describe.skip("automatic-speech-recognition", async () => {
  const model = client.model("facebook/data2vec-audio-base-960h");
  const url =
    "https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/automatic-speech-recognition/input.flac";
  const dataUrl = await getDataUrl(url);

  it("url", async () => {
    const { error, output } = await model.run(url);

    assert(error === null);
    assert(typeof output === "string" && output.length !== 0);
  });

  it("data url", async () => {
    const { error, output } = await model.run(dataUrl);

    assert(error === null);
    assert(typeof output === "string" && output.length !== 0);
  });
});
describe.skip("text-to-audio", async () => {
  const model = client.model("facebook/musicgen-melody");

  it("passes", async () => {
    const { error, output } = await model.run("happy rock");

    assert(error === null);
    assert(typeof output === "string");
  });

  it("streams back pure media", async () => {
    const readStream = await model.run("happy rock", true);

    for await (const chunk of readStream) {
      assert(chunk.toString(), "streams output");
    }
  });
});
