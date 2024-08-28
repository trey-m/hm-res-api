import { parseISO, addMinutes, format, isAfter, isBefore, isEqual } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

function parseDateTime(dateStr, timeStr, timezone) {
  return timezone
    ? toZonedTime(parseISO(`${dateStr}T${timeStr}:00Z`, timezone))
    : parseISO(`${dateStr}T${timeStr}:00Z`);
}

// Helper function to create intervals
function createIntervals(start, end, intervalMinutes) {
  let intervals = [];
  let current = start;
  while (isBefore(current, end)) {
    const next = addMinutes(current, intervalMinutes);
    if (isBefore(next, end) || isEqual(next, end)) {
      intervals.push({ start: current, end: next });
    }
    current = next;
  }

  return intervals;
}

// Helper function to check if an interval overlaps with any reserved slot
function isReserved(interval, reservations, timezone, providerId) {
  const bookings = reservations.some((slot) => {
    const bookedStart = parseDateTime(slot.date, slot.startTime, timezone);
    const bookedEnd = parseDateTime(slot.date, slot.endTime, timezone);
    return isBefore(interval.start, bookedEnd) && isAfter(interval.end, bookedStart) && slot.providerId === providerId;
  });

  return bookings;
}

function findAvailableAppointmentIntervals(availability, reservations, timezone = null, intervalMinutes = 15) {
  let availableAppointmentIntervals = [];

  // Process each availability slot
  availability.forEach((slot) => {
    // Parse the start and end times for the availability slot
    const availabilityStart = parseDateTime(slot.date, slot.startTime, timezone);
    const availabilityEnd = parseDateTime(slot.date, slot.endTime, timezone);

    // Generate all possible intervals
    const allIntervals = createIntervals(availabilityStart, availabilityEnd, intervalMinutes);

    allIntervals.forEach((interval) => {
      const isWithinBounds =
        isAfter(interval.start, availabilityStart) ||
        (isEqual(interval.start, availabilityStart) && isBefore(interval.end, availabilityEnd)) ||
        isEqual(interval.end, availabilityEnd);

      if (isWithinBounds && !isReserved(interval, reservations, timezone, slot.providerId)) {
        availableAppointmentIntervals.push({
          startDate: format(interval.start, 'yyyy-MM-dd'),
          endDate: format(interval.end, 'yyyy-MM-dd'),
          startTime: format(interval.start, 'HH:mm'),
          endTime: format(interval.end, 'HH:mm'),
          providerId: slot.providerId,
          timezone: timezone,
        });
      }
    });
  });

  return availableAppointmentIntervals;
}

export { findAvailableAppointmentIntervals };
