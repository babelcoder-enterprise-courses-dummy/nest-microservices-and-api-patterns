import { Global, Logger, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import type { RedisClientOptions } from 'redis';
import { PrismaService } from './services/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { TasksService } from './services/task.service';

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
  providers: [PrismaService, Logger, TasksService],
  exports: [PrismaService, Logger],
})
export class CoreModule {}