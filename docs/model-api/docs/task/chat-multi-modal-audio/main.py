from bytez import Bytez

# insert your key
sdk = Bytez("BYTEZ_KEY")
# choose your chat model
model = sdk.model("Qwen/Qwen2-Audio-7B-Instruct")
# init the model
model.create()
# provide the model your chat session
messages = [
    {
        "role": "user",
        "content": [
            {"type": "text", "text": "Describe this audio"},
            {
                "type": "audio",
                "url": "https://dn720307.ca.archive.org/0/items/various-bird-sounds/Various%20Bird%20Sounds.mp3",
            },
        ],
    }
]
stream = True
# send to model
readStream = model.run(messages, stream)

text = ""

for chunk in readStream:
    tokens = chunk.decode("utf-8")
    text += tokens
    print(tokens)

print({"text": text})
