FROM node:latest
WORKDIR /app
ADD ./package.json /app
RUN npm install
RUN npm install -g nodemon
ADD . /app
EXPOSE 4000
CMD ["npm", "start"]