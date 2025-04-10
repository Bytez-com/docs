from typing import TypedDict, Optional
from typing import Literal

class InferenceOptions(TypedDict, total=False):
    max_length: int
    max_new_tokens: int
    min_length: int
    min_new_tokens: int
    early_stopping: Optional[bool]
    max_time: int
    do_sample: bool
    num_beams: int
    num_beam_groups: int
    penalty_alpha: float
    use_cache: bool
    temperature: float
    top_k: int
    top_p: float
    typical_p: float
    epsilon_cutoff: float
    eta_cutoff: float
    diversity_penalty: float
    repetition_penalty: float
    encoder_repetition_penalty: float
    length_penalty: float
    no_repeat_ngram_size: int
    bad_words_ids: list
    force_words_ids: list
    renormalize_logits: bool
    constraints: list
    forced_bos_token_id: int
    forced_eos_token_id: Optional[int]
    remove_invalid_values: bool
    exponential_decay_length_penalty: list
    suppress_tokens: list
    begin_suppress_tokens: list
    forced_decoder_ids: list
    num_return_sequences: int
    output_attentions: bool
    output_hidden_states: bool
    output_scores: bool
    return_dict_in_generate: bool
    pad_token_id: int
    bos_token_id: int
    eos_token_id: Optional[int]
    encoder_no_repeat_ngram_size: int
    decoder_start_token_id: int
    generation_kwargs: dict
    
    
Task = Literal[
    "audio-classification",
    "automatic-speech-recognition",
    "depth-estimation",
    "document-question-answering",
    "feature-extraction",
    "fill-mask",
    "image-classification",
    "image-feature-extraction",
    "image-segmentation",
    "image-to-text",
    "mask-generation",
    "object-detection",
    "question-answering",
    "sentence-similarity",
    "summarization",
    "text-classification",
    "text-generation",
    "text-to-audio",
    "text-to-image",
    "text-to-speech",
    "text-to-video",
    "text2text-generation",
    "token-classification",
    "translation",
    "unconditional-image-generation",
    "video-classification",
    "visual-question-answering",
    "zero-shot-classification",
    "zero-shot-image-classification",
    "zero-shot-object-detection"
]