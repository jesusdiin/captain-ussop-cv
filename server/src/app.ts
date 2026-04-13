import express from "express";
import cors from "cors";
import { config } from "./config/index.js";
import exaggerateRouter from "./routes/exaggerate.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimit.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", apiLimiter);
app.use("/api", exaggerateRouter);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`🏴‍☠️ Captain Ussop CV server running on port ${config.port}`);
});
