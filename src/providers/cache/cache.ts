import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICacheClient, ICacheProvider } from './cache.interface';

@Injectable()
export class CacheProvider implements ICacheProvider, OnModuleInit {
  private prefix: string;

  constructor(
    private configService: ConfigService,
    private client: ICacheClient,
  ) {}

  onModuleInit() {
    this.prefix = this.configService.get('CACHE_PREFIX');
  }

  async load(key: string): Promise<any> {
    const cacheAvailable = this.client.isAvailable();

    if (!cacheAvailable) {
      throw new Error('Cache unavailable');
    }

    const data = await this.client.get(`${this.prefix}:${key}`);

    return data ? JSON.parse(data) : null;
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

    return result ? value : null;
  }

  async update(key: string, value: any): Promise<any> {
    const cacheAvailable = this.client.isAvailable();

    if (!cacheAvailable) {
      throw new Error('Cache unavailable');
    }

    return this.client.update(
      `${this.prefix}:${key}`,
      `${this.prefix}:${value.id}`,
      JSON.stringify(value),
    );
  }
}
