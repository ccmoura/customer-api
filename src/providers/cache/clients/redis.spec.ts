import { Test, TestingModule } from '@nestjs/testing';
import { RedisClient } from './redis';

describe('RedisClient', () => {
  let client: RedisClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisClient],
    }).compile();

    client = module.get<RedisClient>(RedisClient);
  });

  it('should be defined', () => {
    expect(client).toBeDefined();
  });
});
