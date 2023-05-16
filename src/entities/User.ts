import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm"
import { Base } from "./Base"
import { UserSession } from "./UserSession"
import bcrypt from 'bcryptjs';

@Entity('users')
export class User extends Base{
    @PrimaryGeneratedColumn()
    id_user: number

    @Column()
    name: string

    @Column()
    surname: string

    @Column({unique: true})
    document: string

    @Column()
    phone_number: string

    @Column({nullable: true})
    whats: string

    @Column({unique: true})
    email: string

    @Column()
    birthdate: Date

    @Column({default: false})
    allow_multiple_sessions: boolean

    @Column({default: false})
    email_verified: boolean
    
    @Column({default: false})
    phone_number_verified: boolean

    @OneToMany(() => UserSession, (userSession) => userSession.user)
    user_sessions: UserSession[]

    @Column()
    roles_id_role: number;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 8)
    }

    //password
    @Column()
    password: string

    @Column({default: 0})
    login_attempts: number

    @Column({nullable: true, default: null})
    ban_expiration: Date

    @Column({default: false})
    banned: boolean
}
