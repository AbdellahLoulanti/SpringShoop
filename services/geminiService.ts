
import { GoogleGenAI, Type } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

// IMPORTANT: The API key must be available as an environment variable.
// Do not hardcode the API key in the code.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully,
  // like disabling the AI feature and showing a message to the user.
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const recommendationSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.STRING,
      description: 'A search query for a similar or complementary product.',
    }
};

export const geminiService = {
  /**
   * Generates product search recommendations based on a product title.
   * @param productTitle The title of the product to get recommendations for.
   * @returns A promise that resolves to an array of recommendation strings.
   */
  getProductRecommendations: async (productTitle: string): Promise<string[]> => {
    if (!API_KEY) {
      // Return mock data if API key is not set
      console.warn("Gemini API key not available, returning mock recommendations.");
      return [
        "Bohemian Style Sandals",
        "Wide Brim Sun Hat",
        "Lightweight Summer Cardigan",
        "Beaded Ankle Bracelet",
      ];
    }
    
    try {
      const prompt = `Given the product title '${productTitle}', generate a JSON array of 4 unique and creative search queries for similar or complementary products on an e-commerce site like AliExpress. The output must be a valid JSON array of strings.`;
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: recommendationSchema,
        },
      });

      const jsonText = response.text.trim();
      const recommendations = JSON.parse(jsonText);

      if (Array.isArray(recommendations) && recommendations.every(item => typeof item === 'string')) {
        return recommendations;
      } else {
        throw new Error("Invalid format for recommendations received from Gemini API.");
      }

    } catch (error) {
      console.error("Error fetching recommendations from Gemini API:", error);
      // Fallback to mock data on error
      return [
        "Bohemian Style Sandals",
        "Wide Brim Sun Hat",
        "Lightweight Summer Cardigan",
        "Beaded Ankle Bracelet",
      ];
    }
  },
};
