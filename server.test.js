import { describe, it, expect, vi, beforeEach } from 'vitest';
import Prisma from './prisma';
import { app } from './server';
import reservationFixture from './modules/appointment/tests/utils/reservationFixture';
import providerAvailabilityFixture from './modules/appointment/tests/utils/providerAvailabilityFixture';

const fastify = await app({});

vi.mock('./prisma/index.js', () => ({
  default: {
    reservation: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    providerAvailability: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Route Tests', () => {
  it('should respond to GET /api/appointment', async () => {
    Prisma.providerAvailability.findMany.mockResolvedValue(providerAvailabilityFixture());
    Prisma.reservation.findMany.mockResolvedValue(reservationFixture());

    const response = await fastify.inject({
      method: 'GET',
      url: '/api/appointment',
      query: {
        startDate: '2024-08-26',
        endDate: '2024-08-26',
        startTime: '09:00',
        endTime: '17:00',
        timezone: 'America/New_York',
      },
    });

    expect(response.statusCode).toBe(200);
  });

  it('should respond to POST /api/availability', async () => {
    const createPayload = {
      date: '2024-08-26',
      startTime: '09:00',
      endTime: '11:00',
      timezone: 'America/New_York',
      providerId: 'UUID',
    };

    Prisma.providerAvailability.findFirst.mockResolvedValue(null);
    Prisma.providerAvailability.create.mockResolvedValue(createPayload);

    const response = await fastify.inject({
      method: 'POST',
      url: '/api/availability',
      payload: createPayload,
    });
    expect(response.statusCode).toBe(201);
  });
});
