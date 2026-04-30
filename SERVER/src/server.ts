import "dotenv/config";
import express from "express";
import { connectDB } from "./db";
import cors from "cors";
import { errorHandler } from "./middleware/errorhandler";
import { notFound } from "./middleware/notFound";
import morgan from "morgan";
import { ok } from "./utils/envelope";
import { clerkMiddleware } from "@clerk/express";
import { authRouter } from "./routes/auth.routes";

async function mainEntryFunction() {
  await connectDB();

  const app = express();

  const cors_origins =
    process.env.CORS_ORIGINS ||
    "http://localhost:3000"
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean);

  app.use(
    cors({
      origin: cors_origins,
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(morgan("dev"));
  app.use(clerkMiddleware());

  app.get("/health", (_req, res) => {
    res.status(200).json(ok({ message: "server up and running" }));
  });

  app.use("/auth", authRouter);

  app.use(errorHandler);
  app.use(notFound);

  const port = Number(process.env.PORT || 5000);
  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
}

mainEntryFunction().catch((err) => {
  console.log("failed to Start", err);
  process.exit(1);
});
