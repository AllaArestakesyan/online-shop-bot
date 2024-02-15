import { Category } from 'src/category/entities/category.entity';
import { ImageProduct } from 'src/image-product/entities/image-product.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany } from 'typeorm';

@Entity()
export class  Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;


  @Column()
  liter: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
  
  @OneToMany(() => ImageProduct, (imageProduct) => imageProduct.product, {cascade:true})
  pic_url: ImageProduct[];
  
  // @OneToMany(() => Cart, (cart) => cart.product, {cascade:true})
  // carts: Cart[];
}