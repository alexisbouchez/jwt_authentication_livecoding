import { config } from "dotenv";
import app from "./app";
import dataSource from "./utils/dataSource";

config();

const start = async (): Promise<void> => {
  await dataSource.initialize();

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}`);
  });
};
void start();
