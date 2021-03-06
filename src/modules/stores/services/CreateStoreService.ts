import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IStoresRepository } from '../domain/repositories/IStoresRepository';
import { IStore } from '../domain/models/IStore';
import { ICreateStore } from '../domain/models/ICreateStore';

@injectable()
export default class CreateStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  async execute({
    title,
    fantasy_name,
    email,
    phone,
    opening_hours,
    address,
    number,
    district,
    complement,
    city,
    state,
    zip_code,
    visible,
  }: ICreateStore): Promise<IStore> {
    const storeExists = await this.storesRepository.findByFantasyName(
      fantasy_name,
    );

    if (storeExists) {
      throw new AppError('There is already one stores with this fantasy name');
    }

    const store = await this.storesRepository.create({
      title,
      fantasy_name,
      email,
      phone,
      opening_hours,
      address,
      number,
      district,
      complement,
      city,
      state,
      zip_code,
      visible,
    });

    return store;
  }
}
