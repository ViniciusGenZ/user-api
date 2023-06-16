import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Base } from "./Base";
import { PermissionsHasRole } from "./PermissionsHasRole";

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
  permissionsHasRoles: PermissionsHasRole[]
}
