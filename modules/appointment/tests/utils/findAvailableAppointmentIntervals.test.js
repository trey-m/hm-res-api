import { expect, test, describe, it } from 'vitest';
import { findAvailableAppointmentIntervals } from '../../utils.js';

const f = {
  availability: [
    {
      id: 'd69cb354-2852-4b6a-88ea-91832914d9e9',
      providerId: '5dbfe0b4-1f5a-4f55-ac69-d4082fedf70a',
      date: '2024-08-26',
      startTime: '09:00',
      endTime: '11:00',
      timezone: 'America/New_York',
    },
  ],
  bookedSlots: [
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
  ],
  timezone: 'Americas/New_York',
  intervalMinutes: 15,
};

describe('findAvailableAppointmentIntervals', () => {
  it('No appointments, should return full 2 hour set (8 intervals)', async () => {
    const result = findAvailableAppointmentIntervals(f.availability, [], f.timezone, f.intervalMinutes);
    expect(result).toHaveLength(8);
  });

  it(`Should return 6 intervals due to 2 bookings`, async () => {
    const result = findAvailableAppointmentIntervals(f.availability, f.bookedSlots, f.timezone, f.intervalMinutes);
    expect(result).toHaveLength(6);
  });

  it('No available intervals, provider availability is all booked', () => {
    const restrictedAvailability = f.availability[0];
    restrictedAvailability.startTime = '9:15';
    restrictedAvailability.endTime = '9:30';

    const result = findAvailableAppointmentIntervals(
      [restrictedAvailability],
      f.bookedSlots,
      f.timezone,
      f.intervalMinutes
    );

    // Expecting no available intervals since the entire availability is booked
    expect(result).toHaveLength(0);
  });
});
