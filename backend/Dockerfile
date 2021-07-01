FROM node:latest
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm install -g ts-node
ENV NODE_ENV=production
EXPOSE 4000
CMD ["npm", "start"]