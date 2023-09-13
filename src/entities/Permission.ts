import { IHttpMethodsEnum } from '@interfaces/IHttpMethodsEnum';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
	OneToMany,
} from 'typeorm';
import { Base } from './Base';
import { Module } from './Module';
import { PermissionsHasRole } from './PermissionsHasRole';

@Entity('permissions')
export class Permission extends Base {
	@PrimaryGeneratedColumn()
	id_permission: number;

	@Column()
	modules_sys_id_modules_sys: number;

	@Column()
	maintenance: boolean;

	@Column()
	url_regex: string;

	@Column({
		type: 'enum',
		enum: IHttpMethodsEnum,
	})
	method: IHttpMethodsEnum;

	@ManyToOne(() => Module, (module) => module.permissions)
	@JoinColumn({
		name: 'modules_sys_id_modules_sys',
		referencedColumnName: 'id_modules_sys',
	})
	module: Module;

	@OneToMany(() => PermissionsHasRole, (phr) => phr.permission)
	permissionsHasRoles: PermissionsHasRole[];
}
