export interface ExaggerateResponse {
  exaggerated: string;
}

export async function exaggerate(description: string): Promise<string> {
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
  return data.exaggerated;
}
