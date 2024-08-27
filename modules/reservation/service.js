import prisma from '../../prisma/index.js';
import { ReservationStatus } from '@prisma/client';

class ReservationService {
  async book({ date, startTime, endTime, timezone, providerId, clientId }) {
    const slotBooked = await prisma.reservation.findFirst({
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

    if (slotBooked) {
      const err = new Error();
      err.statusCode = 400;
      err.message = `Slot already booked for ${date} @ ${startTime}-${endTime}`;
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
        status: RESERVATION_STATUS.PENDING,
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
