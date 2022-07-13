// import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Product from './Product';

@Entity('products_skus')
export default class ProductSku {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Product, product => product.skus)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'varchar', length: 36, nullable: true })
  product_id!: string;

  @Column({ type: 'varchar', length: 20 })
  sku!: string;

  @Column('decimal')
  cost_price!: number;

  @Column('decimal')
  sale_price!: number;

  @Column('decimal')
  price!: number;

  @Column('int')
  quantity!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}