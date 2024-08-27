import { appointmentSchema } from './schema.js';
import AppointmentService from './service.js';

export default async (f, opts) => {
  f.get('/api/appointment', { schema: appointmentSchema }, async (req, reply) => {
    const { startDate, endDate, startTime, endTime, timezone } = req.query;

    const dto = await AppointmentService.availableSlotsByRange({
      startDate,
      endDate,
      startTime,
      endTime,
      timezone,
    });

    reply.send(dto);
  });
};
