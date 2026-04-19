import { build } from './app.js';

// ✅ แก้ไขค่า Default Port ตรงนี้ให้เป็น 3001
const PORT = process.env.PORT || 3001; 

 const isDevelopment = process.env.NODE_ENV !== 'production';
// เก็บ logic เดิมไว้คอมเมนต์เผื่ออยากกลับมาใช้
 const loggerConfig = isDevelopment
   ? { transport: { target: 'pino-pretty', options: { translateTime: 'HH:MM:ss Z', ignore: 'pid,hostname' } } }
  : true;

const start = async () => {
  // ✅ แก้ตรงนี้: ใส่ false ไปเลย เพื่อปิด Log ทุกอย่าง (CPU จะได้ว่างงานไปทำอย่างอื่น)
  const server = await build({
    logger: loggerConfig 
  });

  try {
    await server.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server is running on http://localhost:${PORT} (Logs Disabled)`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();