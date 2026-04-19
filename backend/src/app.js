import Fastify from 'fastify';
import cors from '@fastify/cors';
import dbPlugin from './plugins/db.js';
import brokerRoutes from './modules/brokers/broker.routes.js';

export async function build(opts = {}) {
  const fastify = Fastify(opts);

  await fastify.register(cors, { origin: '*' }); // ปรับแก้ Origin ตาม Environment จริง
  await fastify.register(dbPlugin);
  
  await fastify.register(brokerRoutes, { prefix: '/api/brokers' });

  return fastify;
}