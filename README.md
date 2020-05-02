# Diskurs Backend

Backend application exposing RESTful API providing thesaurus of similar words and phrases in Slovenian, Croatian and
Serbian language. Data is scraped from [kontekst.io](https://www.kontekst.io/). This is a TypeScript-based Node.js
application using Nest.js framework.

## Motivation

The idea behind `kontekst.io` is extremely appealing: their Slovenian thesaurus is based on `word2vec` model which is
capable of producing word embeddings. You can read more about this neural network on
[Wikipedia](https://en.wikipedia.org/wiki/Word2vec).

Since I couldn't find any such project before for Slovenian or Serbo-Croatian languages, I decided to give it a go, and
create this RESTful API which is basically a web scraper.

This is (obviously) a work in progress, so expect more functionalities and updates as we go.

## Usage

Run tests using the following NPM scripts:

```bash
# Run all unit tests
$ npm run test

# Run all unit tests and collect test coverage
$ npm run test:cov

# Run end-to-end (e2e) tests
$ npm run test:e2e
```

You can compile (build) the project into `dist` folder using `npm run build` command. This should also run linter and
format source code (if it hasn't been done so yet). Once developed, you will be able to use the following NPM scripts to
run the application in development, watch (live-reload) and production mode:

```bash
# Run in 'traditional' development mode
$ npm run start

# Run in watch mode which allows for live-reload
$ npm run start:dev

# Run in production mode
$ npm run start:prod
```

## API

### `kontekst/slovenian?word=`

Initiates a scraping of a Slovenian thesaurus for a given query parameter `word`. Example with `curl`:

```bash
$ curl -X GET http://localhost:3000/konteksts/slovenian?word=jugoslavija

[["sovjetska zveza","82"],["češkoslovaška","75"],["kraljevina jugoslavija","75"],["kraljevina shs","75"],["srbija","74"],
["avstroogrska","72"],["amerika","70"],["zvezna republika","69"],["republika","69"],["makedonija","68"],["federativna republika","68"],
["čehoslovaška","68"],["kuba","68"],["rusija","67"],["ukrajina","67"],["habsburška monarhija","67"],["kraljevina","67"],
["slovenija","65"],["nacistična nemčija","65"],["turčija","64"],["libija","64"],["albanija","64"],["italija","64"],
["rajnka","64"],["monarhija","63"],["avstro ogrska","63"],["evropa","62"],["nemčija","62"],["jugoslovanska armada","62"],
["jugoslovanska republika","62"],["komunistična partija","62"],["perzija","62"],["hrvaška","62"],["jugovina","61"],
["socialistična federativna republika jugoslavija","61"],["zssr","61"],["yugoslavija","61"],["palestina","61"],
["partija","61"],["grčija","61"]]
```

### `kontekst/croatian?word=`

Initiates a scraping of a Croatian thesaurus for a given query parameter `word`. Example with `curl`:

```bash
$ curl -X GET 'http://localhost:3000/kontekst/croatian?word=jugoslavija'

[["bivša jugoslavija","80"],["titova jugoslavija","79"],["čehoslovačka","76"],["kraljevina jugoslavija","76"],
["srbija","74"],["srboslavija","73"],["kraljevina shs","72"],["amerika","71"],["yugoslavija","69"],["carevina","68"],
["nacistička njemačka","67"],["banovina hrvatska","66"],["monarhija","66"],["bosna","66"],["republika","66"],
["evropa","65"],["istočna njemačka","65"],["republika srpska","65"],["savezna republika","65"],["kraljevina","65"],
["federativna","64"],["zapadna njemačka","64"],["austrougarska","64"],["crna gora","64"],["rusija","64"],
["komunistička partija","63"],["samostalna država","63"],["italija","62"],["libija","62"],["socijalistička","62"],
["jugoslavenska","62"],["hrvatska","62"],["vojvodina","62"],["jugoslavia","62"],["palestina","62"],["monarhistička","62"],
["europa","61"],["komunistička vlast","61"],["nezavisna država","61"],["sfrj","61"]]
```

### `kontekst/serbian?word=`

Initiates a scraping of a Serbian thesaurus for a given query parameter `word`. Example with `curl`:

```bash
$ curl -X GET 'http://localhost:3000/kontekst/serbian?word=jugoslavija'

[["bivša jugoslavija","76"],["sr jugoslavija","74"],["kraljevina jugoslavija","73"],["srbija","71"],
["kraljevina srbija","71"],["bosna","69"],["istočna nemačka","69"],["carska rusija","69"],["čehoslovačka","69"],
["amerika","68"],["crna gora","68"],["kraljevina shs","68"],["evropa","67"],["kraljevina","66"],["austrougarska","65"],
["rusija","65"],["vizantija","65"],["hrvatska","65"],["albanija","65"],["zapadna nemačka","64"],
["nacistička nemačka","64"],["monarhija","64"],["britanija","64"],["libija","63"],["republika srpska krajina","63"],
["gruzija","63"],["ukrajina","63"],["imperija","63"],["kuba","63"],["sfr jugoslavija","63"],["slovenija","63"],
["vojvodina","63"],["državna zajednica","62"],["republika","62"],["nezavisna država hrvatska","62"],
["savezna republika jugoslavija","62"],["italija","62"],["sfrj","62"],["carevina","62"],["republika srpska","61"]]
```