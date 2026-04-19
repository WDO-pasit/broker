import fp from 'fastify-plugin';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function dbPlugin(fastify, options) {
  const db = await open({
    filename: './data/database.sqlite', 
    driver: sqlite3.Database
  });

  // Create table if not exists
  await db.exec(`
    CREATE TABLE IF NOT EXISTS brokers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL,
      logo_url TEXT NOT NULL,
      website TEXT NOT NULL,
      broker_type TEXT CHECK(broker_type IN ('cfd', 'bond', 'stock', 'crypto')) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  fastify.decorate('db', db);
  fastify.addHook('onClose', (instance, done) => {
    instance.db.close().then(() => done());
  });
}

export default fp(dbPlugin);