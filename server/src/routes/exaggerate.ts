import { Router } from "express";
import { exaggerateController } from "../controllers/exaggerate.controller.js";

const router = Router();

router.post("/exaggerate", exaggerateController);

export default router;
