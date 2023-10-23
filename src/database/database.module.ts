import { Module } from '@nestjs/common';
import { MainPrismaService } from './main-prisma/main-prisma.service';
import { MongoPrismaService } from './mongo-prisma/mongo-prisma.service';

@Module({
  providers: [MainPrismaService, MongoPrismaService],
  exports: [MainPrismaService, MongoPrismaService],
})
export class DatabaseModule {}
