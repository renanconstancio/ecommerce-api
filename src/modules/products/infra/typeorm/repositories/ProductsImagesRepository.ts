import { Repository } from 'typeorm';
import { IProductsImagesRepository } from '@modules/products/domain/repositories/IProductsImagesRepository';

import ProductImage from '../entities/ProductImage';
import { dataSource } from '@shared/infra/typeorm';

export default class ProductsImagesRepository
  implements IProductsImagesRepository
{
  private ormRepository: Repository<ProductImage>;

  constructor() {
    this.ormRepository = dataSource.getRepository(ProductImage);
  }

  async save(image: ProductImage): Promise<ProductImage> {
    await this.ormRepository.save(image);

    return image;
  }

  async remove(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  async findBySkuIdCount(product_sku_id: string): Promise<number> {
    const [, count] = await this.ormRepository.findAndCount({
      where: { product_sku_id },
    });

    return Number(count);
  }

  async findById(id: string): Promise<ProductImage | null> {
    const productImage = await this.ormRepository.findOneBy({ id });

    return productImage;
  }
}
