import { SessionType } from "@entities/SessionType"
import { User } from "@entities/User"
import { UserSession } from "@entities/UserSession"
import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"

dotenv.config()

export const appDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_URL,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    synchronize: false,
    logging: true,
    entities: [UserSession, User, SessionType],
    migrations: [],
    subscribers: [],
})
