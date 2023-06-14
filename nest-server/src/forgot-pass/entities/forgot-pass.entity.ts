import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class ForgotPass {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    verification_code: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({nullable:true})
    createBy: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({nullable:true})
    updateBy: number;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column({nullable:true})
    deleteBy: number;
    

    
}
