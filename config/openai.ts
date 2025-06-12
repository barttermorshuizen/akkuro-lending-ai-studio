export const OPENAI_CONFIG = {
  models: {
    chat: "gpt-4o", // Main chat model
    tts: "tts-1-hd", // Text-to-speech model
  },
  settings: {
    temperature: 0, // Response integrity
  },
  features: {
    streaming: true, // Enable response streaming
    function_calling: true, // Enable tool usage
    web_search: true, // Enable web search tool
  },
};
