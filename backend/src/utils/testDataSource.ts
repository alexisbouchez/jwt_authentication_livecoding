import { DataSource } from "typeorm";
import { User } from "../models/User";

const testDataSource = new DataSource({
  type: "sqlite",
  database: "./sqlite.test",

  synchronize: true,
  dropSchema: true,

  entities: [User],
});

export default testDataSource;
