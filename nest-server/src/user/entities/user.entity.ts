import { Entity ,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,DeleteDateColumn } from "typeorm";

@Entity()

export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column({unique:true})
    email: string;

    @Column()  
    password: string;

    @Column({nullable:true})
    verification_code: string;
    
    @Column({default:false})
    isVerified: number;

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


