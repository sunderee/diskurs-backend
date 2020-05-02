import { Injectable } from '@nestjs/common';
const axios = require('axios');
import * as cheerio from 'cheerio';

@Injectable()
export class KontekstService {
    constructor() {}

    async scrapeSlovenian(word: string): Promise<string[] | string> {
        const finalUrl = this.constructEndpoint('slovenian', word);
        return this.scraper(finalUrl);
    }

    async scrapeCroatian(word: string): Promise<string[] | string> {
        const finalUrl = this.constructEndpoint('croatian', word);
        return this.scraper(finalUrl);
    }

    async scrapeSerbian(word: string): Promise<string[] | string> {
        const finalUrl = this.constructEndpoint('serbian', word);
        return this.scraper(finalUrl);
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

    private async scraper(url: string): Promise<string[] | string> {
        const html: string[] | string = await this.getHtmlFromUrl(url);
        const $ = cheerio.load(html);

        const wordsRegex = new RegExp(/([a-zA-Zđšžćč ]+)|(\d{2}(?=\%))/gm);

        const divs = $('#results > div > #fromserver').contents().text();
        const wordsMatch = divs.match(wordsRegex);
        return wordsMatch != null
            ? wordsMatch
                  .filter((value: string) => value !== 'Fran' && value !== 'si ')
                  .filter((value: string) => value !== 'lzmk' && value !== 'hr ')
                  .filter((value: string) => value !== 'Vokabular' && value !== 'org')
                  .reduce((previous: any[], _: string, index: number, array: string[]) => {
                      if (index % 2 === 0) {
                          previous.push(array.slice(index, index + 2));
                      }
                      return previous;
                  }, [])
            : 'Error has occurred';
    }
}
