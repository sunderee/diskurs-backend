import { Controller, Get, Query } from '@nestjs/common';
import { KontekstService } from './kontekst.service';

@Controller('kontekst')
export class KontekstController {
    constructor(private readonly service: KontekstService) {}

    @Get('slovenian')
    async scrapeForSlovenian(@Query('word') word): Promise<any> {
        return await this.service.scrapeSlovenian(word);
    }
}
