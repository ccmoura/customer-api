import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { FindCustomerByIdDTO } from './dto/find-customer-by-id.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { Customer } from './model/customer';
import { AuthSSOGuard } from '../../config/auth/sso/sso.guard';

@Controller('customers')
@UseGuards(AuthSSOGuard)
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
    }
  }

  @Get(':id')
  async findById(@Param() { id }: FindCustomerByIdDTO): Promise<Customer> {
    let customer;
    try {
      customer = await this.customerService.findById(id);
    } catch (error) {
      // implement error messages
      if (error.message === 'Error: Cache unavailable') {
        throw new HttpException('Cache unavailable', HttpStatus.BAD_GATEWAY);
      }
    }

    if (!customer) {
      throw new NotFoundException();
    }

    return customer;
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
        throw new NotFoundException();
      }

      if (error.message === 'ID already exists') {
        throw new ConflictException();
      }

      // implement error messages
      if (error.message === 'Error: Cache unavailable') {
        throw new HttpException('Cache unavailable', HttpStatus.BAD_GATEWAY);
      }
    }
  }
}
