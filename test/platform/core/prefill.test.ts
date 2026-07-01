import { testActor } from 'apify-test-tools';
import { describe } from 'vitest';

const ACTOR_ID = 'apify/example-store-actor';

describe('Prefilled inputs', () => {
    testActor(ACTOR_ID, 'should handle prefilled inputs', async ({ run, expect }) => {
        // Actor
        await run({ input: { pokemon: ['1', '2'] }, prefilledInput: true });

        // Assert
        await expect.toFinishWith({ datasetItemCount: 2 });
    });
});
