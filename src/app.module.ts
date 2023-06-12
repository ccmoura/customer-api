import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import validationSchema from './config/env.schema';
import { CacheProvider } from './providers/cache/cache';
import { RedisClient } from './providers/cache/clients/redis';
import { ICacheClient } from './providers/cache/cache.interface';
import { CustomerController } from './modules/customer/customer.controller';
import { CustomerService } from './modules/customer/customer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
    }),
  ],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    RedisClient,
    {
      provide: 'CacheProvider',
      useFactory: (configService: ConfigService, client: ICacheClient) =>
        new CacheProvider(configService, client),
      inject: [ConfigService, RedisClient],
    },
  ],
})
export class AppModule {}
