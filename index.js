var request = require('request'),
    cheerio = require('cheerio'),
    _       = require('underscore');

require('dotenv').load();

request(process.env.ALAVETELI_URL + '/health_checks', function(error, response, body) {
  var message;

  if(!error) {
    var $ = cheerio.load(body);

    if(response.statusCode == 200) {
      message = 'Status: OK\n'
    } else {
      message = 'Status: ERROR\n'
    }

    _.each($('li b'), function(item) {
      message += $(item).text() + '\n';
    });

  } else {
    message = '[URGENT]\nError requesting ' + process.env.ALAVETELI_URL + '/health_checks';
  }

  var payload = JSON.stringify({
    channel: '#fyi-org-nz-bots',
    username: 'fyi',
    text: message,
    mrkdwn: true
  });

  console.log(payload);

  request.post({ url: process.env.WEBHOOK_URL, form: payload }, function(err, response, body) {
    console.log(body);
  });

});
