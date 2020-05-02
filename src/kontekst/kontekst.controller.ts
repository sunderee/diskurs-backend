import { Controller, Get, Query } from '@nestjs/common';
import { KontekstService } from './kontekst.service';
import { KontekstResponseModel, ScrapingErrorModel } from './models';

@Controller('kontekst')
export class KontekstController {
    constructor(private readonly service: KontekstService) {}

    @Get('slovenian')
    async scrapeForSlovenian(@Query('word') word): Promise<KontekstResponseModel[] | ScrapingErrorModel> {
        return await this.service.scrapeSlovenian(word);
    }

    @Get('croatian')
    async scrapeForCroatian(@Query('word') word): Promise<KontekstResponseModel[] | ScrapingErrorModel> {
        return await this.service.scrapeCroatian(word);
    }

    @Get('serbian')
    async scrapeForSerbian(@Query('word') word): Promise<KontekstResponseModel[] | ScrapingErrorModel> {
        return await this.service.scrapeSerbian(word);
    }

    @Get('slovenian/corpus')
    async scrapeCorpusForSlovenian(@Query('word') word): Promise<any> {
        return await this.service.scrapeGeneralCorpusSlovenian(word);
    }
}
