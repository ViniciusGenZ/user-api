import { SessionType } from "@entities/SessionType"
import { User } from "@entities/User"
import { UserSession } from "@entities/UserSession"
import "reflect-metadata"
import { DataSource } from "typeorm"

export const appDataSource = new DataSource({
    type: 'mysql',
    host: "192.168.8.230",
    port: 3306,
    username: "admin",
    password: "demoadmin",
    database: "db_sandbox",
    synchronize: false,
    logging: true,
    entities: [UserSession, User, SessionType],
    migrations: [],
    subscribers: [],
})
