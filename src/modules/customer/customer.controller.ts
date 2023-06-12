import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { FindCustomerByIdDTO } from './dto/find-customer-by-id.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { Customer } from './model/customer';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  async create(@Body() body: CreateCustomerDTO): Promise<Customer> {
    try {
      const customer = await this.customerService.create(body);

      return customer;
    } catch (error) {
      // implement error messages
      if (error.message === 'Error: Cache unavailable') {
        throw new HttpException('Cache unavailable', HttpStatus.BAD_GATEWAY);
      }

      if (error.message === 'Error: Data not found') {
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      }
    }
  }

  @Get(':id')
  async findById(@Param() { id }: FindCustomerByIdDTO): Promise<Customer> {
    try {
      const customer = await this.customerService.findById(id);

      if (!customer) {
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      }

      return customer;
    } catch (error) {
      // implement error messages
      if (error.message === 'Error: Cache unavailable') {
        throw new HttpException('Cache unavailable', HttpStatus.BAD_GATEWAY);
      }
    }
  }

  @Put(':id')
  async update(
    @Param() { id }: FindCustomerByIdDTO,
    @Body() body: UpdateCustomerDTO,
  ): Promise<Customer> {
    try {
      const customer = await this.customerService.update(id, body);

      return customer;
    } catch (error) {
      if (error.message === 'Customer not found') {
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      }

      if (error.message === 'ID already exists') {
        throw new HttpException('ID already exists', HttpStatus.CONFLICT);
      }

      // implement error messages
      if (error.message === 'Error: Cache unavailable') {
        throw new HttpException('Cache unavailable', HttpStatus.BAD_GATEWAY);
      }
    }
  }
}
