import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  /** Kommaseparert liste over origins som får kalle API-et fra nettleser. */
  CORS_ORIGINS: z.string().default('http://localhost:8081'),
});

export type Config = z.infer<typeof EnvSchema>;

/** Leser og validerer miljøvariabler. Kaster en lesbar feil hvis noe er galt. */
export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const result = EnvSchema.safeParse(env);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join(', ');
    throw new Error(`Ugyldig konfigurasjon: ${details}`);
  }
  return result.data;
}
