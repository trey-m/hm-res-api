import { expect, describe, it } from 'vitest';
import { findAvailableAppointmentIntervals } from '../../utils.js';
import providerAvailabilityFixture from './providerAvailabilityFixture.js';
import reservationFixture from './reservationFixture.js';

const TZ = 'America/New_York';
const intervalMinutes = 15;

describe('findAvailableAppointmentIntervals', () => {
  it('No appointments, should return full 2 hour set (8 intervals)', () => {
    const result = findAvailableAppointmentIntervals(providerAvailabilityFixture(), [], TZ, intervalMinutes);
    expect(result).toHaveLength(8);
  });

  it(`Should return 6 intervals due to 2 appointments`, () => {
    const result = findAvailableAppointmentIntervals(
      providerAvailabilityFixture(),
      reservationFixture(),
      TZ,
      intervalMinutes
    );
    expect(result).toHaveLength(6);
  });

  it('No available intervals, provider availability is all reserved', () => {
    const result = findAvailableAppointmentIntervals(
      providerAvailabilityFixture({ startTime: '09:15', endTime: '09:30' }),
      reservationFixture(),
      TZ,
      intervalMinutes
    );

    // Expecting no available intervals since the entire availability is reserved
    expect(result).toHaveLength(0);
  });

  it(`Ensure edges are accurate and return surrounding reservation slots`, () => {
    // If availability = 9:00-9:45 and there is 1 reservation at 9:15-9:30
    // We should return only 2 available slots, 9:00-9:15 and 9:30-9:45
    const result = findAvailableAppointmentIntervals(
      providerAvailabilityFixture({ startTime: '09:00', endTime: '09:45' }),
      reservationFixture(),
      TZ,
      intervalMinutes
    );

    expect(result[0].startTime).toEqual('09:00');
    expect(result[0].endTime).toEqual('09:15');

    expect(result[1].startTime).toEqual('09:30');
    expect(result[1].endTime).toEqual('09:45');

    expect(result).toHaveLength(2);
  });

  it(`Should return 6 intervals due to 2 appointments WITHOUT timezone`, () => {
    const result = findAvailableAppointmentIntervals(
      providerAvailabilityFixture(),
      reservationFixture(),
      null,
      intervalMinutes
    );

    expect(result[0].startTime).toEqual('05:00');
    expect(result[0].endTime).toEqual('05:15');

    expect(result).toHaveLength(6);
  });
});
