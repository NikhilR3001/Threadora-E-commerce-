import 'dotenv/config'
import express from "express";
import { connectDB } from "./db";
import cors from "cors";
import morgan from "morgan";

async function mainEntryFunction() {
  await connectDB();

  const app = express();

  const corsOrigins = (process.env.CORS_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: corsOrigins,
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(morgan("dev"));

  const port = Number(process.env.PORT || 5000);

  app.listen(port, () => {
    console.log("server running with 5000");
  });
}

mainEntryFunction().catch((err) => {
  console.log("Failed to start", err);
  process.exit(1);
});
