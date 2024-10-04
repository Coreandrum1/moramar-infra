import express from "express";
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import mongoose from "mongoose";
import os from "os";
import urlRouter from "./routes/urls";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const app = express();
const port = process.env.API_PORT ? Number(process.env.API_PORT) : 3000;
const host = process.env.HOST ?? "localhost"; // dynamic host

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use("/api/urls", urlRouter);

app.use((req, res) => {
  res.status(404).json({ message: "route not found" });
});

app.use(errorHandler);

console.log(process.env.MONGO_DB_CONNECTION_STRING);

mongoose
  .connect(`${process.env.MONGO_DB_CONNECTION_STRING}`)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });

export default app;
