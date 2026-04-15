import OpenAI from "openai";
import { config } from "../config/index.js";
import type { ExaggerationStyles } from "../types/index.js";

const SYSTEM_PROMPT = `Eres un generador de exageraciones de LinkedIn inspirado en el Capitán Usopp de One Piece.
Toma la descripción humilde del usuario y genera CUATRO versiones con distinto nivel de exageración.

Responde SIEMPRE con un JSON válido con estas claves exactas:
- "basico": versión levemente inflada, creíble (nivel 2/10). 1 oración.
- "corporativo": estilo LinkedIn típico, con buzzwords moderados (nivel 5/10). 1-2 oraciones.
- "mamador": absurdamente exagerado, hace sonar como si hubieras salvado la empresa (nivel 8/10). 2-3 oraciones.
- "consultor_mckinsey": insoportablemente pomposo, estilo consultor que vende humo, con métricas inventadas y framework names ridículos (nivel 10/10). 2-3 oraciones.

NO incluyas explicaciones ni texto fuera del JSON. SOLO el JSON.`;

const STYLE_KEYS = [
  "basico",
  "corporativo",
  "mamador",
  "consultor_mckinsey",
] as const;

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
): Promise<ExaggerationStyles> {
  const openai = getClient();

  const completion = await openai.chat.completions.create({
    model: config.llmModel || "gpt-4o-mini",
    max_tokens: 800,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: description },
    ],
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) {
    throw new Error("Respuesta inesperada del LLM");
  }

  const parsed = JSON.parse(raw) as Partial<ExaggerationStyles>;

  for (const key of STYLE_KEYS) {
    if (typeof parsed[key] !== "string" || !parsed[key]?.trim()) {
      throw new Error(`El LLM no devolvió el estilo "${key}"`);
    }
  }

  return parsed as ExaggerationStyles;
}
