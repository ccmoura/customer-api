import createMockInstance from '../../../test/test.utils';
import {
  NotFoundException,
  HttpException,
  ConflictException,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './model/customer';
import { CustomerController } from './customer.controller';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

jest.mock('./customer.service');

describe('CustomerController', () => {
  let controller: CustomerController;

  let customerService: jest.Mocked<CustomerService>;

  let findByIdSpy: jest.SpyInstance<Promise<Customer>>;
  let createSpy: jest.SpyInstance<Promise<Customer>>;
  let updateSpy: jest.SpyInstance<Promise<Customer>>;

  beforeEach(() => {
    customerService = createMockInstance(CustomerService);

    controller = new CustomerController(customerService);

    findByIdSpy = jest.spyOn(customerService, 'findById');
    createSpy = jest.spyOn(customerService, 'create');
    updateSpy = jest.spyOn(customerService, 'update');
  });

  describe('findById', () => {
    it('should return a customer by id', async () => {
      // Arrange
      const customer = new Customer({
        id: 'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
        document: '1234567890',
        name: 'Customer Name',
      });
      findByIdSpy.mockResolvedValueOnce(customer);

      // Act
      const response = await controller.findById({
        id: 'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
      });

      // Assert

      expect(response).toStrictEqual(customer);
    });

    it('should throw an exception if customer does not exist', async () => {
      // Arrange
      findByIdSpy.mockResolvedValueOnce(null);

      // Act
      const response = controller.findById({
        id: 'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
      });

      // Assert
      await expect(response).rejects.toThrowError(NotFoundException);
    });

    it('should throw an exception if cache is unavailable', async () => {
      // Arrange
      findByIdSpy.mockRejectedValue(new Error('Error: Cache unavailable'));

      // Act
      const response = controller.findById({
        id: 'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
      });

      // Assert
      await expect(response).rejects.toThrowError(HttpException);
    });
  });

  describe('create', () => {
    it('should create a customer', async () => {
      // Arrange
      const customer = new Customer({
        id: 'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
        document: '1234567890',
        name: 'Customer Name',
      });
      createSpy.mockResolvedValueOnce(customer);

      // Act
      const response = await controller.create({
        document: '1234567890',
        name: 'Customer Name',
      });

      // Assert

      expect(response).toStrictEqual(customer);
    });

    it('should throw an exception if cache is unavailable', async () => {
      // Arrange
      createSpy.mockRejectedValue(new Error('Error: Cache unavailable'));

      // Act
      const response = controller.create({
        document: '123456',
        name: 'Customer',
      });

      // Assert
      await expect(response).rejects.toThrowError(HttpException);
    });
  });

  describe('update', () => {
    it('should update a customer', async () => {
      // Arrange
      const customer = new Customer({
        id: 'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
        document: '1234567890',
        name: 'Customer Name',
      });
      updateSpy.mockResolvedValueOnce(customer);

      // Act
      const response = await controller.update(
        { id: '385c33ce-e639-4eca-8c9f-9a7ac75f2c83' },
        {
          id: 'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
          document: '1234567890',
          name: 'Customer Name',
        },
      );

      // Assert
      expect(response).toStrictEqual(customer);
    });

    it('should throw an exception if cache is unavailable', async () => {
      // Arrange
      updateSpy.mockRejectedValue(new Error('Error: Cache unavailable'));

      // Act
      const response = controller.update(
        { id: '385c33ce-e639-4eca-8c9f-9a7ac75f2c83' },
        {
          id: 'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
          document: '123456',
          name: 'Customer',
        },
      );

      // Assert
      await expect(response).rejects.toThrowError(HttpException);
    });

    it('should throw an exception if customer does not exist', async () => {
      // Arrange
      updateSpy.mockRejectedValue(new Error('Customer not found'));

      // Act
      const response = controller.update(
        { id: '385c33ce-e639-4eca-8c9f-9a7ac75f2c83' },
        {
          id: 'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
          document: '123456',
          name: 'Customer',
        },
      );

      // Assert
      await expect(response).rejects.toThrowError(NotFoundException);
    });

    it('should throw an exception if ID already exists', async () => {
      // Arrange
      updateSpy.mockRejectedValue(new Error('ID already exists'));

      // Act
      const response = controller.update(
        { id: '385c33ce-e639-4eca-8c9f-9a7ac75f2c83' },
        {
          id: 'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
          document: '123456',
          name: 'Customer',
        },
      );

      // Assert
      await expect(response).rejects.toThrowError(ConflictException);
    });
  });
});
