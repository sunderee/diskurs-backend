import { Module } from '@nestjs/common';
import { KontekstService } from './kontekst.service';
import { KontekstController } from './kontekst.controller';

@Module({
    providers: [KontekstService],
    controllers: [KontekstController]
})
export class KontekstModule {}
