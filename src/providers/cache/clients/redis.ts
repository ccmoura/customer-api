import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { ICacheClient, ICacheProvider } from '../cache.interface';

interface IRedisConfig {
  port: number;
  host: string;
  username: string;
  password: string;
}

@Injectable()
export class RedisClient implements ICacheClient {
  private client: Redis;
  private config: IRedisConfig;

  constructor(private configService: ConfigService) {
    this.config = {
      port: this.configService.get('CACHE_PORT'),
      host: this.configService.get('CACHE_HOST'),
      username: this.configService.get('CACHE_USERNAME'),
      password: this.configService.get('CACHE_PASSWORD'),
    };

    this.client = new Redis(this.config);
  }

  async get(key: string): Promise<any> {
    return this.client.get(key);
  }

  async set(key: string, value: string): Promise<any> {
    return this.client.set(key, value);
  }
}
