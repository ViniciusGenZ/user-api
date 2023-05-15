import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Base } from "./Base";
import { SessionType } from "./SessionType";
import { User } from "./User";
import bcrypt from "bcryptjs";

@Entity()
export class UserSession extends Base {
  @PrimaryGeneratedColumn()
  id_user_session: number;

  @Column()
  ip: string;

  @Column({ default: false })
  authorized: boolean;

  @Column()
  user_agent: string;

  @Column()
  expiration_date: Date;

  @Column()
  user_id_user: number;

  @Column()
  session_types_id_session_type: number;

  @ManyToOne(() => User, (user) => user.user_sessions)
  @JoinColumn({ name: "user_id_user", referencedColumnName: "id_user" })
  user: User;

  @ManyToOne(() => SessionType, (sessionType) => sessionType.sessions)
  @JoinColumn({
    name: "session_types_id_session_type",
    referencedColumnName: "id_session_type",
  })
  session_type: SessionType;

  //twoFA
  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  code_expiration: Date;

  @Column({ default: false })
  code_verified: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashCode() {
    if(this.code){
      this.code = await bcrypt.hash(this.code, 6);
    }
  }
}
