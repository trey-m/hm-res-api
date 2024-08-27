import prisma from '../../prisma/index.js';
import { ReservationStatus } from '@prisma/client';

class ReservationService {
  async reserve({ date, startTime, endTime, timezone, providerId, clientId }) {
    const slotReserved = await prisma.reservation.findFirst({
      where: {
        status: {
          in: [ReservationStatus.PENDING, ReservationStatus.COMPLETED],
        },
        AND: [
          {
            date: {
              equals: date,
            },
          },
          {
            startTime: {
              equals: startTime,
            },
          },
          {
            endTime: {
              equals: endTime,
            },
          },
          {
            providerId: {
              equals: providerId,
            },
          },
        ],
      },
    });

    if (slotReserved) {
      const err = new Error();
      err.statusCode = 400;
      err.message = `Time slot already reserved for ${date} @ ${startTime}-${endTime}`;
      throw err;
    }

    const create = await prisma.reservation.create({
      data: {
        date,
        startTime,
        endTime,
        timezone,
        providerId,
        clientId,
        status: ReservationStatus.PENDING,
      },
      select: {
        id: true,
        providerId: true,
        date: true,
        startTime: true,
        endTime: true,
        timezone: true,
      },
    });

    const DTO = {
      id: create.id,
      date: create.date,
      startTime: create.startTime,
      endTime: create.endTime,
      timezone: create.timezone,
      providerId: create.providerId,
    };

    return DTO;
  }
}

export default new ReservationService();
