import { reserveReservationSchema } from './schema.js';
import ReservationService from './service.js';

// Inferred from request
const clientId = '9989a47b-df3b-464f-97a7-656b3274fae2';

export default async (f, opts) => {
  f.post('/api/reservation', { schema: reserveReservationSchema }, async (req, reply) => {
    const { date, startTime, endTime, timezone, providerId } = req.body;

    const dto = await ReservationService.reserve({ date, startTime, endTime, timezone, providerId, clientId });

    reply.code(201).send(dto);
  });
};
