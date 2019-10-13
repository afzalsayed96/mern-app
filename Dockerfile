FROM node:12
WORKDIR /usr/src/app
COPY *.json ./
COPY *.lock ./

RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start" ]