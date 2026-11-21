import { buildApp } from './app';
import { createFlightService } from './avinor/flightService';
import { loadConfig } from './config';

const config = loadConfig();
const app = buildApp(config, { findFlight: createFlightService().findFlight });

try {
  await app.listen({ host: config.HOST, port: config.PORT });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    void app.close().then(() => process.exit(0));
  });
}
