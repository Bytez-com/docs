export default interface Inference {
  /** Send back pure media or JSON. Default: `true` */
  json?: boolean;
  /** Stream results back. Default: `false` */
  stream?: boolean;

  /** Maximum length of generated tokens, defaults to 20. Overrides `max_new_tokens`. */
  max_length?: number;

  /** Maximum number of tokens to generate, ignoring prompt tokens. */
  max_new_tokens?: number;

  /** Minimum sequence length, defaults to 0. Overrides `min_new_tokens`. */
  min_length?: number;

  /** Minimum number of tokens to generate, ignoring prompt tokens. */
  min_new_tokens?: number;

  /** Controls stopping condition for beam search. `true` stops at `num_beams` complete candidates; `never` continues indefinitely. */
  early_stopping?: boolean | "never";

  /** Maximum computation time in seconds. Generation completes current pass after time expires. */
  max_time?: number;

  /** Whether to use sampling instead of greedy decoding, defaults to false. */
  do_sample?: boolean;

  /** Number of beams for beam search, defaults to 1. */
  num_beams?: number;

  /** Number of groups to divide beams into for diversity, defaults to 1. */
  num_beam_groups?: number;

  /** Balances model confidence and degeneration penalty in contrastive search decoding. */
  penalty_alpha?: number;

  /** Whether to use past attentions to speed up decoding, defaults to true. */
  use_cache?: boolean;

  /** Modulates next token probabilities, defaults to 1.0. */
  temperature?: number;

  /** Keeps highest probability vocabulary tokens for top-k filtering, defaults to 50. */
  top_k?: number;

  /** Keeps smallest set of tokens summing to at least `top_p`, defaults to 1.0. */
  top_p?: number;

  /** Local typicality, keeps smallest set of most typical tokens summing to `typical_p`, defaults to 1.0. */
  typical_p?: number;

  /** Only samples tokens with conditional probability above `epsilon_cutoff`. */
  epsilon_cutoff?: number;

  /** Hybrid sampling method using `eta_cutoff` and expected token probability. */
  eta_cutoff?: number;

  /** Subtracts from a beam's score if it generates a token same as any other beam's token at that time. */
  diversity_penalty?: number;

  /** Penalty for repeated tokens, 1.0 means no penalty. */
  repetition_penalty?: number;

  /** Penalty for sequences not in input, 1.0 means no penalty. */
  encoder_repetition_penalty?: number;

  /** Length penalty applied to beam scores, promotes longer or shorter sequences based on value. */
  length_penalty?: number;

  /** Restricts all ngrams of specified size to occur only once. */
  no_repeat_ngram_size?: number;

  /** Token ids not allowed in generation. */
  bad_words_ids?: number[][];

  /** Token ids that must be included in generation. */
  force_words_ids?: number[][] | number[][][];

  /** Whether to renormalize logits after all processors, highly recommended. */
  renormalize_logits?: boolean;

  /** Custom constraints for token usage in generation. */
  constraints?: Object[];

  /** Forces specified token as first generated token. */
  forced_bos_token_id?: number;

  /** Forces specified token as last when `max_length` reached. */
  forced_eos_token_id?: number | number[];

  /** Removes invalid model outputs, can slow generation. */
  remove_invalid_values?: boolean;

  /** Applies exponentially increasing length penalty after certain token count. */
  exponential_decay_length_penalty?: number[];

  /** Suppresses tokens by setting their log probs to `-inf`. */
  suppress_tokens?: number[];

  /** Suppresses tokens at the beginning of generation. */
  begin_suppress_tokens?: number[];

  /** Forces specified tokens at certain generation indices. */
  forced_decoder_ids?: number[][];

  /** Number of sequences returned for each batch element, defaults to 1. */
  num_return_sequences?: number;

  /** Whether to return attention tensors of all layers. */
  output_attentions?: boolean;

  /** Whether to return hidden states of all layers. */
  output_hidden_states?: boolean;

  /** Whether to return prediction scores. */
  output_scores?: boolean;

  /** Whether to return a structured `ModelOutput` instead of a tuple. */
  return_dict_in_generate?: boolean;

  /** Id of the padding token. */
  pad_token_id?: number;

  /** Id of the beginning-of-sequence token. */
  bos_token_id?: number;

  /** Id of the end-of-sequence token, can be a list for multiple tokens. */
  eos_token_id?: number | number[];

  /** Restricts all encoder ngrams of specified size from repeating in decoder. */
  encoder_no_repeat_ngram_size?: number;

  /** Token id to start decoding in encoder-decoder models. */
  decoder_start_token_id?: number;

  /** Additional kwargs forwarded to the model's `generate` function or used in forward pass. */
  generation_kwargs?: Object;
}
