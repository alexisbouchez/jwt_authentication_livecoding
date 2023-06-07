import { DataSource } from "typeorm";
import { User } from "../models/User";

const createTestDataSource = (drop: boolean = false) =>
  new DataSource({
    type: "sqlite",
    database: "./postgres-test",

    entities: [User],

    synchronize: drop,
    dropSchema: drop,
  });

export default createTestDataSource;
