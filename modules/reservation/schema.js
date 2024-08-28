const reservationCreatedDTO = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    date: { type: 'string' },
    startTime: { type: 'string' },
    endTime: { type: 'string' },
    timezone: { type: 'string' },
    providerId: { type: 'string' },
  },
  required: ['id', 'date', 'startTime', 'endTime', 'timezone', 'providerId'],
};

const reserveReservationSchema = {
  body: {
    type: 'object',
    properties: {
      date: { type: 'string', pattern: '^20[0-2][0-9]-((0[1-9])|(1[0-2]))-(0[1-9]|[1-2][0-9]|3[0-1])$' },
      startTime: { type: 'string' },
      endTime: { type: 'string' },
      timezone: { type: 'string' },
      providerId: { type: 'string' },
    },
    required: ['date', 'startTime', 'endTime', 'timezone', 'providerId'],
  },
  response: {
    201: reservationCreatedDTO,
  },
};

export { reserveReservationSchema };
