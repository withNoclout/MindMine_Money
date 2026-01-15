"use client";

import { pipeline, env } from "@xenova/transformers";

// Configure Transformers.js to skip local check if running in browser context
// and allow loading models from standard CDN
env.allowLocalModels = false;
env.useBrowserCache = true;

// Singleton to hold the pipeline instance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let classifierPromise: Promise<any> | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let extractorPromise: Promise<any> | null = null;

// You can swap this for 'feature-extraction' if you want generate embeddings
// or 'zero-shot-classification' to categorize into specific buckets
const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2';
// For topic detection/summarization, we might use a small seq2seq or just zero-shot with a smaller model if size is concern
// 'Xenova/distilbart-cnn-6-6' is good for summarization but heavy (~300MB)
// 'Xenova/mobilebert-uncased-mnli' is good for zero-shot classification

// Let's implement a zero-shot classifier for "Topic Detection"
const CLASSIFIER_MODEL = 'Xenova/mobilebert-uncased-mnli';

export const getClassifier = async () => {
    if (!classifierPromise) {
        classifierPromise = pipeline('zero-shot-classification', CLASSIFIER_MODEL);
    }
    return classifierPromise;
};

// Define some standard educational topics to check against
export const STANDARD_TOPICS = [
    "Mathematics",
    "Economics",
    "Computer Science",
    "History",
    "Physics",
    "Chemistry",
    "Biology",
    "Literature",
    "Business",
    "Psychology"
];

export async function detectTopic(text: string, candidateLabels: string[] = STANDARD_TOPICS) {
    // Truncate text to avoid token limits (standard models often take 512 tokens)
    // We'll take the first ~1000 chars as a proxy for the document topic
    const truncatedText = text.slice(0, 1000);

    try {
        const classifier = await getClassifier();
        const output = await classifier(truncatedText, candidateLabels);

        // Output format: { sequence: string, labels: string[], scores: number[] }
        // Return top label
        return {
            topTopic: output.labels[0],
            confidence: output.scores[0],
            allScores: output.labels.map((label: string, i: number) => ({
                label,
                score: output.scores[i]
            }))
        };
    } catch (error) {
        console.error("AI Classification Error:", error);
        return null;
    }
}
