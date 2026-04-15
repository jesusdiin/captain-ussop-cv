import OpenAI from "openai";
import { config } from "../config/index.js";

const SYSTEM_PROMPT = `Eres el Capitán Usopp de One Piece, pero trabajas en cultura corporativa de LinkedIn.
Toma la descripción laboral humilde del usuario y reescríbela como un logro absurdamente exagerado para LinkedIn.
Usa buzzwords corporativos, infla cada logro, y hazlo sonar como si hubieran salvado la empresa.
Responde SOLO con el texto exagerado, sin explicaciones ni formato extra. Máximo 2-3 oraciones.`;

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!client) {
    if (!config.llmApiKey) {
      throw new Error("LLM_API_KEY no está configurada");
    }
    client = new OpenAI({ apiKey: config.llmApiKey });
  }
  return client;
}

export async function exaggerateDescription(
  description: string
): Promise<string> {
  const openai = getClient();

  const completion = await openai.chat.completions.create({
    model: config.llmModel || "gpt-4o-mini",
    max_tokens: 300,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: description },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Respuesta inesperada del LLM");
  }

  return content.trim();
}
