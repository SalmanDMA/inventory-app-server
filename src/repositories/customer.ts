import { PrismaClient } from '@prisma/client';
import { ICustomer } from '../types/model';

const prisma = new PrismaClient();

export class CustomerRepository {
  async getAllCustomers(): Promise<ICustomer[]> {
    const customers = await prisma.customers.findMany({
      include: {
        image: true,
        sales: true,
      },
    });
    return customers as ICustomer[];
  }

  async getCustomerById(id: string): Promise<ICustomer | null> {
    const customer = await prisma.customers.findUnique({
      where: {
        customerId: id,
      },
      include: {
        image: true,
        sales: true,
      },
    });
    return customer as ICustomer;
  }

  async createCustomer(customer: ICustomer): Promise<ICustomer> {
    const { image, sales, ...customerData } = customer;
    const createdCustomer = await prisma.customers.create({
      data: {
        ...customerData,
      },
    });
    return createdCustomer as ICustomer;
  }

  async updateCustomer(customer: ICustomer): Promise<ICustomer> {
    const { image, sales, ...customerData } = customer;
    const updatedCustomer = await prisma.customers.update({
      where: {
        customerId: customer.customerId,
      },
      data: {
        ...customerData,
      },
    });
    return updatedCustomer as ICustomer;
  }

  async softDelete(customerId: string): Promise<ICustomer> {
    const deletedCustomer = await prisma.customers.update({
      where: {
        customerId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return deletedCustomer as ICustomer;
  }

  async forceDelete(customerId: string): Promise<ICustomer> {
    const forceDeletedCustomer = await prisma.customers.delete({
      where: {
        customerId,
      },
    });
    return forceDeletedCustomer as ICustomer;
  }

  async restore(customerId: string): Promise<ICustomer> {
    const restoredCustomer = await prisma.customers.update({
      where: {
        customerId,
      },
      data: {
        deletedAt: null,
      },
    });
    return restoredCustomer as ICustomer;
  }
}
