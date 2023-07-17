import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Base } from "./Base";
import { PermissionsHasRole } from "./PermissionsHasRole";
import { User } from "./User";

@Entity("roles")
export class Role extends Base {
  @PrimaryGeneratedColumn()
  id_role: number;

  @Column()
  name_py: string

  @Column()
  name_en: string

  @Column()
  name_br: string

  @OneToMany(() => PermissionsHasRole, (phr) => phr.role)
  permissionsHasRoles: Array<PermissionsHasRole>

  @OneToMany(() => User, (u) => u.role)
  users: Array<User>
}
