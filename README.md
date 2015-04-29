Alaveteli Slack
===============

Periodic notifier of Alaveteli Health Status for Slack

![Example output](http://i.imgur.com/oPHAKAl.png)


## Getting started

Setup a Slack [webhook url](https://api.slack.com/incoming-webhooks) for your Slack

`cp .env-sample .env`

Edit `.env` to appropriate values

## Running

`npm install`

`node index.js`

or in a Docker container:

`docker run  --env-file=.env nzherald/alaveteli-slack`
