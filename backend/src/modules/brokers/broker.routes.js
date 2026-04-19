import { BrokerController } from './broker.controller.js';
import { BrokerService } from './broker.service.js';
import { brokerSchemas } from './broker.schema.js';

export default async function brokerRoutes(fastify, options) {
  const brokerService = new BrokerService(fastify.db);
  const brokerController = new BrokerController(brokerService);

  fastify.post('/', { schema: brokerSchemas.create }, brokerController.createHandler.bind(brokerController));
  fastify.get('/', { schema: brokerSchemas.list }, brokerController.listHandler.bind(brokerController));
  fastify.get('/:slug', brokerController.getDetailHandler.bind(brokerController));
}