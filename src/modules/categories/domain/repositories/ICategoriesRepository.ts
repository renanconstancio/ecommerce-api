import { ICategory } from '../models/ICategory';
import { ICreateCategory } from '../models/ICreateCategory';
import { IPaginateCategory } from '../models/IPaginateCategory';
import { ISearchCategory } from '../models/ISearchCategory';

export interface ICategoriesRepository {
  findAll({
    page,
    skip,
    take,
    name,
  }: ISearchCategory): Promise<IPaginateCategory>;
  findByName(name: string): Promise<ICategory | null>;
  findById(id: string): Promise<ICategory | null>;
  create(data: ICreateCategory): Promise<ICategory>;
  save(data: ICategory): Promise<ICategory>;
  remove(id: string): Promise<void>;
}
