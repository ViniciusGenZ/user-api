import { IHttpMethodsEnum } from "@interfaces/IHttpMethodsEnum";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
  } from "typeorm";
  import { Base } from "./Base";
import { Module } from "./Module";
import { Role } from "./Role";
  
  @Entity("permissions")
  export class Permission extends Base {
    @PrimaryGeneratedColumn()
    id_permission: number;

    @Column()
    url_access: string;

    @ManyToOne(() => Module, (module) => module.permissions)
    @JoinColumn({ name: "modules_sys_id_modules_sys", referencedColumnName: "id_modules_sys" })
    module: Module;

    @Column({
        type: 'enum',
        enum: IHttpMethodsEnum
    })
    method: IHttpMethodsEnum;

    @ManyToMany(() => Role, (role) => role.permissions)
    role: Role[]
  }
  