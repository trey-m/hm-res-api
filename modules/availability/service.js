import prisma from '../../prisma/index.js';

class AvailabilityService {
  async add({ providerId, date, startTime, endTime, timezone }) {
    const existingAvailability = await prisma.providerAvailability.findFirst({
      where: {
        providerId: {
          equals: providerId,
        },
        date: {
          equals: date,
        },
      },
    });

    if (existingAvailability) {
      const err = new Error();
      err.statusCode = 400;
      err.message = `Availability already exists for: ${date}`;
      throw err;
    }

    const create = await prisma.providerAvailability.create({
      data: {
        providerId,
        date,
        startTime,
        endTime,
        timezone,
      },
      select: {
        providerId: true,
        date: true,
        startTime: true,
        endTime: true,
        timezone: true,
      },
    });

    const DTO = {
      providerId: create.providerId,
      date: create.date,
      startTime: create.startTime,
      endTime: create.endTime,
      timezone: create.timezone,
    };

    return DTO;
  }
}

export default new AvailabilityService();
