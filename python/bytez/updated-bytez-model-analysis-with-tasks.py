import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from bytez import Bytez
from typing import List, Dict, Literal
from pydantic import BaseModel, Field
import json
import os

# Predefined list of tasks
Task = Literal[
    "audio-classification", "automatic-speech-recognition", "depth-estimation",
    "document-question-answering", "feature-extraction", "fill-mask",
    "image-classification", "image-feature-extraction", "image-segmentation",
    "image-to-text", "mask-generation", "object-detection", "question-answering",
    "sentence-similarity", "summarization", "text-classification", "text-generation",
    "text-to-audio", "text-to-image", "text-to-speech", "text-to-video",
    "text2text-generation", "token-classification", "translation",
    "unconditional-image-generation", "video-classification",
    "visual-question-answering", "zero-shot-classification",
    "zero-shot-image-classification", "zero-shot-object-detection"
]

# Enhanced metadata structure
class ModelMetadata(BaseModel):
    release_date: str = ""
    tasks: List[Task] = Field(default_factory=list)
    size: str = "Unknown"
    ramRequired: int = 0

# Task Input/Output Schema
class TaskInput(BaseModel):
    text: str
    max_tokens: int = Field(default=100, ge=1, le=1000)
    temperature: float = Field(default=0.7, ge=0, le=1)

class TaskOutput(BaseModel):
    generated_text: str
    token_count: int
    model_used: str

class ModelEvaluationSuite:
    def __init__(self, df: pd.DataFrame, model_metadata: Dict[str, ModelMetadata]):
        self.df = df
        self.model_metadata = model_metadata
        self.preprocess_data()

    def preprocess_data(self):
        # Extract publisher from modelId
        self.df['publisher'] = self.df['modelId'].apply(lambda x: x.split('/')[0])
        
        # Convert ramRequired to GB for better readability
        self.df['ramRequiredGB'] = self.df['ramRequired'] / 1024
        
        # Add tasks and size information from model metadata
        self.df['tasks'] = self.df['modelId'].map(lambda x: self.model_metadata.get(x, ModelMetadata()).tasks)
        self.df['size'] = self.df['modelId'].map(lambda x: self.model_metadata.get(x, ModelMetadata()).size)

    def basic_stats(self):
        print("Basic Statistics:")
        print(self.df.describe())
        print("\nUnique tasks:")
        task_counts = self.df['tasks'].explode().value_counts()
        print(task_counts)
        print("\nTop 10 publishers:")
        print(self.df['publisher'].value_counts().head(10))

    def ram_distribution(self):
        plt.figure(figsize=(12, 6))
        sns.histplot(data=self.df, x='ramRequiredGB', kde=True)
        plt.title('Distribution of RAM Requirements')
        plt.xlabel('RAM Required (GB)')
        plt.ylabel('Count')
        plt.show()

    def task_distribution(self):
        plt.figure(figsize=(12, 6))
        task_counts = self.df['tasks'].explode().value_counts()
        task_counts.plot(kind='bar')
        plt.title('Distribution of Tasks')
        plt.xlabel('Task')
        plt.ylabel('Count')
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()
        plt.show()

    def publisher_analysis(self):
        top_publishers = self.df['publisher'].value_counts().head(10).index
        publisher_df = self.df[self.df['publisher'].isin(top_publishers)]
        
        plt.figure(figsize=(12, 6))
        sns.boxplot(x='publisher', y='ramRequiredGB', data=publisher_df)
        plt.title('RAM Requirements by Top Publishers')
        plt.xlabel('Publisher')
        plt.ylabel('RAM Required (GB)')
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()
        plt.show()

    def task_ram_analysis(self):
        plt.figure(figsize=(12, 6))
        sns.boxplot(x='tasks', y='ramRequiredGB', data=self.df.explode('tasks'))
        plt.title('RAM Requirements by Task')
        plt.xlabel('Task')
        plt.ylabel('RAM Required (GB)')
        plt.xticks(rotation=90)
        plt.tight_layout()
        plt.show()

    def cluster_analysis(self):
        # Select features for clustering
        features = ['ramRequiredGB']
        X = self.df[features]
        
        # Standardize features
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        
        # Perform K-means clustering
        kmeans = KMeans(n_clusters=3, random_state=42)
        self.df['cluster'] = kmeans.fit_predict(X_scaled)
        
        # Visualize clusters
        plt.figure(figsize=(10, 6))
        sns.scatterplot(x='ramRequiredGB', y='cluster', hue='cluster', data=self.df)
        plt.title('Model Clusters based on RAM Requirements')
        plt.xlabel('RAM Required (GB)')
        plt.ylabel('Cluster')
        plt.show()

    def run_full_analysis(self):
        self.basic_stats()
        self.ram_distribution()
        self.task_distribution()
        self.publisher_analysis()
        self.task_ram_analysis()
        self.cluster_analysis()

