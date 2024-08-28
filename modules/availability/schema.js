const availabilityCreatedDTO = {
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

const addAvailabilitySchema = {
  body: {
    type: 'object',
    required: ['date', 'startTime', 'endTime', 'timezone'],
    properties: {
      date: {
        type: 'string',
        pattern: '^20[0-2][0-9]-((0[1-9])|(1[0-2]))-(0[1-9]|[1-2][0-9]|3[0-1])$',
      },
      startTime: { type: 'string', pattern: '^(?:[01]\\d|2[0-3]):[0-5]\\d$' },
      endTime: { type: 'string', pattern: '^(?:[01]\\d|2[0-3]):[0-5]\\d$' },
      timezone: { type: 'string' },
    },
  },
  response: {
    201: availabilityCreatedDTO,
  },
};

export { addAvailabilitySchema };
