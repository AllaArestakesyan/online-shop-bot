import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ImageProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Product, (product) => product.pic_url, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  product: Product;

}