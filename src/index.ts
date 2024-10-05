import express from "express";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import urlRouter from "../src/routes/urlRouter";
import driveRouter from "../src/routes/driveRouter";
import { errorHandler } from "../src/middlewares/errorHandler";
import { google } from "googleapis";
import { base64ToJson } from "./helpers/dataConverter";
dotenv.config({ path: ".env" });

const credentials = base64ToJson(process.env.GOOGLE_API_KEY);
const scopes = process.env.GOOGLE_API_SCOPES?.split(",") ?? [];

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes,
});

export const drive = google.drive({ version: "v3", auth });

const app = express();
const port = process.env.API_PORT ? Number(process.env.API_PORT) : 3000;
const host = process.env.HOST ?? "localhost"; // dynamic host

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use("/api/urls", urlRouter);
app.use("/api/drive", driveRouter);

app.use((req, res) => {
  res.status(404).json({ message: "route not found" });
});

app.use(errorHandler);

mongoose
  .connect(`${process.env.MONGO_DB_CONNECTION_STRING}`)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`[ ready ] ${host}:${port}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });

export default app;
