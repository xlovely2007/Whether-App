
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeWeatherData = async (
  csvContent: string,
  userPrompt: string
): Promise<string> => {
  const model = 'gemini-2.5-pro';

  const fullPrompt = `
    You are a world-class data analyst specializing in meteorological data. 
    Your task is to analyze the following weather dataset provided in CSV format and answer the user's specific query.

    Your response should be:
    1.  Clear, concise, and directly address the user's question.
    2.  Provide key insights, trends, or calculations based on the data.
    3.  If the query is broad, provide a general summary of the data, highlighting key statistics like average temperature, total precipitation, and any notable weather events or patterns.
    4.  Format your response using Markdown for readability. Use headings, bold text, and lists where appropriate.

    ---
    **CSV DATASET:**
    ---
    ${csvContent}
    ---
    **USER'S QUERY:**
    ---
    "${userPrompt}"
    ---

    Begin your analysis now.
  `;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: fullPrompt,
    });
    
    if (response && response.text) {
        return response.text;
    } else {
        throw new Error("Received an empty response from the API.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};
