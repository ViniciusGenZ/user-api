FROM node:alpine3.16

COPY . /opt/app

WORKDIR /opt/app

CMD npm run dev