import { Test, TestingModule } from '@nestjs/testing';
import { MainPrismaService } from './main-prisma.service';

describe('BosnetPrismaService', () => {
  let service: MainPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainPrismaService],
    }).compile();

    service = module.get<MainPrismaService>(MainPrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
