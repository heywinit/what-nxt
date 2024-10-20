import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
import { Event, User } from "./entities";
import Constants from "../utils/constants";

let userRepo: Repository<User>;
let eventRepo: Repository<Event>;

export async function initializeDatabase() {
  const dataSource = new DataSource({
    host: Constants.DB_HOST,
    username: Constants.DB_USER,
    password: Constants.DB_PASS,
    schema: "public",
    type: "postgres",
    database: "postgres",
    port: 6543,
    driver: require("pg"),
    ssl: false,
    entities: [User, Event],
    synchronize: true, // Set to true when you want to sync DB fields and tables with codebase
  });
  await dataSource
    .initialize()
    .then(() => console.info("Database connected successfully"))
    .catch((err: Error) =>
      console.error("Error during database initialization", err)
    );

  userRepo = dataSource.getRepository(User);
  eventRepo = dataSource.getRepository(Event);
}

export { userRepo, eventRepo };
