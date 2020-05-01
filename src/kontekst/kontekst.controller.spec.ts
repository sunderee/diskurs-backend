import { Test, TestingModule } from '@nestjs/testing';
import { KontekstController } from './kontekst.controller';

describe('Kontekst Controller', () => {
    let controller: KontekstController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [KontekstController]
        }).compile();

        controller = module.get<KontekstController>(KontekstController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
