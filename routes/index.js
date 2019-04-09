var express = require('express');
var router = express.Router();

let count = 0;

require('dotenv').config({path: '.env'});

const Pusher = require('pusher');
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
});


/* send initial response */

// Get next data, with skip increased
function nextData(){
  count++
  require('../services/analytical_service').exportResult(100, count)
  .then(computation => pusher.trigger('cpu-channel', 'update-cpu',{
    computation
  }));
}

router.get('/', function(req, res, next) {

  require('../services/analytical_service').exportResult()
  .then(computation => res.json({ computation }));

  setInterval(nextData, 1000000)


});

module.exports = router;
