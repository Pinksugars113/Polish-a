import { z } from 'zod';
import { insertPolishSchema, polishes } from './schema';

export const api = {
  polishes: {
    list: {
      method: 'GET' as const,
      path: '/api/polishes',
      responses: {
        200: z.array(z.custom<typeof polishes.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/polishes',
      input: insertPolishSchema,
      responses: {
        201: z.custom<typeof polishes.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/polishes/:id',
      input: insertPolishSchema.partial(),
      responses: {
        200: z.custom<typeof polishes.$inferSelect>(),
        400: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/polishes/:id',
      responses: {
        204: z.void(),
        404: z.object({ message: z.string() }),
      },
    },
    match: {
      method: 'POST' as const,
      path: '/api/match',
      input: z.object({
        image: z.string(), // Base64 data URL
      }),
      responses: {
        200: z.array(z.custom<typeof polishes.$inferSelect>()),
        500: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
