import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	BeforeInsert,
	BeforeUpdate,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { Base } from './Base';
import { UserSession } from './UserSession';
import bcrypt from 'bcryptjs';
import { Role } from './Role';
import { IUserCreateResponse } from '@interfaces/IUser';
import { IAuthenticationResponse } from '@interfaces/IAuthentication';

@Entity('users')
export class User extends Base {
	@PrimaryGeneratedColumn()
	id_user: number;

	@Column()
	name: string;

	@Column()
	surname: string;

	@Column({ unique: true })
	document: string;

	@Column()
	phone_number: string;

	@Column({ nullable: true })
	whats: string;

	@Column({ unique: true })
	email: string;

	@Column()
	birthdate: Date;

	@Column({ default: false })
	allow_multiple_sessions: boolean;

	@OneToMany(() => UserSession, (userSession) => userSession.user)
	user_sessions: UserSession[];

	@Column()
	roles_id_role: number;

	@Column()
	password: string;

	@Column({ default: false })
	email_verified: boolean;

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
	login_attempts: number;

	@Column({ nullable: true, default: null })
	ban_expiration: Date;

	@Column({ default: false })
	banned: boolean;

	@ManyToOne(() => Role, (r) => r.users)
	@JoinColumn({ name: 'roles_id_role', referencedColumnName: 'id_role' })
	role: Role;

	@BeforeInsert()
	@BeforeUpdate()
	async hashs() {
		if (this.password) this.password = await bcrypt.hash(this.password, 8);
		if (this.email_verification_code)
			this.email_verification_code = await bcrypt.hash(
				this.email_verification_code as string,
				6,
			);
		if (this.phone_number_verification_code)
			this.phone_number_verification_code = await bcrypt.hash(
				this.phone_number_verification_code as string,
				6,
			);
	}

	getUserReponse(): IUserCreateResponse {
		return {
			id_user: this.id_user,
			email: this.email,
			name: this.name,
			surname: this.surname,
			document: this.document,
			phone_number: this.phone_number,
			whats: this.whats,
			birthdate: this.birthdate,
			email_verified: this.email_verified,
			phone_number_verified: this.phone_number_verified,
			status_active: this.status_active,
			created_at: this.created_at,
		};
	}

	loginReponse(
		token: string,
		userSession: UserSession,
	): IAuthenticationResponse {
		return {
			token,
			session: userSession,
			user: this.getUserReponse(),
		};
	}
}
