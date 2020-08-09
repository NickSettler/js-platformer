FROM node:12.18.3-alpine3.10
ENV NPM_CONFIG_LOGLEVEL notice
WORKDIR /home/node/app
COPY package.json package.json
RUN npm install
COPY . .
EXPOSE 8082
CMD ["npm", "start"]
