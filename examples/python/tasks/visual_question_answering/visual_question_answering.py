from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("Salesforce/blip-vqa-base")

model.load()

input_data = {
    "image": "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9",
    "question": "What kind of animal is this?",
}

result = model.run(input_data)

outputs = result["output"]

answer = outputs[0]["answer"]

print(answer)
