import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import validationSchema from './config/env.schema';
import { CacheProvider } from './providers/cache/cache';
import { RedisClient } from './providers/cache/clients/redis';
import { ICacheClient } from './providers/cache/cache.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
    }),
  ],
  controllers: [],
  providers: [
    AppService,
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
