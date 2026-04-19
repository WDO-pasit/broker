export class BrokerService {
  constructor(db) {
    this.db = db;
  }

  async createBroker(data) {
    const { name, slug, description, logo_url, website, broker_type } = data;
    
    // Check Unique Slug
    // เปลี่ยนจาก .get() เป็น .execute() แล้วเช็คว่ามีข้อมูลใน Array หรือไม่
    const [existingRows] = await this.db.execute('SELECT id FROM brokers WHERE slug = ?', [slug]);
    if (existingRows.length > 0) {
      const error = new Error('Slug นี้ถูกใช้งานแล้ว');
      error.statusCode = 409;
      throw error;
    }

    // เปลี่ยนจาก .run() เป็น .execute()
    const [result] = await this.db.execute(
      `INSERT INTO brokers (name, slug, description, logo_url, website, broker_type) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, slug, description, logo_url, website, broker_type]
    );

    // ของ MySQL จะใช้ result.insertId แทน result.lastID ครับ
    return { id: result.insertId, ...data };
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
    
    // เปลี่ยนจาก .all() เป็น .query() แล้วครอบ [rows] เพื่อเอาแต่ข้อมูล
    const [rows] = await this.db.query(sql, params);
    return rows;
  }

  async getBrokerBySlug(slug) {
    // เปลี่ยนจาก .get() เป็น .execute()
    const [rows] = await this.db.execute('SELECT * FROM brokers WHERE slug = ?', [slug]);
    
    // .execute() ส่งกลับมาเป็น Array เสมอ เราเลยต้องเอาตำแหน่งที่ [0] มาใช้
    const broker = rows[0]; 

    if (!broker) {
      const error = new Error('ไม่พบข้อมูล Broker');
      error.statusCode = 404;
      throw error;
    }
    return broker;
  }
}