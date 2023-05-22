import { IHttpMethodsEnum } from "@interfaces/IHttpMethodsEnum";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { Base } from "./Base";
import { Module } from "./Modules";
  
  @Entity("permissions")
  export class Permission extends Base {
    @PrimaryGeneratedColumn()
    id_permission: number;

    @Column()
    url_access: string;

    @ManyToOne(() => Module, (module) => module.permissions)
    @JoinColumn({ name: "permission_has_modules", referencedColumnName: "module_id_module" })
    module: Module;

    @Column({
        type: 'enum',
        enum: IHttpMethodsEnum,
        default: IHttpMethodsEnum.GET
    })
    method: IHttpMethodsEnum;
  }
  