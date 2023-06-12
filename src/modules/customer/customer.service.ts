import { Injectable, Inject } from '@nestjs/common';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { Customer } from './model/customer';
import { CacheProvider } from '../../providers/cache/cache';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(@Inject('CacheProvider') private cacheProvider: CacheProvider) {}

  async create(dto: CreateCustomerDTO): Promise<Customer> {
    const customer = new Customer({
      document: dto.document,
      name: dto.name,
    });

    await this.cacheProvider.save(customer.id, customer.toJSON());

    return customer;
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.cacheProvider.load(id);

    return customer ? new Customer(customer) : null;
  }

  async update(id: string, dto: UpdateCustomerDTO): Promise<Customer> {
    if (id !== dto.id) {
      const newIdExists = await this.findById(dto.id);

      if (newIdExists) {
        throw new Error('ID already exists');
      }
    }

    const customer = await this.findById(id);

    if (!customer) {
      throw new Error('Customer not found');
    }

    const updatedCustomer = new Customer(dto);

    const success = await this.cacheProvider.update(
      id,
      updatedCustomer.toJSON(),
    );

    if (!success) {
      throw new Error('Error while updating customer');
    }

    return updatedCustomer;
  }
}
