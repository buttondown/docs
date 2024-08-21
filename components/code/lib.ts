import type { Lang } from "shiki";

export type HandwrittenBlock = {
  name: string;
  code: string;
  language: Lang;
};

export type SingletonBlock = {
  code: string;
  language: Lang;
};

export type SingletonLanguageBlockList = [SingletonBlock];

export type IntermediateBlock = (HandwrittenBlock | SingletonBlock) & {
  html?: string;
};

export type ProcessedBlock = {
  name?: string;
  html: string;
  language: Lang;
};

export const shikiWithoutWrapper = (html: string) =>
  html.replace(/<pre.*?><code.*?>(.*?)<\/code><\/pre>/s, "$1");

export const API_KEY_PLACEHOLDER_SENTINEL = "BUTTONDOWN_API_KEY_PLACEHOLDER";

export const PYTHON_API_KEY_CODE = `
# You can find this key in your API requests page:
# https://buttondown.com/requests
BUTTONDOWN_API_KEY = "your-api-key-here"
`.trim();

export const PYTHON_API_KEY_CODE_REPLACEMENT = `
# NOTE: This is your actual API key. Make sure not to share
# it publicly or check it into production!
# You can find this key in your API requests page:
# https://buttondown.com/requests
BUTTONDOWN_API_KEY = "${API_KEY_PLACEHOLDER_SENTINEL}"
`.trim();
