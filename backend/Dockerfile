FROM node:20-alpine
# ลง tools ที่จำเป็นสำหรับ SQLite
RUN apk add --no-cache python3 make g++

WORKDIR /app

# ก๊อปปี้แค่ package.json มาลง dependencies ก่อน
COPY package*.json ./
RUN npm install

# ไม่ต้อง COPY โค้ดทั้งหมด เพราะเราจะใช้ Volumes โยงเข้าไปแทน
EXPOSE 3001

# รันโหมด dev (ใช้ --watch ตามที่มีใน package.json)
CMD ["npm", "run", "dev"]