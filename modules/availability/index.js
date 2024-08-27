import { availabilitySchema } from './schema.js';
import AvailabilityService from './service.js';

// ProviderId would be inferred from request
const providerId = '5dbfe0b4-1f5a-4f55-ac69-d4082fedf70a';

export default async (f, opts) => {
  f.post('/api/availability', { schema: availabilitySchema }, async (req, reply) => {
    const { date, startTime, endTime, timezone } = req.body;

    const dto = await AvailabilityService.add({ providerId, date, startTime, endTime, timezone });

    reply.code(201).send(dto);
  });
};
