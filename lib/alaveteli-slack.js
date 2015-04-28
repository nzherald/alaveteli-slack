var request          = require('request'),
    http             = require('http'),
    cheerio          = require('cheerio'),
    moment           = require('moment'),
    momentTimezone   = require('moment-timezone'),
    humanizeDuration = require('humanize-duration');

var Notifier = {};

Notifier.notify = function () {

  request(process.env.ALAVETELI_URL + '/health_checks', function(error, response, body) {
    var message;

    if(!error) {
      var $ = cheerio.load(body);

      if(response.statusCode == 200) {
        message = '*Status*: OK\n'
      } else {
        message = '*Status*: _WARN_\n'
      }

      $('li b').each(function(i, item) {
        var text = $(item).text().split(/ (in the last day:|over a day ago:) /)
        var timeAgo = humanizeDuration(moment.duration(moment() - moment(text[2])));
        message += '*' + text[0] + '*: ' + timeAgo + ' ago\n';
      });

    } else {
      message = '*URGENT*\n*Error requesting ' + process.env.ALAVETELI_URL + '/health_checks*';
    }

    var payload = JSON.stringify({
      channel: process.env.CHANNEL,
      username: process.env.SLACK_USERNAME,
      text: message
    });
    console.log(payload);

    request.post({ url: process.env.WEBHOOK_URL, body: payload });

  });
};

module.exports = Notifier;
