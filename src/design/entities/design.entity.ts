import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Design {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
  
  @Column()
  phone: string;

  @Column()
  description:string
  
  @Column()
  pic_url:string

}