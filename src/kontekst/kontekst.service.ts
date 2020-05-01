import { Injectable } from '@nestjs/common';
const axios = require('axios');
import * as cheerio from 'cheerio';

@Injectable()
export class KontekstService {
    constructor() {}

    async scrapeSlovenian(word: string): Promise<any> {
        const finalUrl = this.constructEndpoint('slovenian', word);
        const html = await this.getHtmlFromUrl(finalUrl);
        const $: CheerioStatic = cheerio.load(html);

        const wordsRegex = new RegExp(/([a-zA-Zđšžćč]+)|(\d{2}(?=\%))/gm);

        const divs = $('#results > div > #fromserver').contents().text();
        const wordsMatch = divs.match(wordsRegex);
        return wordsMatch != null
            ? wordsMatch
                  .filter((value: string) => value !== 'Fran' && value !== 'si')
                  .reduce((previous: any[], _: string, index: number, array: string[]) => {
                      if (index % 2 === 0) {
                          previous.push(array.slice(index, index + 2));
                      }
                      return previous;
                  }, [])
            : 'Error has occurred';
    }

    private async getHtmlFromUrl(url: string): Promise<string> {
        const { data: html } = await axios.get(url);
        return html;
    }

    private constructEndpoint(language: string, query: string): string {
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
