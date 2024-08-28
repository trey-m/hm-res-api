export default function (overrides = {}, firstOnly = false) {
  const data = [
    {
      id: '791972be-8dbf-4761-825a-e605e2e84e74',
      clientId: '9989a47b-df3b-464f-97a7-656b3274fae2',
      providerId: '5dbfe0b4-1f5a-4f55-ac69-d4082fedf70a',
      date: '2024-08-26',
      startTime: '09:15',
      endTime: '09:30',
      timezone: 'America/New_York',
      status: 'PENDING',
      createdAt: '2024-08-26T16:51:11.448Z',
      updatedAt: null,
      ...overrides,
    },
    {
      id: '30c3fc11-c062-4986-8d3f-57cfb72b457d',
      clientId: '9989a47b-df3b-464f-97a7-656b3274fae2',
      providerId: '5dbfe0b4-1f5a-4f55-ac69-d4082fedf70a',
      date: '2024-08-26',
      startTime: '10:30',
      endTime: '10:45',
      timezone: 'America/New_York',
      status: 'PENDING',
      createdAt: '2024-08-26T16:51:11.448Z',
      updatedAt: null,
    },
  ];

  return firstOnly ? data[0] : data;
}
