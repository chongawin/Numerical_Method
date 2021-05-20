FROM node:15-alpine
# node run บนรีนุค version 15-alpine
WORKDIR /app
# สร้าง directior+ทำงานใน(cd /app) /app
COPY package*.json ./
#copy package*.json ลง /app
RUN npm i
#install node 
COPY . ./
#ก็อปทุกอย่างในงานลง /app
CMD ["npm","start"]
