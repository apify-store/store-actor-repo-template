import type { Actor } from 'apify';
import { describe, expect, it, vi } from 'vitest';

import { pushDataCountToDataset } from '../../src/push-data.js';

describe('pushDataCountToDataset()', () => {
    it('push the provided data count to the dataset', async () => {
        // Arrange
        const count = 3;
        const mockActor = { pushData: vi.fn() as Actor['pushData'] } as typeof Actor;

        // Act
        await pushDataCountToDataset({ count, actor: mockActor });

        // Assert
        expect(mockActor.pushData).toHaveBeenCalledExactlyOnceWith([{ id: 0 }, { id: 1 }, { id: 2 }]);
    });
});
