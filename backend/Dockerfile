FROM node:latest
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm install -g ts-node
EXPOSE 4000
CMD ["npm", "start"]