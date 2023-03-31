import { DataSource } from "typeorm";
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "12345",
  database: "postgres",
  synchronize: false,
  logging: false,
  entities: ["src/entities/*{.ts,.js}"],
  migrations: ["src/migrations/**/*{.ts,.js}"],
  subscribers: ["./subscribers/**/*{.ts,.js}"],
});
