import { Entity, Unique, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './Base';
import { Role } from './Role';
import { Permission } from './Permission';

@Entity('permissions_has_role')
@Unique(['roles_id_role', 'permissions_id_permission'])
export class PermissionsHasRole extends Base {
	@PrimaryColumn()
	roles_id_role: number;

	@ManyToOne(() => Role, (role) => role.permissionsHasRoles)
	@JoinColumn({ name: 'roles_id_role', referencedColumnName: 'id_role' })
	role: Role;

	@PrimaryColumn()
	permissions_id_permission: number;

	@ManyToOne(() => Permission, (permission) => permission.permissionsHasRoles)
	@JoinColumn({
		name: 'permissions_id_permission',
		referencedColumnName: 'id_permission',
	})
	permission: Permission;
}
