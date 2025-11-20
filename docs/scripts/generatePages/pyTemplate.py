from bytez import Bytez

# insert your key
sdk = Bytez("BYTEZ_KEY")

# choose your model
model = sdk.model("$MODEL_ID")

# provide the model with input
input = "$INPUT"
# $PARAMS_SECTION

# provide the model with params
params = "$PARAMS_PAYLOAD"
# $NON_STREAMING_SECTION

# send to the model
result = model.run(input, params)

# observe the output
print({"error": result.error, "output": result.output})

# $STREAMING_SECTION

# set streaming to "true"
stream = True

# send to the model
readStream = model.run(input, params, stream)

text = ""

for tokens in readStream:
    text += tokens

    print(tokens)

# observe the output
print({"text": text})
