import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICacheClient, ICacheProvider } from './cache.interface';
import { ICustomer } from 'src/modules/customer/customer.interface';

@Injectable()
export class CacheProvider implements ICacheProvider {
  private prefix: string;

  constructor(
    private configService: ConfigService,
    private client: ICacheClient,
  ) {
    this.prefix = this.configService.get('CACHE_PREFIX');
  }

  async load(key: string): Promise<any> {
    const cacheAvailable = this.client.isAvailable();

    if (!cacheAvailable) {
      throw new Error('Cache unavailable');
    }

    const data = await this.client.get(`${this.prefix}:${key}`);

    if (!data) {
      throw new Error('Data not found');
    }

    return JSON.parse(data);
  }

  async save(key: string, value: unknown): Promise<any> {
    const cacheAvailable = this.client.isAvailable();

    if (!cacheAvailable) {
      throw new Error('Cache unavailable');
    }

    const result = await this.client.set(
      `${this.prefix}:${key}`,
      JSON.stringify(value),
    );

    if (result) {
      return value;
    }

    return null;
  }
}
