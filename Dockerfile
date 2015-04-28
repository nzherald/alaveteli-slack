FROM node:latest

RUN mkdir -p /opt/alaveteli-slack

WORKDIR /opt/alaveteli-slack

ADD . /opt/alaveteli-slack

RUN npm install

CMD ["npm", "start"]
