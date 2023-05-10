import { DataSource } from "typeorm";
import { User } from "./models/User";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "postgres",

  synchronize: true,

  entities: [User],
});

export default dataSource;
