const createAvailabilitySchema = {
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

const availabilitySchema = {
  body: {
    type: 'object',
    required: ['date', 'startTime', 'endTime', 'timezone'],
    properties: {
      date: {
        type: 'string',
        // Fine approach but would be nice to let the client know a human readable format to input
        pattern: '^20[0-2][0-9]-((0[1-9])|(1[0-2]))-(0[1-9]|[1-2][0-9]|3[0-1])$',
      },
      // Add validations for these fields
      startTime: { type: 'string' },
      endTime: { type: 'string' },
      timezone: { type: 'string' },
    },
  },
  response: {
    201: createAvailabilitySchema,
  },
};

export { availabilitySchema };
