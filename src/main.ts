import { Actor } from 'apify';
import { HttpCrawler } from '@crawlee/cheerio';
import { ImpitHttpClient } from '@crawlee/impit-client';

import { RoutePokemonById } from './routes/pokemon-id.js';
import { router } from './routes/router.js';

export type Input = { pokemon: string[] };

await Actor.init();
const input = await Actor.getInput<Input>();

if (!input?.pokemon?.length) {
    throw await Actor.fail('Input "pokemon" must contain at least one Pokémon name or ID');
}

const requests = input.pokemon.map((identifier) => RoutePokemonById.createRequest(identifier));

const impitClient = new ImpitHttpClient({
    browser: 'chrome',
});

const crawler = new HttpCrawler({
    httpClient: impitClient,
    maxConcurrency: 1,
    requestHandler: router,
});
await crawler.run(requests);

await Actor.exit();
