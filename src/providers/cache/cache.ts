import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICacheClient, ICacheProvider } from './cache.interface';

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
    const data = await this.client.get(`${this.prefix}:${key}`);

    return JSON.parse(data);
  }

  async save(key: string, value: string): Promise<any> {
    return this.client.set(`${this.prefix}:${key}`, JSON.stringify(value));
  }
}
