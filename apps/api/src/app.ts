import Fastify, { type FastifyInstance } from 'fastify';

import type { Config } from './config';

export interface HealthResponse {
  status: 'ok';
  uptimeSeconds: number;
}

/** Bygger API-et uten å starte det, slik at testene kan bruke det direkte. */
export function buildApp(config: Pick<Config, 'NODE_ENV' | 'CORS_ORIGINS'>): FastifyInstance {
  const app = Fastify({
    logger: config.NODE_ENV === 'test' ? false : { level: 'info' },
  });

  const allowedOrigins = new Set(
    config.CORS_ORIGINS.split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  );

  app.addHook('onRequest', async (request, reply) => {
    const origin = request.headers.origin;
    if (origin && allowedOrigins.has(origin)) {
      reply.header('Access-Control-Allow-Origin', origin);
      reply.header('Vary', 'Origin');
    }
  });

  app.get('/health', async (): Promise<HealthResponse> => {
    return { status: 'ok', uptimeSeconds: Math.round(process.uptime()) };
  });

  app.setNotFoundHandler(async (request, reply) => {
    return reply.code(404).send({ error: 'not_found', message: `Fant ikke ${request.url}` });
  });

  app.setErrorHandler(async (error, request, reply) => {
    request.log.error(error);
    const statusCode =
      typeof error === 'object' && error !== null && 'statusCode' in error
        ? Number(error.statusCode)
        : 500;
    return reply.code(statusCode >= 400 ? statusCode : 500).send({
      error: statusCode < 500 ? 'bad_request' : 'internal_error',
      message: statusCode < 500 ? 'Ugyldig forespørsel' : 'Noe gikk galt på serveren',
    });
  });

  return app;
}
