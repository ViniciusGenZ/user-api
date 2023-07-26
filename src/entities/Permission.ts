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
	url_access: string;

	@Column()
	modules_sys_id_modules_sys: number;

	@ManyToOne(() => Module, (module) => module.permissions)
	@JoinColumn({
		name: 'modules_sys_id_modules_sys',
		referencedColumnName: 'id_modules_sys',
	})
	module: Module;

	@Column({
		type: 'enum',
		enum: IHttpMethodsEnum,
	})
	method: IHttpMethodsEnum;

	@OneToMany(() => PermissionsHasRole, (phr) => phr.permission)
	permissionsHasRoles: PermissionsHasRole[];
}
