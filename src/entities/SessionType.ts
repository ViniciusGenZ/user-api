import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from "typeorm"
import { UserSession } from "./UserSession"

@Entity("session_types")
export class SessionType extends BaseEntity{
    @PrimaryGeneratedColumn()
    id_session_type: number

    @Column()
    name_py: string

    @Column()
    name_en: string

    @Column()
    name_br: string

    @Column()
    status_active: boolean

    @OneToMany(() => UserSession, (userSession) => userSession.session_type)
    sessions: UserSession[]
}
