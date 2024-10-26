import InvariantError from '../exeptions/InvariantError';
import NotFoundError from '../exeptions/NotFoundError';
import { CustomerRepository } from '../repositories/customer';
import { ICustomer } from '../types/model';

const customerRepository = new CustomerRepository();

export class CustomerService {
  async getCustomers() {
    return await customerRepository.getAllCustomers();
  }

  async getCustomerById(id: string) {
    const customer = await customerRepository.getCustomerById(id);

    if (!customer) {
      throw new NotFoundError('Customer not found, please register first');
    }

    return customer;
  }

  async updateCustomer(customer: ICustomer) {
    const customerData = await customerRepository.getCustomerById(customer.customerId);

    if (!customerData) {
      throw new NotFoundError('Customer not found, please register first');
    }

    const updatedCustomer = await customerRepository.updateCustomer(customer);

    return updatedCustomer;
  }

  async createCustomer(customer: ICustomer) {
    if (!customer.name || !customer.email || !customer.phone) {
      throw new InvariantError('Please provide all required fields');
    }

    const createdCustomer = await customerRepository.createCustomer(customer);
    return createdCustomer;
  }

  async softDeleteCustomers(customerIds: string[]) {
    for (const customerId of customerIds) {
      const customerData = await customerRepository.getCustomerById(customerId);
      if (!customerData) {
        throw new NotFoundError(`Customer with ID ${customerId} not found, please register first`);
      }
      await customerRepository.softDelete(customerData.customerId);
    }
  }

  async restoreCustomers(customerIds: string[]) {
    for (const customerId of customerIds) {
      const customerData = await customerRepository.getCustomerById(customerId);
      if (!customerData) {
        throw new NotFoundError(`Customer with ID ${customerId} not found, please register first`);
      }
      await customerRepository.restore(customerData.customerId);
    }
  }

  async forceDeleteCustomers(customerIds: string[]) {
    for (const customerId of customerIds) {
      const customerData = await customerRepository.getCustomerById(customerId);
      if (!customerData) {
        throw new NotFoundError(`Customer with ID ${customerId} not found, please register first`);
      }
      await customerRepository.forceDelete(customerData.customerId);
    }
  }
}
