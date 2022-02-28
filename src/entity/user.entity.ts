import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    password!: string;

    @Column({unique: true})
    email!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({
        default: ''
    })
    tfa_secret!: string;
}