import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ICustomer } from './customer.interface';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { FindCustomerByIdDTO } from './dto/find-customer-by-id.dto';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  async create(@Body() body: CreateCustomerDTO): Promise<ICustomer> {
    try {
      const customer = await this.customerService.create(body);

      return customer;
    } catch (error) {
      // implement error messages
      if (error.message === 'Error: Cache unavailable') {
        throw new HttpException('Cache unavailable', HttpStatus.BAD_GATEWAY);
      }
    }
  }

  @Get(':id')
  async findById(@Param() { id }: FindCustomerByIdDTO): Promise<ICustomer> {
    try {
      const customer = await this.customerService.findById(id);

      return customer;
    } catch (error) {
      // implement error messages
      if (error.message === 'Error: Cache unavailable') {
        throw new HttpException('Cache unavailable', HttpStatus.BAD_GATEWAY);
      }
    }
  }
}
