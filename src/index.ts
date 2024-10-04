import express, { Request, Response } from "express";

const app = express();
const port = 4000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

console.log("Hello, TypeScript with Express!");

export default app;
