import { Module } from '@nestjs/common';
import { KontekstModule } from './kontekst/kontekst.module';

@Module({
    imports: [KontekstModule]
})
export class AppModule {}
