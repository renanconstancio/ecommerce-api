import { Customers } from '@prisma/client';

export type CustomersEntity = {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string | null;
  cnpj: string | null;
  phone: string | null;
  birth_date: string | null;
  avatar: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
} & Customers;