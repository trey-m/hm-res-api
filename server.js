import Fastify from 'fastify';
import FastifyFormBody from '@fastify/formbody';
import FastifySqlite from 'fastify-sqlite';

const server = Fastify({
  logger: {
    transport: {
      target: '@fastify/one-line-logger',
    },
  },
});

await server.register(FastifyFormBody);

await server.register(FastifySqlite, {
  promiseApi: true,
  verbose: true,
  dbFile: 'storage.db',
  name: 'store',
});

// Seed
// await server.sqlite.store.exec(
//   'CREATE TABLE IF NOT EXISTS provider_availabilities (id INTEGER PRIMARY KEY, providerId TEXT NOT NULL, date TEXT NOT NULL, startTime TEXT NOT NULL, endTime TEXT NOT NULL, timezone TEXT NOT NULL)'
// );

// await server.sqlite.store.exec(
//   'CREATE TABLE IF NOT EXISTS reservations (id UUID, providerId TEXT NOT NULL, clientId TEXT NOT NULL, date TEXT NOT NULL, startTime TEXT NOT NULL, endTime TEXT NOT NULL, timezone TEXT NOT NULL, status TEXT DEFAULT "PENDING")'
// );

// const seed = async () => {
//   await server.sqlite.store.run(
//     'INSERT into provider_availabilities (providerId, date, startTime, endTime, timezone) VALUES (:providerId, :date, :startTime, :endTime, :timezone)',
//     {
//       ':providerId': '5dbfe0b4-1f5a-4f55-ac69-d4082fedf70a',
//       ':date': '2024-08-20',
//       ':startTime': '09:00',
//       ':endTime': '17:00',
//       ':timezone': 'American/New_York',
//     }
//   );
// };

// await seed();

const availabilityService = {
  add: async ({ providerId, date, startTime, endTime, timezone }) => {
    return server.sqlite.store.run(
      'INSERT into provider_availabilities (providerId, date, startTime, endTime, timezone) VALUES (:providerId, :date, :startTime, :endTime, :timezone)',
      {
        ':providerId': providerId,
        ':date': date,
        ':startTime': startTime,
        ':endTime': endTime,
        ':timezone': timezone,
      }
    );
  },
};

const RESERVATION_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
};

const reservationService = {
  confirm: async ({ reservationId }) => {
    return server.sqlite.store.all(
      'UPDATE reservations SET status = ? WHERE id = ?',
      RESERVATION_STATUS.CONFIRMED,
      reservationId
    );
  },
};

// Fastify has a request level Hook system => https://fastify.dev/docs/latest/Reference/Hooks/
// We would create a new `preHandler` hook to support authn/authz checks which which would happen prior to
// the request landing on the handler

// Fastify has a built in schema validator using AJV internally => https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/#validation
// We would create a validation schema for all routes.
// These schemas can be shared across routes, and can be easily parsed into OpenAPI docs

// Provider adds availability
// Note: The submitted startTime and endTime from providers should be wall time / localtime
server.post('/api/availability', async (req, reply) => {
  const { date, startTime, endTime, timezone } = req.body;

  // ProviderId would be inferred from some type of access/id token
  const providerId = '5dbfe0b4-1f5a-4f55-ac69-d4082fedf70a';

  await availabilityService.add({ providerId, date, startTime, endTime, timezone });

  reply.send({ success: 'OK' });
});

// Client gets appointment availability
// Note: Only return availability that is at least 24hrs in the future
// Note: Appointment availability should be any appointments within the submitted timeframe
// and has at least 1 availability
server.get('/api/appointment', async (req, reply) => {
  const { startDate, endDate, startTime, endTime, timezone } = req.query;

  // Inputs would be passed to these layers
  // const providerAvailability = await providerService.getProviderAvailability();
  // const getReservationsByTimeframe = await reservationService.getReservationsByTimeframe();

  // Grab availability and reservations both by the inputted timeframes
  // Need to expand on this query more but would follow this pattern
  // ----- select * from reservations where status = pending | confirmed and startTime <= request.startTime && endTime >= request.endTime

  const getProviderAvailability = await server.sqlite.store.all(
    'SELECT * from provider_availabilities WHERE DATE(date) BETWEEN ? AND ? AND startTime >= ? AND endTime <= ?',
    startDate,
    endDate,
    startTime,
    endTime
  );

  reply.send(getProviderAvailability);
});

// Client books reservation
server.post('/api/reservation', async (req, reply) => {
  // Reservations being booked will support an array in the event
  // multiple reservations at once will need to be supported
  const { appointments } = req.body;

  // Note: The submitted startTime and endTime from clients should be wall time / localtime
  // due to being future dates daylight savings times can cause potential bugs
  // appointments:
  // [
  //   {
  //     providerId: ...,
  //     date: ...,
  //     startTimeEpoch: ...,
  //     endTimeEpoch: ...
  //   }
  // ]

  // ClientID would be inferred from some type of access/id token
  // call into service layer with appointments and create new reservations

  // Check if reservation is still available (since another client could reserve while you go through the process)
  reply.send({ success: 'OK' });
});

// Client takes action to confirm reservation
// Could be a PUT here..
server.post('/api/reservation/confirm', async (req, reply) => {
  // If reservation expires and a confirm is attempted, what should happen?
  const { reservationId } = req.body;

  await reservationService.confirm({ reservationId });

  reply.send({ success: 'OK' });
});

await server.listen({ port: 3000 });
