import { Controller, Get, Query } from '@nestjs/common';
import { KontekstService } from './kontekst.service';

@Controller('kontekst')
export class KontekstController {
    constructor(private readonly service: KontekstService) {}

    @Get('slovenian')
    async scrapeForSlovenian(@Query('word') word): Promise<string[] | string> {
        return await this.service.scrapeSlovenian(word);
    }

    @Get('croatian')
    async scrapeForCroatian(@Query('word') word): Promise<string[] | string> {
        return await this.service.scrapeCroatian(word);
    }

    @Get('serbian')
    async scrapeForSerbian(@Query('word') word): Promise<string[] | string> {
        return await this.service.scrapeSerbian(word);
    }
}