def select_model(task_description: str, df: pd.DataFrame) -> str:
    task_models = df[df['tasks'].apply(lambda tasks: any(task in task_description.lower() for task in tasks))]
    if not task_models.empty:
        return task_models.iloc[0]['modelId']
    return df.iloc[0]['modelId']  # Default to first model if no match

def collaborative_input(user_input: str, gpt4_suggestion: str) -> TaskInput:
    print("User Input:", user_input)
    print("GPT-4o-mini Suggestion:", gpt4_suggestion)
    
    final_input = input("Please provide the final input based on the above suggestions: ")
    
    return TaskInput(text=final_input)

def load_or_create_model_metadata(model_list: List[Dict]) -> Dict[str, ModelMetadata]:
    metadata_file = 'bytez_model_metadata.json'
    if os.path.exists(metadata_file):
        with open(metadata_file, 'r') as f:
            return {k: ModelMetadata(**v) for k, v in json.load(f).items()}
    else:
        # Create a basic metadata structure if file doesn't exist
        metadata = {model['modelId']: ModelMetadata(ramRequired=model['ramRequired']) for model in model_list}
        with open(metadata_file, 'w') as f:
            json.dump({k: v.dict() for k, v in metadata.items()}, f, indent=2)
        return metadata

def update_model_metadata(model_metadata: Dict[str, ModelMetadata], df: pd.DataFrame) -> Dict[str, ModelMetadata]:
    for model_id, model_info in model_metadata.items():
        if not model_info.tasks:
            # If tasks are not set, try to infer from the model ID
            possible_tasks = [task for task in Task.__args__ if task.replace("-", "") in model_id.lower()]
            model_info.tasks = possible_tasks if possible_tasks else ["text-generation"]  # Default to text-generation if no match
    
    # Save updated metadata
    with open('bytez_model_metadata.json', 'w') as f:
        json.dump({k: v.dict() for k, v in model_metadata.items()}, f, indent=2)
    
    return model_metadata

# Main execution
if __name__ == "__main__":
    # Initialize Bytez client
    client = Bytez("8cc150a1f936fb01446e483f9d2c37aa")
    model_list = client.list_models()
    df = pd.DataFrame(model_list)

    # Load or create model metadata
    model_metadata = load_or_create_model_metadata(model_list)

    # Update model metadata with tasks
    model_metadata = update_model_metadata(model_metadata, df)

    # Initialize and run ModelEvaluationSuite
    evaluator = ModelEvaluationSuite(df, model_metadata)
    evaluator.run_full_analysis()

    # Example of collaborative input and model selection
    user_input = "Translate 'Hello, world!' to French"
    gpt4_suggestion = "For translation tasks, it's best to use a model fine-tuned on multilingual data. Consider using a lower temperature for more precise translations."

    task_input = collaborative_input(user_input, gpt4_suggestion)
    selected_model = select_model(task_input.text, df)

    print(f"Selected Model: {selected_model}")
    print(f"Task Input: {task_input.json()}")

    # Here you would use the Bytez client to run the selected model
    # model = client.model(selected_model)
    # result = model.run(task_input.text)
    # output = TaskOutput(generated_text=result, token_count=len(result.split()), model_used=selected_model)
    # print(f"Task Output: {output.json()}")

# Terminal Output
"""
Basic Statistics:
        ramRequired  ramRequiredGB
count  14460.000000   14460.000000
mean      11.916321       0.011637
std       27.407836       0.026765
min        1.000000       0.000977
25%        1.000000       0.000977
50%        2.000000       0.001953
75%       11.000000       0.010742
max      244.000000       0.238281

Unique tasks:
tasks
text-generation         14326
summarization              96
translation                26
object-detection            4
video-classification        2
depth-estimation            2
audio-classification        1
question-answering          1
image-classification        1
token-classification        1
Name: count, dtype: int64

Top 10 publishers:
publisher
Helsinki-NLP             495
facebook                 367
huggingtweets            203
AnonymousSub             132
microsoft                117
sentence-transformers    116
Yntec                    113
google                   111
MaziyarPanahi             85
SEBIS                     79
Name: count, dtype: int64
User Input: Translate 'Hello, world!' to French
GPT-4o-mini Suggestion: For translation tasks, it's best to use a model fine-tuned on multilingual data. Consider using a lower temperature for more precise translations.
Please provide the final input based on the above suggestions: send it
Selected Model: 0-hero/Matter-0.1-Slim-7B-C
Task Input: {"text":"send it","max_tokens":100,"temperature":0.7}
"""