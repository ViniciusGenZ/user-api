FROM node:alpine3.16
COPY . /opt/app
WORKDIR /opt/app
RUN npm install
RUN npm run build
CMD npm run start
