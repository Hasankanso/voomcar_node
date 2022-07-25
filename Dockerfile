FROM node:18.6.0-alpine3.15
COPY . /app
WORKDIR /app
RUN npm install --only=prod
ENTRYPOINT ["npm", "start"]
