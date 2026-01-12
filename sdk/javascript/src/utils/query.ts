import { ListModels } from "../interface/List";

/**
 * Build the path for `list/models` with proper query-string encoding.
 * 
 * Isolated into a pure function for:
 * - Unit testability without mocking HTTP
 * - Clear separation of concerns (URL construction vs. network)
 * - Easy reasoning about edge cases
 */
export function buildListModelsPath(options?: ListModels): string {
  const base = "list/models";

  if (!options) return base;

  const params: Record<string, string> = {};

  if (options.task) params.task = String(options.task);
  if (options.modelId) params.modelId = String(options.modelId);

  const entries = Object.entries(params);

  if (entries.length === 0) return base;

  const search = new URLSearchParams(entries).toString();

  return `${base}?${search}`;
}
