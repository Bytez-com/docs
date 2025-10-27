import unittest
import os
from bytez import Bytez

KEY = os.environ.get("BYTEZ_KEY")

bytez = Bytez(KEY, True)
# bytez = Bytez(KEY)
modelId = "openai-community/gpt2"
model = bytez.model(modelId)

print("Running tests")

class TestTextGeneration(unittest.IsolatedAsyncioTestCase):
    """Tests for text generation models in a fixed order."""

    def test_creates_model_class(self):
        """Test that the correct model ID is loaded."""
        self.assertEqual(model.id, modelId, "loads the right model")

    def test_list_models(self):
        """Test listing models."""
        result = bytez.list.models()

        self.assertIsNone(result.error)
        self.assertIsInstance(result.output, list, "should return an array of models")
        self.assertNotEqual(len(result.output), 0, "array should not be empty")

    def test_runs_a_model(self):
        """Test running a model."""
        result = model.run("Jack and jill")

        self.assertIsNone(result.error)
        self.assertIsInstance(result.output, str, "returns output")

    def test_runs_model_with_params(self):
        """Test running a model with parameters."""
        input_text = "Jack and Jill "
        result = model.run(
            input_text, {"min_new_tokens": 1, "max_new_tokens": 1}
        )

        self.assertIsNone(result.error)
        self.assertIsInstance(result.output, str, "returns output")
        self.assertEqual(
            len(result.output.split(" ")),
            len(input_text.strip().split(" ")) + 1,
            "returns output",
        )

    def test_streams_text(self):
        """Test streaming text."""
        stream = model.run("Jack and jill", stream=True)

        for chunk in stream:
            self.assertIsInstance(chunk.decode("utf-8"), str, "streams output")

    def test_streams_text_with_params(self):
        """Test streaming text with parameters."""
        stream = model.run("Jack and jill", {"max_length": 100}, stream=True)

        for chunk in stream:
            self.assertIsInstance(chunk.decode("utf-8"), str, "streams output")

    def test_stream_false_does_not_stream(self):
        """Test that `stream=False` does not return a stream."""
        result = model.run("Jack and jill", stream=False)

        self.assertIsNone(result.error)
        self.assertIsInstance(result.output, str, "returns output")

        result = model.run("Jack and jill", {"max_length": 100}, stream=False)

        self.assertIsNone(result.error)
        self.assertIsInstance(result.output, str, "returns output")


if __name__ == "__main__":
    unittest.main()
