
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const enhanceSummary = async (summary: string, lang: 'ar' | 'en') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Enhance this professional CV summary to be more impactful and professional in ${lang === 'ar' ? 'Arabic' : 'English'}: "${summary}"`,
      config: {
        systemInstruction: "You are a professional career coach and expert resume writer."
      }
    });
    return response.text || summary;
  } catch (error) {
    console.error("Gemini Error:", error);
    return summary;
  }
};

export const generateJobDescription = async (position: string, company: string, lang: 'ar' | 'en') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write 3 professional bullet points for the position of ${position} at ${company} in ${lang === 'ar' ? 'Arabic' : 'English'}.`,
      config: {
        systemInstruction: "You are an expert HR manager."
      }
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "";
  }
};
