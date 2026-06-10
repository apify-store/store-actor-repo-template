import { Actor } from 'apify';

import { pushDataCountToDataset } from './push-data.js';

export type Input = { dataCount: number };

await Actor.init();

const input = await Actor.getInput<Input>();
if (!input) throw await Actor.fail('Input is required');

await pushDataCountToDataset({ count: input.dataCount, actor: Actor });

await Actor.exit();
