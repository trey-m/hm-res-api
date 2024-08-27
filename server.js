import Fastify from 'fastify';
import FastifyFormBody from '@fastify/formbody';
import Prisma from './prisma/index.js';

import availability from './modules/availability/index.js';
import appointment from './modules/appointment/index.js';

const server = Fastify({
  logger: {
    transport: {
      target: '@fastify/one-line-logger',
    },
  },
});

await server.register(FastifyFormBody);

server.setErrorHandler((error, request, reply) => {
  reply.status(error.statusCode || 500);

  reply.send({
    statusCode: error.statusCode || 500,
    message: error.message || 'Internal Server Error',
    stack: error.stack,
  });
});

server.addHook('onClose', async (f) => {
  await Prisma.$disconnect();
});

server.register(availability);
server.register(appointment);

await server.listen({ port: 3000 });
