import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	BeforeInsert,
	BeforeUpdate,
} from 'typeorm';
import { UserSession } from './UserSession';
import { Base } from './Base';

@Entity('session_types')
export class SessionType extends Base {
	@PrimaryGeneratedColumn()
	id_session_type: number;

	@Column()
	name_py: string;

	@Column()
	name_en: string;

	@Column()
	name_br: string;

	@Column()
	status_active: boolean;

	@OneToMany(() => UserSession, (userSession) => userSession.session_type)
	sessions: UserSession[];

	@BeforeInsert()
	async createData() {
		this.created_at = this.updated_at = new Date();
	}

	@BeforeUpdate()
	async updateData() {
		this.updated_at = new Date();
	}
}
