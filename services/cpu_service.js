

// Child process should also post to the DB //
const os = require('os');

//get config

require('dotenv').config({path: '../.env'})

// Get model from models service //
const ServerLogs = require('../models/server_logs.js');

// Since it will be a child process, create another connection to the DB //
require('mongoose').connect(process.env.MONGO_URL, { useNewUrlParser: true });

function get_os_utilization() {
  ServerLogs.create({logs: os.cpus()});
}

// Trigger to start child process //
process.on('message', (msg) => {
  setInterval(get_os_utilization, 1000);
  process.send('I have started pushing to the database');
});


