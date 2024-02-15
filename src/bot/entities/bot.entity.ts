import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bot {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ask: string;
    @Column()
    answer: string;
}