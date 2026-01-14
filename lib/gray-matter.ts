interface GrayMatterResult {
  data: Record<string, unknown>;
  content: string;
}

export default function matter(input: string): GrayMatterResult {
  const trimmed = input.trim();

  if (!trimmed.startsWith("---")) {
    return { data: {}, content: input };
  }

  const endIndex = trimmed.indexOf("---", 3);
  if (endIndex === -1) {
    return { data: {}, content: input };
  }

  const frontmatter = trimmed.slice(3, endIndex).trim();
  const content = trimmed.slice(endIndex + 3).trim();

  const data: Record<string, unknown> = {};

  const lines = frontmatter.split("\n");
  let currentKey = "";
  let arrayValue: unknown[] = [];
  let inArray = false;

  for (const line of lines) {
    if (!line.trim()) continue;

    const arrayMatch = line.match(/^(\s*)- (.*)$/);
    if (arrayMatch && inArray) {
      arrayValue.push(parseValue(arrayMatch[2]));
      continue;
    }

    if (inArray && currentKey) {
      data[currentKey] = arrayValue;
      inArray = false;
      arrayValue = [];
    }

    const match = line.match(/^(\s*)([^:]+):\s*(.*)$/);
    if (match) {
      const indent = match[1].length;
      const key = match[2].trim();
      const value = match[3].trim();

      if (indent === 0) {
        currentKey = key;

        if (value === "") {
          inArray = true;
          arrayValue = [];
        } else {
          data[key] = parseValue(value);
        }
      }
    }
  }

  if (inArray && currentKey) {
    data[currentKey] = arrayValue;
  }

  return { data, content };
}

function parseValue(value: string): unknown {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null" || value === "~") return null;

  if (/^-?\d+$/.test(value)) {
    return parseInt(value, 10);
  }

  if (/^-?\d+\.\d+$/.test(value)) {
    return parseFloat(value);
  }

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}
