import createMockInstance from '../../../test/test.utils';
import { NotFoundException, HttpException } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './model/customer';
import { CustomerController } from './customer.controller';

jest.mock('./customer.service');

describe('CustomerController', () => {
  let controller: CustomerController;

  let customerService: jest.Mocked<CustomerService>;

  let findByIdSpy: jest.SpyInstance<Promise<Customer>>;

  beforeEach(async () => {
    customerService = createMockInstance(CustomerService);

    controller = new CustomerController(customerService);

    findByIdSpy = jest.spyOn(customerService, 'findById');
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
});
