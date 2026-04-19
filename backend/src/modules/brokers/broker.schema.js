export const brokerSchemas = {
  create: {
    body: {
      type: 'object',
      required: ['name', 'slug', 'description', 'logo_url', 'website', 'broker_type'],
      properties: {
        name: { type: 'string' },
        slug: { type: 'string', pattern: '^[a-z0-9-]+$' }, // Validation: lowercase alphanumeric and hyphens
        description: { type: 'string' },
        logo_url: { type: 'string' },
        website: { type: 'string' },
        broker_type: { type: 'string', enum: ['cfd', 'bond', 'stock', 'crypto'] }
      }
    }
  },
  list: {
    querystring: {
      type: 'object',
      properties: {
        search: { type: 'string' },
        type: { type: 'string', enum: ['all', 'cfd', 'bond', 'stock', 'crypto'] }
      }
    }
  }
};