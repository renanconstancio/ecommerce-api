import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateSessionsService from './CreateSessionsService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeCutomersRepository: FakeCustomersRepository;
let createSession: CreateSessionsService;
let fakeHashProvider: FakeHashProvider;

describe('CreateSessionsService', () => {
  beforeEach(() => {
    fakeCutomersRepository = new FakeCustomersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(
      fakeCutomersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const customer = await fakeCutomersRepository.create({
      name: 'Renan Testes',
      email: 'teste@teste.com',
      password: '123456',
      phone: '',
      cnpj: '',
      cpf: '',
      birth_date: '',
    });

    const response = await createSession.execute({
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(customer).toEqual(response.customer);

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existent customer or wrong password', async () => {
    expect(
      createSession.execute({
        email: 'teste@teste.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
