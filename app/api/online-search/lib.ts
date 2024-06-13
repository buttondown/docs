import type { Index, IndexEntry } from "@/scripts/compile_vectors";
import OpenAI from "openai";
import vectors from "../../../autogen/vectors.json";

export type Result = Omit<IndexEntry, "embedding">;

// Arbitrary cutoff for how similar two vectors have to be to show up in search results.
// Without this cutoff, all searches would have results (_something_ is always most similar).
const VECTOR_SIMILARITY_CUTOFF = 0.5;

export async function searchWithEmbeddings(query: string): Promise<Result[]> {
  const openai = new OpenAI({
    // This looks scary, but we are _only doing this for tests_. Really, the problematic
    // part is not the fact that we're invoking this function but that we're doing so just
    // to make the test runner happy.
    dangerouslyAllowBrowser: true,
  });

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    dimensions: 256,
    input: query,
  });

  const embedding = response.data[0].embedding;

  const results = (vectors as Index)
    .map((entry) => ({
      ...entry,
      similarity: cosineSimilarity(entry.embedding, embedding),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .filter((entry) => entry.similarity > VECTOR_SIMILARITY_CUTOFF)
    .map((entry) => ({
      similarity: entry.similarity,
      slug: entry.slug,
      text: entry.text,
      display: {
        title: entry.display.title,
        subtitle: entry.display.subtitle,
        description: entry.display.description,
      },
    }));

  const uniqueResults = [];
  const seenSlugs = new Set();

  for (const result of results) {
    if (seenSlugs.has(result.slug)) {
      continue;
    }

    seenSlugs.add(result.slug);
    uniqueResults.push(result);
  }

  return uniqueResults;
}

const cosineSimilarity = (vecA: number[], vecB: number[]) => {
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i]; // Sum of product of each component
    normA += vecA[i] * vecA[i]; // Sum of the square of the components of vecA
    normB += vecB[i] * vecB[i]; // Sum of the square of the components of vecB
  }

  normA = Math.sqrt(normA); // Square root of sum of squares of vecA
  normB = Math.sqrt(normB); // Square root of sum of squares of vecB

  return dotProduct / (normA * normB); // Cosine similarity
};
