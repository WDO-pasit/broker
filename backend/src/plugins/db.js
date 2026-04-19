import fp from 'fastify-plugin';
import mysql from 'mysql2/promise';

/**
 * This plugin connects to the database
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector(fastify, options) {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Make the pool available on the fastify instance
    // สามารถเรียกใช้ผ่าน fastify.db หรือ this.db (ใน controller)
    fastify.decorate('db', pool);

    fastify.log.info('Database connection pool created successfully.');

    // Close the connection pool when the server shuts down
    fastify.addHook('onClose', (instance, done) => {
      instance.db.end(done);
      fastify.log.info('Database connection pool closed.');
    });

  } catch (err) {
    fastify.log.error('Failed to create database connection pool:', err);
    process.exit(1); // Exit if DB connection fails
  }
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fp(dbConnector);
