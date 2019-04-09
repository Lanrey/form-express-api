
let mongoose = require('mongoose');

let ServerLogs = mongoose.model('ServerLogs', {

  logs: [{

    model: String,
    speed: Number,

    times: {
      user: Number,
      nice: Number,
      sys: Number,
      idle: Number,
      irq: Number
   },
  }]
});


module.exports = ServerLogs;