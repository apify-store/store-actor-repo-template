import { Router, type HttpCrawlingContext } from '@crawlee/cheerio';
import { RoutePokemonById } from './pokemon-id.js';

const router = Router.create<HttpCrawlingContext>();
router.addHandler(RoutePokemonById.label, RoutePokemonById.handler);

export { router };
