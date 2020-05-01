import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlService {
    constructEndpoint(language: string, query: string): string {
        return this.constructLanguageUrl(language) + query;
    }

    private constructLanguageUrl = (code: string): string => {
        const languageCodes = {
            slovenian: 'https://www.kontekst.io/kontekst/',
            croatian: 'https://www.kontekst.io/hrvatski/',
            serbian: 'https://www.kontekst.io/srpski/',
            default: 'https://www.kontekst.io/kontekst/'
        };
        return languageCodes[code] || languageCodes.default;
    };
}
