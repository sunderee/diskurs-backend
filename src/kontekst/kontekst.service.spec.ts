import { Test, TestingModule } from '@nestjs/testing';
import { KontekstService } from './kontekst.service';

describe('KontekstService', () => {
    let service: KontekstService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [KontekstService]
        }).compile();

        service = module.get<KontekstService>(KontekstService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
