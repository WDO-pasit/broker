export class BrokerController {
  constructor(brokerService) {
    this.brokerService = brokerService;
  }

  async createHandler(request, reply) {
    try {
      const broker = await this.brokerService.createBroker(request.body);
      reply.code(201).send({ message: 'สร้าง Broker สำเร็จ', data: broker });
    } catch (error) {
      request.log.error(error);
      reply.code(error.statusCode || 500).send({ message: error.message || 'Internal Server Error' });
    }
  }

  async listHandler(request, reply) {
    try {
      const brokers = await this.brokerService.getBrokers(request.query);
      reply.code(200).send({ data: brokers });
    } catch (error) {
      reply.code(500).send({ message: 'Internal Server Error' });
    }
  }

  async getDetailHandler(request, reply) {
    try {
      const broker = await this.brokerService.getBrokerBySlug(request.params.slug);
      reply.code(200).send({ data: broker });
    } catch (error) {
      reply.code(error.statusCode || 500).send({ message: error.message });
    }
  }
}