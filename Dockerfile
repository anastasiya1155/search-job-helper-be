FROM node:10
COPY package.json package-lock.json ./
RUN npm i --production
COPY . ./
CMD ["node", "./server/index.js"]
