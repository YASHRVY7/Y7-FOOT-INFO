import { Test, TestingModule } from '@nestjs/testing';
import { LeaguesService } from './leagues.service';
import { ExternalApiService } from '../external-api/external-api.service';

describe('LeaguesService', () => {
  let service: LeaguesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaguesService,ExternalApiService],
    }).compile();

    service = module.get<LeaguesService>(LeaguesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
