import { testActor } from 'apify-test-tools';
import { describe } from 'vitest';

import type { Input } from '../../../src/main.js';

const ACTOR_ID = 'apify/example-store-actor';

describe('Prefilled inputs', () => {
    testActor(ACTOR_ID, 'should handle prefilled inputs', async ({ run, expect }) => {
        // Actor
        const result = await run({ input: {}, prefilledInput: true });

        // Assert
        const input = await result.getInput<Input>();
        await expect.toFinishWith({ datasetItemCount: input.dataCount });
    });
});
