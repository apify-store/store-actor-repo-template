import type { HttpCrawlingContext, RequestHandler, RequestOptions } from '@crawlee/cheerio';
import { Routes } from './types.js';

import z from 'zod';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

const pokeApiResponseSchema = z.looseObject({
    id: z.number(),
    name: z.string(),
    height: z.number(),
    weight: z.number(),
    base_experience: z.number().nullable(),
    types: z.array(z.looseObject({ type: z.looseObject({ name: z.string() }) })),
    abilities: z.array(z.looseObject({ ability: z.looseObject({ name: z.string() }) })),
    stats: z.array(z.looseObject({ base_stat: z.number(), stat: z.looseObject({ name: z.string() }) })),
    sprites: z.looseObject({
        front_default: z.string().nullable(),
        front_shiny: z.string().nullable(),
    }),
});

const createRequest = (identifier: string): RequestOptions<{ id: string }> => {
    const id = identifier.trim().toLowerCase();

    return {
        url: `${POKEAPI_BASE_URL}/pokemon/${id}`,
        label: Routes.POKEMON_ID,
        userData: { id },
    };
};

const handler: RequestHandler<HttpCrawlingContext<{ id: string }>> = async ({ json, pushData }) => {
    const pokemon = pokeApiResponseSchema.parse(json);
    await pushData(pokemon);
};

export const RoutePokemonById = { label: Routes.POKEMON_ID, handler, createRequest };
