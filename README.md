# Broker Management System

ระบบสำหรับการจัดการและแสดงผลข้อมูล Broker โดยแบ่งโครงสร้างออกเป็นส่วนหน้าบ้าน (Frontend) และหลังบ้าน (Backend) ทำงานร่วมกับฐานข้อมูลแบบ Full-stack ผ่านระบบ Containerization ด้วย Docker เพื่อให้ง่ายต่อการติดตั้งและพัฒนา

## 🚀 Tech Stack

โปรเจกต์นี้เลือกใช้เทคโนโลยีที่ทันสมัยและตอบโจทย์การสเกลระบบในอนาคต:

**Frontend (หน้าบ้าน)**
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Project Structure:**
  * `app/`: จัดการ Layout และ Routing หลัก
  * `app/broker/`: หน้าแสดงผลและจัดการข้อมูล Broker
  * `service/api.ts`: จัดการการเรียกใช้งาน (Fetch) API ติดต่อกับหลังบ้าน
  * `types/broker.ts`: กำหนด Type Definitions ป้องกัน Error และจัดการโครงสร้างข้อมูล
* **Key Dependencies:**
  * `axios`: สำหรับยิง API Request ไปยัง Backend

**Backend (หลังบ้าน)**
* **Runtime:** Node.js (Fastify)
* **Core Files:** `app.js` (การตั้งค่าแอปพลิเคชัน), `server.js` (ตัวรันเซิร์ฟเวอร์)
* **Core Files:** `src/modules` พื้นที่สร้างงานแต่ละ Feature ปัจจจุบันมีของ Broker  `broker.controller.js`, `broker.routes.js`, `broker.schema.js`, `broker.service.js`
* **Key Dependencies:**
  * `fastify`: Web Framework ที่ขึ้นชื่อเรื่องความเร็วและใช้ทรัพยากรต่ำ
  * `@fastify/cors`: จัดการระบบ Cross-Origin Resource Sharing สำหรับคุยกับ Frontend
  * `@fastify/swagger`: ตัวช่วยสำหรับทำ API Documentation
  * `mysql2`: ไลบรารีสำหรับเชื่อมต่อและจัดการข้อมูลกับฐานข้อมูล MariaDB/MySQL


**Database & Infrastructure**
* **Database:** Relational Database (ทำงานผ่าน Container)
* **Containerization:** Docker & Docker Compose

---

## 🗄️ การตั้งค่าฐานข้อมูล (Database Setup)

ระบบฐานข้อมูลถูกตั้งค่าให้อยู่ในรูปแบบ Container 
* ฐานข้อมูลและ Table ต่างๆ จะถูก Initialize อัตโนมัติเมื่อรันระบบครั้งแรก
* มีการทำ Volume Mapping ไว้ใน `docker-compose.yml` ข้อมูลจะถูกเก็บไว้อย่างปลอดภัยในเครื่องของคุณ (Local) แม้จะทำการปิดหรือลบคอนเทนเนอร์ ข้อมูลก็จะไม่สูญหาย

---

## 🛠️ วิธีการติดตั้งและเริ่มต้นใช้งาน (Installation & Start Project)

โปรเจกต์นี้ออกแบบมาให้ไม่ต้องติดตั้ง Dependencies จุกจิกในเครื่อง เพียงแค่มี **Docker** ก็สามารถรันทั้งระบบได้ด้วยคำสั่งเดียว

**สิ่งที่ต้องมี (Prerequisites):**
* ติดตั้ง [Docker Desktop](https://www.docker.com/products/docker-desktop/) ในเครื่องให้เรียบร้อย

**คำสั่งสำหรับรันโปรเจกต์:**
1. เปิด Terminal แล้วเข้าไปที่โฟลเดอร์หลัก (Root) ของโปรเจกต์
2. รันคำสั่งด้านล่างนี้เพื่อ Build และ Start คอนเทนเนอร์ทั้งหมด (Frontend, Backend, Database):

```bash
docker-compose up -d --build