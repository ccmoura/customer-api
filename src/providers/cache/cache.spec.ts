import { ConfigService } from '@nestjs/config';
import { CacheProvider } from '../../providers/cache/cache';
import { RedisClient } from './clients/redis';
import createMockInstance from '../../../test/test.utils';

jest.mock('../../providers/cache/clients/redis');

describe('CacheProvider', () => {
  let provider: CacheProvider;

  let redisClient: RedisClient;
  let isAvailableSpy: jest.SpyInstance<boolean>;
  let getSpy: jest.SpyInstance<any>;
  let setSpy: jest.SpyInstance<any>;
  let updateSpy: jest.SpyInstance<any>;

  beforeEach(() => {
    redisClient = createMockInstance(RedisClient);

    provider = new CacheProvider(new ConfigService(), redisClient);

    isAvailableSpy = jest.spyOn(redisClient, 'isAvailable');
    getSpy = jest.spyOn(redisClient, 'get');
    setSpy = jest.spyOn(redisClient, 'set');
    updateSpy = jest.spyOn(redisClient, 'update');
  });

  afterAll(() => {
    provider.onModuleInit();
  });

  describe('load', () => {
    it('should load data by key', async () => {
      // Arrange
      const stringData = JSON.stringify({ test: true });
      isAvailableSpy.mockReturnValueOnce(true);
      getSpy.mockResolvedValueOnce(stringData);

      // Act
      const response = await provider.load(
        'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
      );

      // Assert
      expect(response).toStrictEqual(JSON.parse(stringData));
    });

    it('should return null if key not exists', async () => {
      // Arrange
      isAvailableSpy.mockReturnValueOnce(true);
      getSpy.mockResolvedValueOnce(null);

      // Act
      const response = await provider.load(
        'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
      );

      // Assert
      expect(response).toBeNull();
    });

    it('should throw an error if cache is unavailable', async () => {
      // Arrange
      isAvailableSpy.mockReturnValueOnce(false);

      // Act
      const response = provider.load('e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778');

      // Assert
      await expect(response).rejects.toThrowError(
        new Error('Cache unavailable'),
      );
    });
  });

  describe('save', () => {
    it('should save data by key', async () => {
      // Arrange
      const value = { test: true };
      isAvailableSpy.mockReturnValueOnce(true);
      setSpy.mockResolvedValueOnce(value);

      // Act
      const response = await provider.save(
        'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
        { test: true },
      );

      // Assert
      expect(response).toStrictEqual(value);
    });

    it('should return null if data is not saved', async () => {
      // Arrange
      isAvailableSpy.mockReturnValueOnce(true);
      setSpy.mockResolvedValueOnce(null);

      // Act
      const response = await provider.save(
        'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
        { test: true },
      );

      // Assert
      expect(response).toBeNull();
    });

    it('should throw an error if cache is unavailable', async () => {
      // Arrange
      isAvailableSpy.mockReturnValueOnce(false);

      // Act
      const response = provider.save('e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778', {
        test: true,
      });

      // Assert
      await expect(response).rejects.toThrowError(
        new Error('Cache unavailable'),
      );
    });
  });

  describe('update', () => {
    it('should update data by key', async () => {
      // Arrange
      const value = { test: true, id: 'b666db2e-fdda-4126-88ef-f197fe1d009b' };
      isAvailableSpy.mockReturnValueOnce(true);
      updateSpy.mockResolvedValue(value);

      // Act
      const response = await provider.update(
        'e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778',
        { test: true, id: 'b666db2e-fdda-4126-88ef-f197fe1d009b' },
      );

      // Assert
      expect(response).toStrictEqual(value);
    });

    it('should throw an error if cache is unavailable', async () => {
      // Arrange
      isAvailableSpy.mockReturnValueOnce(false);

      // Act
      const response = provider.update('e58db9d0-1eca-4d9f-9fd6-d0c17a3a1778', {
        test: true,
      });

      // Assert
      await expect(response).rejects.toThrowError(
        new Error('Cache unavailable'),
      );
    });
  });
});
