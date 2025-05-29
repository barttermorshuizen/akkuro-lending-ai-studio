export function parseStreamingJson(buffer: string): {
  text?: string;
  choices?: string[];
} {
  const result: { text?: string; choices?: string[] } = {};

  // Match text value
  const textMatch = buffer.match(/"text"\s*:\s*"([^"]*)/);
  if (textMatch) {
    result.text = textMatch[1];
  }

  // Match choices only if array is closed properly
  const choicesFullMatch = buffer.match(/"choices"\s*:\s*\[([^\]]*)\]/);
  if (choicesFullMatch) {
    result.choices = choicesFullMatch[1]
      .split(",")
      .map((s) => s.trim().replace(/^"|"$/g, ""))
      .filter(Boolean);
  }

  if (!buffer.includes("{")) {
    result.text = buffer;
  }
  return result;
}

export function formatPlainTextForMarkdown(input: string): string {
  return input
    .replace(/\\n/g, "\n") // replace \\n with newline
    .replace(/\r\n/g, "\n") // normalize Windows line endings
    .replace(/\n{3,}/g, "\n\n") // if there are more than 2 newlines, replace with 2 newlines
    .trim(); // remove leading and trailing whitespace
}
