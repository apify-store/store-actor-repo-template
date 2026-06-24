import { Actor, log } from 'apify';
import { CheerioCrawler, createCheerioRouter } from 'crawlee';
import { ImpitHttpClient } from '@crawlee/impit-client';

import { pushDataCountToDataset } from './push-data.js';

await Actor.init();

const router = createCheerioRouter();
router.addHandler('DOC_PAGE', async ({ request, $, pushData }) => {
    const title = $('title').text();
    log.info(`Found title: ${title}`, { url: request.url });
    await pushData({ title });
});

const crawler = new CheerioCrawler({
    httpClient: new ImpitHttpClient({ browser: 'chrome' }),
    requestHandler: router,
});

await crawler.addRequests([
    { label: 'DOC_PAGE', url: 'https://docs.apify.com/platform/actors/development/actor-definition/input-schema' },
]);

await crawler.run();

export type Input = { dataCount: number };

const input = await Actor.getInput<Input>();
if (!input) throw await Actor.fail('Input is required');

await pushDataCountToDataset({ count: input.dataCount, actor: Actor });

await Actor.exit();
