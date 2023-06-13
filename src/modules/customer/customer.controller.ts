import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { FindCustomerByIdDTO } from './dto/find-customer-by-id.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { Customer } from './model/customer';
import { AuthSSOGuard } from '../../config/auth/sso/sso.guard';
import generateHttpException from '../../util/generate-http-exception';

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
      generateHttpException(error);
    }
  }

  @Get(':id')
  async findById(@Param() { id }: FindCustomerByIdDTO): Promise<Customer> {
    let customer;
    try {
      customer = await this.customerService.findById(id);
    } catch (error) {
      generateHttpException(error);
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
      generateHttpException(error);
    }
  }
}
