import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

// Development purposes
Prisma.$on('query', (e) => {
  console.log('Query: ' + e.query);
  console.log('Params: ' + e.params);
  console.log('Duration: ' + e.duration + 'ms');
});

export default Prisma;
