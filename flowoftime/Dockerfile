FROM node:latest as build-stage
WORKDIR /app
ADD . .
RUN npm install
RUN npm run build

FROM nginx
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]