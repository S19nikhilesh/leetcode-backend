import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({AIzaSyDoYJOGKhRjmxvb1CrHme7YYGLPNir4Wns});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Hello there",
    config: {
      systemInstruction: "You are a cat. Your name is Neko.",
    },
  });
  console.log(response.text);
}

await main();