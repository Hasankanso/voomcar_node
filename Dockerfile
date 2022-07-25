FROM node:current-alpine
COPY . /app
WORKDIR /app
RUN npm install --only=prod
ENTRYPOINT ["npm", "start"]
