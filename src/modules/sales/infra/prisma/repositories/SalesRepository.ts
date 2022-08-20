import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository';
import { SalesEntity } from '@modules/sales/infra/prisma/entities/Sales';
import { IPaginateSales } from '@modules/sales/dtos/IPaginateSales';
import { ICreateSales } from '@modules/sales/dtos/ICreateSales';
import { prisma } from '@shared/infra/prisma';
import { Prisma } from '@prisma/client';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export default class SalesRepository implements ISalesRepository {
  async findById(id: string): Promise<SalesEntity | null> {
    return {} as SalesEntity;
    // return prisma.sales.findFirst({
    //   where: { id },
    //   include: {
    //     sales_transactions: true,
    //   },
    // });
  }

  async findAll({ page, skip, take }: SearchParams): Promise<IPaginateSales> {
    const where: Prisma.SalesWhereInput = { deleted_at: null };

    const sales = await prisma.sales.findMany({
      take: take,
      skip: skip,
      where,
      include: {
        addresses: true,
        customer: true,
        products: true,
        transactions: true,
      },
    });

    return {
      total: 1,
      per_page: take,
      current_page: page,
      data: sales,
    };

    // return result;
  }

  async create({ customer, products }: ICreateSales): Promise<SalesEntity> {
    return {} as SalesEntity;
    // const order = prisma.sales.create({
    //   customer,
    //   order_products: products,
    // });

    // await prisma.sales.save(order);

    // return order;
  }
}
