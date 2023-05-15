FROM node:alpine3.16

COPY . /opt/app

WORKDIR /opt/app

RUN npm i

CMD npm run dev
