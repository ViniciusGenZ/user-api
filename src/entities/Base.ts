import { Entity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Base extends BaseEntity{
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date; 

    @Column({default: true})
    status: boolean;

    @Column()
    created_by: number;

    @Column()
    updated_by: number;

    @Column({nullable: true})
    deleted_by: number;

}
