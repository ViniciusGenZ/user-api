import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm"
import { Base } from "./Base"
import { UserSession } from "./UserSession"
import bcrypt from 'bcryptjs';

@Entity('users')
export class User extends Base {
    @PrimaryGeneratedColumn()
    id_user: number

    @Column()
    name: string

    @Column()
    surname: string

    @Column({ unique: true })
    document: string

    @Column()
    phone_number: string

    @Column({ nullable: true })
    whats: string

    @Column({ unique: true })
    email: string

    @Column()
    birthdate: Date

    @Column({ default: false })
    allow_multiple_sessions: boolean

    @OneToMany(() => UserSession, (userSession) => userSession.user)
    user_sessions: UserSession[]

    @Column()
    roles_id_role: number;

    @Column()
    password: string

    @Column({ default: false })
    email_verified: boolean

    @Column({ nullable: true })
    email_verification_code: string;

    @Column({ nullable: true })
    email_verification_code_expiration: Date;

    @Column({ default: false })
    phone_number_verified: boolean;

    @Column({ nullable: true })
    phone_number_verification_code: string;

    @Column({ nullable: true })
    phone_number_verification_code_expiration: Date;

    @Column({ default: 0 })
    login_attempts: number

    @Column({ nullable: true, default: null })
    ban_expiration: Date

    @Column({ default: false })
    banned: boolean

    @BeforeInsert()
    @BeforeUpdate()
    async hashs() {
        if (this.password) this.password = await bcrypt.hash(this.password, 8)
        if (this.email_verification_code) this.email_verification_code = await bcrypt.hash(this.email_verification_code as string, 6);
        if (this.phone_number_verification_code) this.phone_number_verification_code = await bcrypt.hash(this.phone_number_verification_code as string, 6);
    }
}
