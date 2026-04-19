FROM node:20-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./
RUN npm install

EXPOSE 3000

# รันโหมด dev ของ Next.js (มี Hot Reload ในตัว)
CMD ["npm", "run", "dev"]