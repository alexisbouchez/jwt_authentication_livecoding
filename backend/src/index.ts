import dataSource from "./dataSource";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { authRouter } from "./routers/authRouter";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);

config();

const start = async (): Promise<void> => {
  await dataSource.initialize();

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}`);
  });
};
void start();
