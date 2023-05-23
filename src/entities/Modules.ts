import {
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    BaseEntity,
    Column,
  } from "typeorm";
import { Permission } from "./Permission";
  
  @Entity("modules")
  export class Module extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_module: number;

    @OneToMany(() => Permission, (permission) => permission.module)
    permissions: Permission[]

    @Column()
    name_py: string

    @Column()
    name_en: string

    @Column()
    name_br: string

    @Column()
    status_active: boolean
  }
  