FROM node:12.18.3-alpine3.10
ENV NPM_CONFIG_LOGLEVEL notice
ENV CHOKIDAR_USEPOLLING true
WORKDIR /home/node/app
COPY package.json package.json
RUN npm install
COPY . .
EXPOSE 8085
CMD ["npm", "start"]
