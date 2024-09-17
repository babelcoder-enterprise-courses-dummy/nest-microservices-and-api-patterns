import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';

@Global()
@Module({
  imports: [
    AuthModule,
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: async () => {
        const url = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

        return {
          store: await redisStore({
            url,
            database: 0,
          }),
        };
      },
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CoreModule {}
