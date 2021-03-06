import { Injectable } from '@nestjs/common';
const axios = require('axios');
import * as cheerio from 'cheerio';
import { KontekstResponseModel, ScrapingErrorModel } from './models';

@Injectable()
export class KontekstService {
    constructor() {}

    async scrapeSlovenian(word: string): Promise<KontekstResponseModel[] | ScrapingErrorModel> {
        const finalUrl = this.constructEndpoint('slovenian', word);
        return this.scraper(finalUrl);
    }

    async scrapeCroatian(word: string): Promise<KontekstResponseModel[] | ScrapingErrorModel> {
        const finalUrl = this.constructEndpoint('croatian', word);
        return this.scraper(finalUrl);
    }

    async scrapeSerbian(word: string): Promise<KontekstResponseModel[] | ScrapingErrorModel> {
        const finalUrl = this.constructEndpoint('serbian', word);
        return this.scraper(finalUrl);
    }

    async scrapeGeneralCorpusSlovenian(word: string): Promise<string[]> {
        const finalUrl = this.constructEndpoint('slovenian', word);
        return this.generalCorpusSearch(finalUrl);
    }

    async scrapeGeneralCorpusCroatian(word: string): Promise<string[]> {
        const finalUrl = this.constructEndpoint('croatian', word);
        return this.generalCorpusSearch(finalUrl);
    }

    async scrapeGeneralCorpusSerbian(word: string): Promise<string[]> {
        const finalUrl = this.constructEndpoint('serbian', word);
        return this.generalCorpusSearch(finalUrl);
    }

    private getHtmlFromUrl = async (url: string): Promise<string> => {
        const { data: html } = await axios.get(url);
        return html;
    };

    private constructEndpoint = (language: string, query: string): string => this.constructLanguageUrl(language) + query;

    private constructLanguageUrl = (code: string): string => {
        const languageCodes = {
            slovenian: 'https://www.kontekst.io/kontekst/',
            croatian: 'https://www.kontekst.io/hrvatski/',
            serbian: 'https://www.kontekst.io/srpski/',
            default: 'https://www.kontekst.io/kontekst/'
        };
        return languageCodes[code] || languageCodes.default;
    };

    private async scraper(url: string): Promise<KontekstResponseModel[] | ScrapingErrorModel> {
        const html: string[] | string = await this.getHtmlFromUrl(url);
        const $ = cheerio.load(html);

        const wordsRegex = new RegExp(/([a-zA-Z?????????? ]+)|(\d{2}(?=\%))/gm);

        const divs = $('#results > div > #fromserver').contents().text();
        const wordsMatch: RegExpMatchArray | null = divs.match(wordsRegex);
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
                  .map(
                      (array: string[]): KontekstResponseModel => ({
                          word: array[0],
                          similarity: parseInt(array[1], 10)
                      })
                  )
            : ({
                  error: 'Scraper issue',
                  context: 'Yes',
                  description: 'The returning RegExpMatchArray seems to be null'
              } as ScrapingErrorModel);
    }

    private async generalCorpusSearch(url: string): Promise<string[]> {
        const html: string[] | string = await this.getHtmlFromUrl(url);
        const $ = cheerio.load(html);

        return $('body > div.main.container > div:nth-child(4) > div.sptop1.col-lg-4.col-sm-12.col-md-12 > div > div.card-body.nopad.col-12')
            .text()
            .split(/\n/)
            .filter((sentence: string) => sentence.length > 0)
            .slice(0, -3);
    }
}
