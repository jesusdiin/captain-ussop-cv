export interface ExaggerationStyles {
  basico: string;
  corporativo: string;
  mamador: string;
  consultor_mckinsey: string;
}

export interface ExaggerateResponse {
  exaggerations: ExaggerationStyles;
}

export async function exaggerate(
  description: string
): Promise<ExaggerationStyles> {
  const res = await fetch("/api/exaggerate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error || "Error al exagerar tu descripción");
  }

  const data: ExaggerateResponse = await res.json();
  return data.exaggerations;
}
