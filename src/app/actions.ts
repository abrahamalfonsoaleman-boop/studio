"use server";

import { summarizeArticle } from "@/ai/flows/summarize-article";

export async function getSummary(articleContent: string) {
  try {
    const output = await summarizeArticle({ articleContent });
    return { summary: output.summary };
  } catch (error) {
    console.error("Error summarizing article:", error);
    return { error: "Failed to summarize article." };
  }
}
