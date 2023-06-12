import { Injectable, Inject } from '@nestjs/common';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { ICustomer } from './customer.interface';
import { Customer } from './model/customer';
import { CacheProvider } from '../../providers/cache/cache';

@Injectable()
export class CustomerService {
  constructor(@Inject('CacheProvider') private cacheProvider: CacheProvider) {}

  async create(dto: CreateCustomerDTO): Promise<ICustomer> {
    const customer = new Customer({
      document: dto.document,
      name: dto.name,
    });

    try {
      const saved = await this.cacheProvider.save(
        customer.id,
        customer.toJSON(),
      );

      return saved;
    } catch (error) {
      // add logger
      throw new Error('Error while storing customer');
    }
  }

  async findById(id: string): Promise<ICustomer> {
    try {
      const customer = await this.cacheProvider.load(id);

      return customer;
    } catch (error) {
      // add logger
      throw new Error(error);
    }
  }
}
