import { Request, Response, NextFunction } from "express";
import { exaggerateDescription } from "../services/llm.service.js";
import type { ExaggerateRequest } from "../types/index.js";

export async function exaggerateController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { description } = req.body as ExaggerateRequest;

    if (!description || typeof description !== "string") {
      res.status(400).json({ error: "La descripción es requerida" });
      return;
    }

    if (description.trim().length === 0) {
      res.status(400).json({ error: "La descripción no puede estar vacía" });
      return;
    }

    if (description.length > 500) {
      res
        .status(400)
        .json({ error: "La descripción debe tener máximo 500 caracteres" });
      return;
    }

    const exaggerations = await exaggerateDescription(description.trim());
    res.json({ exaggerations });
  } catch (error) {
    next(error);
  }
}
