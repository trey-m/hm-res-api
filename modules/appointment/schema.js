const appointmentSlotSchema = {
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

const getAvailableSlotsByRangeSchema = {
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
      startTime: { type: 'string', pattern: '^(?:[01]\\d|2[0-3]):[0-5]\\d$' },
      endTime: { type: 'string', pattern: '^(?:[01]\\d|2[0-3]):[0-5]\\d$' },
      timezone: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'array',
      items: appointmentSlotSchema,
    },
  },
};

export { getAvailableSlotsByRangeSchema };
