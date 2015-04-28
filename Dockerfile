FROM node:latest

RUN mkdir -p /opt/alaveteli-slack

WORKDIR /opt/alaveteli-slack

ADD .

RUN npm install

CMD ["npm", "start"]
