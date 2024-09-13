import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Global()
@Module({
  imports: [AuthModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CoreModule {}
