from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("almanach/camembert-base")

model.load()

input_text = "The capital of France is <mask>."

result = model.run(input_text)

sequence_objects = result.get("output")


for sequence_object in sequence_objects:
    # Depending on the model, there may be additional props returned
    print(sequence_object)

    sequence = sequence_object["sequence"]
    score = sequence_object["score"]
    token = sequence_object["token"]
    token_str = sequence_object["token_str"]

    print(
        {"sequence": sequence, "score": score, "token": token, "token_str": token_str}
    )
