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

  it('should respond to POST /api/reservation', async () => {
    const createPayload = {
      id: 'd69cb354-2852-4b6a-88ea-91832914d9e9',
      date: '2024-08-26',
      startTime: '09:00',
      endTime: '09:15',
      timezone: 'America/New_York',
      providerId: 'UUID',
    };

    const createdResponse = {
      id: 'd69cb354-2852-4b6a-88ea-91832914d9e9',
      date: '2024-08-26',
      startTime: '09:00',
      endTime: '09:15',
      timezone: 'America/New_York',
      providerId: 'UUID',
    };

    Prisma.reservation.findFirst.mockResolvedValue(null);
    Prisma.reservation.create.mockResolvedValue(createdResponse);

    const response = await fastify.inject({
      method: 'POST',
      url: '/api/reservation',
      payload: createPayload,
    });
    expect(response.statusCode).toBe(201);
  });
});
