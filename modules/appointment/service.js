import prisma from '../../prisma/index.js';
import { RESERVATION_STATUS } from '../reservation/constants.js';
import { findAvailableAppointmentIntervals } from './utils.js';

class AppointmentService {
  async availableSlotsByRange({ startDate, endDate, startTime, endTime, timezone }) {
    const providerAvailabilityByRange = await prisma.providerAvailability.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
        startTime: {
          gte: startTime,
        },
        endTime: {
          lte: endTime,
        },
      },
    });

    const reservationsByRange = await prisma.reservation.findMany({
      where: {
        status: {
          in: [RESERVATION_STATUS.PENDING, RESERVATION_STATUS.CONFIRMED],
        },
        date: {
          gte: startDate,
          lte: endDate,
        },
        startTime: {
          gte: startTime,
        },
        endTime: {
          lte: endTime,
        },
      },
    });

    const availableSlots = findAvailableAppointmentIntervals(
      providerAvailabilityByRange,
      reservationsByRange,
      timezone
    );

    const DTO = availableSlots;

    return DTO;
  }
}

export default new AppointmentService();
