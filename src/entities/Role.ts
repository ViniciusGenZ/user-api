import {
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Base } from "./Base";
  
  @Entity("roles")
  export class Role extends Base {
    @PrimaryGeneratedColumn()
    id_role: number;
  }
  