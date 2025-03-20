import unittest
import os
from bytez import Bytez

bytez = Bytez(os.environ.get("BYTEZ_KEY"), True)
modelId = "openai-community/gpt2"
model = bytez.model(modelId)

class TestTextGeneration(unittest.IsolatedAsyncioTestCase):
    """Tests for text generation models in a fixed order."""

    def test_01_creates_model_class(self):
        """Test that the correct model ID is loaded."""
        self.assertEqual(model.id, modelId, "loads the right model")

    def test_02_list_models(self):
        """Test listing models."""
        output, error = bytez.list.models()

        self.assertIsNone(error)
        self.assertIsInstance(output, list, "should return an array of models")
        self.assertNotEqual(len(output), 0, "array should not be empty")

    def test_03_lists_running_instances(self):
        """Test listing running instances."""
        output = bytez.list.clusters()

        self.assertIsInstance(output, list, "should return an array of instances")

    def test_04_crud_creates_cluster(self):
        """Test creating a cluster."""
        output, error = model.create()

        self.assertTrue(
            (error is None and output == "Loading")
            or (error == "Cluster already exists" and output is None)
        )

    def test_05_crud_reads_cluster(self):
        """Test reading a cluster."""
        output, error = model.read()

        self.assertIsNone(error)
        self.assertIsInstance(output, dict, "should return an object")

    def test_06_crud_updates_cluster(self):
        """Test updating a cluster."""
        output, error = model.update({"timeout": 1, "capacity": {"min": 1, "desired": 1, "max": 1}})

        self.assertIsNone(error)
        self.assertIsInstance(output, dict, "should return an object")

    def test_07_runs_a_model(self):
        """Test running a model."""
        output, error = model.run("Jack and jill")

        self.assertIsNone(error)
        self.assertIsInstance(output, str, "returns output")

    def test_08_runs_model_with_params(self):
        """Test running a model with parameters."""
        input_text = "Jack and Jill "
        output, error = model.run(input_text, {"min_new_tokens": 1, "max_new_tokens": 1})

        self.assertIsNone(error)
        self.assertIsInstance(output, str, "returns output")
        self.assertEqual(len(output.split(" ")), len(input_text.strip().split(" ")) + 1, "returns output")

    def test_09_streams_text(self):
        """Test streaming text."""
        stream = model.run("Jack and jill", stream=True)

        for chunk in stream:
            self.assertIsInstance(chunk.decode('utf-8'), str, "streams output")
            break

    def test_10_streams_text_with_params(self):
        """Test streaming text with parameters."""
        stream = model.run("Jack and jill", {"max_length": 100}, stream=True)

        for chunk in stream:
            self.assertIsInstance(chunk.decode('utf-8'), str, "streams output")
            break

    def test_11_stream_false_does_not_stream(self):
        """Test that `stream=False` does not return a stream."""
        output, error = model.run("Jack and jill", stream=False)

        self.assertIsNone(error)
        self.assertIsInstance(output, str, "returns output")

        output, error = model.run("Jack and jill", {"max_length": 100}, stream=False)

        self.assertIsNone(error)
        self.assertIsInstance(output, str, "returns output")

    def test_12_crud_deletes_cluster(self):
        """Test deleting a cluster."""
        output, error = model.delete()

        self.assertIsNone(error)
        self.assertIsNone(output)


if __name__ == "__main__":
    unittest.main()
