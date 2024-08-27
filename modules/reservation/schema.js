const reservationBodySchema = {
  type: 'object',
  properties: {
    date: { type: 'string' },
    startTime: { type: 'string' },
    endTime: { type: 'string' },
    timezone: { type: 'string' },
    providerId: { type: 'string' },
  },
  required: ['date', 'startTime', 'endTime', 'timezone', 'providerId'],
};

const reservationSchema = {
  body: reservationBodySchema,
};

export { reservationSchema };
