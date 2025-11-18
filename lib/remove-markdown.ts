export function removeMarkdown(text: string) {
  return (
    text
      // Remove Mermaid diagrams
      .replace(/```mermaid[\s\S]*?```/g, "")
      // Extract text from custom components (noticeInfo, noticeWarn, etc.)
      .replace(/{%\s*\w+\s+text="([^"]*)"\s*\/%}/g, "$1")
      // Remove images
      .replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, "")
      // Remove inline links
      .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, "$1")
      // Remove blockquotes
      .replace(/^\s{0,3}>\s?/g, "")
      // Remove headers
      .replace(/^\#{1,6}\s*([^#]*)\s*(\#{1,6})?/gm, "$1")
      // Remove emphasis (bold, italic, strikethrough)
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/__(.*?)__/g, "$1")
      .replace(/_(.*?)_/g, "$1")
      .replace(/~~(.*?)~~/g, "$1")
      // Remove horizontal rules
      .replace(/^\s*[-\*]{3,}\s*$/gm, "")
      // Remove bulleted lists
      .replace(/^\s*[\*\+\-]\s+/g, "")
      // Remove Markdown tables, as well as their headers (and then add newlines between rows.)
      .replace(/(\|.*\|)\n?\s*\|?(?:\s*-+\s*\|)+\n?(\|.*\|)/g, "$2\n")
      // Remove dividers from headers
      .replace(/\| /g, "\n\n")
      // Remove any lingering dividers
      .replace(/\|/g, "")
      // Remove trailing whitespace from every line.
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
      .trim()
  );
}
