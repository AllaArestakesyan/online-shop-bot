import { Product } from 'src/product/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from '../role/enum.role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  surname: string;
  
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @Column({default:"user.png"})
  pic_url: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  }

