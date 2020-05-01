# Diskurs Backend

Backend application exposing RESTful API providing thesaurus of similar words and phrases in Slovenian, Croatian and Serbian language. Data is scraped from [kontekst.io](https://www.kontekst.io/). This is a TypeScript-based Node.js application using Nest.js framework.

## Motivation

The idea behind `kontekst.io` is extremely appealing: their Slovenian thesaurus is based on `word2vec` model which is capable of producing word embeddings. You can read more about this neural network on [Wikipedia](https://en.wikipedia.org/wiki/Word2vec).

Since I couldn't find any such project before for Slovenian or Serbo-Croatian languages, I decided to give it a go, and create this RESTful API which is basically a web scraper.

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

Documentation is in the working...
