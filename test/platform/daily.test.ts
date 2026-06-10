import { testActor } from 'apify-test-tools';
import { describe } from 'vitest';

import type { Input } from '../../src/main.js';

const ACTOR_ID = 'apify/example-store-actor';

describe('Large count runs', () => {
    testActor(ACTOR_ID, 'should handle run with 1000+ results', async ({ run, expect }) => {
        // Arrange
        const input: Input = { dataCount: 1000 };

        // Actor
        await run({ input });

        // Assert
        await expect.toFinishWith({ datasetItemCount: input.dataCount });
    });
});
