const reservationBodySchema = {
  type: 'object',
  properties: {
    date: { type: 'string', pattern: '^20[0-2][0-9]-((0[1-9])|(1[0-2]))-(0[1-9]|[1-2][0-9]|3[0-1])$' },
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
