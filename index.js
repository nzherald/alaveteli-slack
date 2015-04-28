var notifier = require('./lib/alaveteli-slack');
require('dotenv').load();

// Notify initially for the first time
notifier.notify();

function tick()
{
    //get the mins of the current time
    var mins = new Date().getMinutes();
    if(mins == "00"){
      console.log('Sending notification');
      notifier.notify();
     }
}

console.log('Notifying on the hour...');

setInterval(tick, 1000);
