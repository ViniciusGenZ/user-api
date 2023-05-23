import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Base } from "./Base";
import { Permission } from "./Permission";

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

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "permissions_has_role", joinColumn: {
      name: "roles_id_role",
      referencedColumnName: "id_role"
    },
    inverseJoinColumn: {
      name: "permissions_id_permission",
      referencedColumnName: "id_permission"
    }
  })
  permissions: Permission[]
}
