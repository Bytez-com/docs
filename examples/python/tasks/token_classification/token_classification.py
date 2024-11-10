from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("dslim/bert-base-NER")

model.load()

input_text = "John Doe is a software engineer at Google."

result = model.run(input_text)

word_objects = result["output"]

for word_object in word_objects:
    # Depending on the model, there may be additional props returned
    print(word_object)

    word = word_object.get("word")
    entity = word_object.get("entity")
    score = word_object.get("score")
    index = word_object.get("index")
    start = word_object.get("start")
    end = word_object.get("end")

    print(
        {
            "word": word,
            "entity": entity,
            "score": score,
            "index": index,
            "start": start,
            "end": end,
        }
    )
