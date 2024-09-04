import Fastify from 'fastify';
import FastifyFormBody from '@fastify/formbody';
import Prisma from './prisma/index.js';

import availability from './modules/availability/index.js';
import appointment from './modules/appointment/index.js';
import reservation from './modules/reservation/index.js';

export const app = async (opts) => {
  const f = Fastify(opts);

  await f.register(FastifyFormBody);

  f.setErrorHandler((error, request, reply) => {
    reply.status(error.statusCode || 500);

    reply.send({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
      stack: error.stack,
    });
  });

  f.addHook('onClose', async (f) => {
    await Prisma.$disconnect();
  });

  f.register(availability);
  f.register(appointment);
  f.register(reservation);

  return f;
};

async function startServer() {
  let server;
  const PORT = 3000;
  const HOST = '0.0.0.0';
  try {
    server = await app({
      logger: {
        transport: {
          target: '@fastify/one-line-logger',
        },
      },
    });

    await server.listen({ port: PORT, host: HOST });
    server.log.info(`🚀 Reservation Service Online on port: ${PORT}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

await startServer();
