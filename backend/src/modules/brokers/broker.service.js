export class BrokerService {
  constructor(db) {
    this.db = db;
  }

  async createBroker(data) {
    const { name, slug, description, logo_url, website, broker_type } = data;
    
    // Check Unique Slug
    const existing = await this.db.get('SELECT id FROM brokers WHERE slug = ?', [slug]);
    if (existing) {
      const error = new Error('Slug นี้ถูกใช้งานแล้ว');
      error.statusCode = 409;
      throw error;
    }

    const result = await this.db.run(
      `INSERT INTO brokers (name, slug, description, logo_url, website, broker_type) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, slug, description, logo_url, website, broker_type]
    );

    return { id: result.lastID, ...data };
  }

  async getBrokers(query) {
    let sql = 'SELECT * FROM brokers WHERE 1=1';
    const params = [];

    if (query.search) {
      sql += ' AND name LIKE ?';
      params.push(`%${query.search}%`);
    }

    if (query.type && query.type !== 'all') {
      sql += ' AND broker_type = ?';
      params.push(query.type);
    }

    sql += ' ORDER BY created_at DESC';
    return await this.db.all(sql, params);
  }

  async getBrokerBySlug(slug) {
    const broker = await this.db.get('SELECT * FROM brokers WHERE slug = ?', [slug]);
    if (!broker) {
      const error = new Error('ไม่พบข้อมูล Broker');
      error.statusCode = 404;
      throw error;
    }
    return broker;
  }
}