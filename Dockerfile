FROM node:15-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . ./
RUN npm run build
CMD ["npm","start"]
