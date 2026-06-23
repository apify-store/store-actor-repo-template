import type { Actor } from 'apify';

export const pushDataCountToDataset = async (options: { count: number; actor: typeof Actor }) => {
    const { count, actor } = options;
    const data = Array.from({ length: count }, (_, i) => ({ id: i }));

    await actor.pushData(data);
};
