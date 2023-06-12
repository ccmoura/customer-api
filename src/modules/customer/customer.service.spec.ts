import createMockInstance from '../../../test/test.utils';
import { CustomerService } from './customer.service';
import { CacheProvider } from '../../providers/cache/cache';
import { Customer } from './model/customer';

jest.mock('../../providers/cache/cache');

describe('CustomerService', () => {
  let service: CustomerService;
  let cacheProvider: jest.Mocked<CacheProvider>;

  let loadSpy: jest.SpyInstance<any>;

  beforeEach(async () => {
    cacheProvider = createMockInstance(CacheProvider);

    service = new CustomerService(cacheProvider);

    loadSpy = jest.spyOn(cacheProvider, 'load');
  });

  describe('findById', () => {
    it('should return a customer by id', async () => {
      // Arrange
      const customer = new Customer({
        id: 'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
        document: '1234567890',
        name: 'Customer Name',
      });
      loadSpy.mockResolvedValueOnce(customer);

      // Act
      const response = await service.findById(
        'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
      );

      // Assert
      expect(response).toStrictEqual(customer);
    });

    it('should return null if customer does not exist', async () => {
      // Arrange
      loadSpy.mockResolvedValueOnce(null);

      // Act
      const response = await service.findById(
        'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
      );

      // Assert
      expect(response).toBeNull();
    });
  });
});
