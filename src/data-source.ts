import { SessionType } from "@entities/SessionType"
import { User } from "@entities/User"
import { UserSession } from "@entities/UserSession"
import "reflect-metadata"
import { DataSource } from "typeorm"

export const appDataSource = new DataSource({
    type: 'mysql',
    host: "192.168.8.73",
    port: 3307,
    username: "root",
    password: "admin",
    database: "db_sandbox",
    synchronize: false,
    logging: true,
    entities: [UserSession, User, SessionType],
    migrations: [],
    subscribers: [],
})
