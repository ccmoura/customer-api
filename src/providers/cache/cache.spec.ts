import { Test, TestingModule } from '@nestjs/testing';
import { CacheProvider } from './cache';

describe('RedisProvider', () => {
  let provider: CacheProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheProvider],
    }).compile();

    provider = module.get<CacheProvider>(CacheProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
