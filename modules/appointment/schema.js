const slotSchema = {
  type: 'object',
  properties: {
    startDate: { type: 'string' },
    endDate: { type: 'string' },
    startTime: { type: 'string' },
    endTime: { type: 'string' },
    timezone: { type: 'string' },
    providerId: { type: 'string' },
  },
  required: ['startDate', 'endDate', 'startTime', 'endTime', 'timezone', 'providerId'],
};

const appointmentSchema = {
  querystring: {
    type: 'object',
    required: ['startDate', 'endDate', 'startTime', 'endTime', 'timezone'],
    properties: {
      startDate: {
        type: 'string',
        pattern: '^20[0-2][0-9]-((0[1-9])|(1[0-2]))-(0[1-9]|[1-2][0-9]|3[0-1])$',
      },
      endDate: {
        type: 'string',
        pattern: '^20[0-2][0-9]-((0[1-9])|(1[0-2]))-(0[1-9]|[1-2][0-9]|3[0-1])$',
      },
      // Add validations for these fields
      startTime: { type: 'string' },
      endTime: { type: 'string' },
      timezone: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'array',
      items: slotSchema,
    },
  },
};

export { appointmentSchema };
