var request          = require('request'),
    cheerio          = require('cheerio'),
    moment           = require('moment'),
    momentTimezone   = require('moment-timezone'),
    humanizeDuration = require('humanize-duration');

require('dotenv').load();

request(process.env.ALAVETELI_URL + '/health_checks', function(error, response, body) {
  var message;

  if(!error) {
    var $ = cheerio.load(body);

    if(response.statusCode == 200) {
      message = 'Status: OK\n'
    } else {
      message = 'Status: WARN\n'
    }

    $('li b').each(function(i, item) {
      var text = $(item).text().split(' in the last day: ')
      var timeAgo = humanizeDuration(moment.duration(moment(text[1]).tz('utc')).asMilliseconds());
      message += text[0] + ': ' + timeAgo + ' ago\n';
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
