FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


ENV APP_HOST=0.0.0.0
ENV APP_PORT=3001

ENV MULTER_UPLOADS_TEMP_DIR=./multer_temp

ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_NAME=tapdb
ENV DB_USER=postgres
ENV DB_PASS=postgres


RUN yarn run build

EXPOSE 12000

CMD ["node", "dist/main"]l