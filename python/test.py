import unittest, os
from bytez import Bytez

client = Bytez(os.environ.get("BYTEZ_KEY"))

modelId = "openai-community/gpt2"
model = client.model(modelId)


class TestBytez(unittest.TestCase):
    def test_list_models(self):
        """Test listing models."""
        model_list = client.list_models()

        self.assertIsInstance(model_list, list, "should return array of models")
        self.assertNotEqual(len(model_list), 0, "array is not empty")
        self.assertTrue(
            all("modelId" in model and "ramRequired" in model for model in model_list),
            "all models should have name and RAM",
        )

    def test_lists_running_instances(self):
        """Test listing running instances."""
        instances = client.list_instances()
        self.assertIsInstance(instances, list, "should return array of instances")

    def test_creates_model_class(self):
        """Test creating a model class."""
        self.assertEqual(model.id, modelId, "loads the right model")
        self.assertEqual(model.options.get("concurrency"), 1, "default concurrency: 1")
        self.assertEqual(model.options.get("timeout"), 300, "default concurrency: 300")

    def test_starts(self):
        """Test starting a model and managing its status."""
        response = model.start()

        if response["status"] != "error":
            self.assertEqual(response["status"], "started", "model starts")
        else:
            alreadyStarted = (
                "already loaded" in response["error"]
                or "operation already in progress: load" in response["error"]
            )

            self.assertEqual(alreadyStarted, True, "model already started")

        status = model.status()

        self.assertIn(
            status["status"],
            ["DEPLOYING", "RUNNING"],
            "returns status deploying or running",
        )

    def test_load(self):
        """Test starting a model and managing its status."""
        # Load model and check status
        print("awaiting model to load")
        model.load()
        status = model.status()

        self.assertEqual(status["status"], "RUNNING", "model is now running")

    def test_runs_model(self):
        """Test running a model."""
        response = model.run("Jack and jill")
        print(response)
        self.assertIsInstance(
            response["output"][0]["generated_text"], str, "returns output"
        )

    def test_runs_model_with_params(self):
        """Test streaming output."""
        input_text = "Jack and Jill "
        response = model.run(
            input, model_params={"max_new_tokens": 1, "min_new_tokens": 1}
        )
        print(response)
        output = response["output"][0]["generated_text"]

        self.assertEqual(
            len(input.strip().split(" ")) + 1, len(output.split(" ")), "streams output"
        )

    def test_streams_back(self):
        """Test streaming output."""
        stream = model.run("Jack and jill", stream=True)
        testPass = False

        for chunk in stream:
            if not testPass:
                testPass = isinstance(chunk, str)
                self.assertTrue(testPass, "streams output")

    def test_stops_a_model(self):
        """Test stopping a model."""
        model.stop()
        response = model.status()

        self.assertNotEqual(response["status"], "RUNNING", "model is stopped")


if __name__ == "__main__":
    unittest.main()
