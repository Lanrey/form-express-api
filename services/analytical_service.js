const serverLogs = require('../models/server_logs.js');

require('dotenv').config({path: '../.env'});

//require('mongoose').connect(process.env.MONGO_URL, { useNewUrlParser: true });

const os = require('os')

const CPU_CORES = os.cpus().length;
//create default limit and skip values
function queryFunction(core_length, limit_number = 100, skip_number = 0) {

  return new Promise(function(resolve, reject){

    let serverCoreValues = [];
    let log = serverLogs
    .find({}, 'logs')
    .sort({_id:1})
    .skip(Number(limit_number * skip_number))
    .limit(Number(limit_number))
    .cursor();

    log.on('data', function(doc) {

      let total_cpu_time_since_boot = Number(doc.logs[core_length].times.user 
      + doc.logs[core_length].times.nice + doc.logs[core_length].times.sys + doc.logs[core_length].times.idle + doc.logs[core_length].times.irq);
    
      let total_cpu_idle_time = Number(doc.logs[core_length].times.idle);
    
      let total_cpu_usage_time_since_boot = Number (total_cpu_time_since_boot - total_cpu_idle_time);
    
      let total_cpu_percentage = Number(Math.round((total_cpu_usage_time_since_boot / total_cpu_time_since_boot) * 100 ))
    
      let average_utilization_time = Number(Math.round((total_cpu_percentage / doc.logs.length)));

      serverCoreValues.push({
        [`core-cpu-%-utilization`]: total_cpu_percentage,
        [`core-%-avg-utilization`]: average_utilization_time
      });
      resolve(serverCoreValues)

  })

  log.on('close', function() {

  });

  })
}

module.exports = {

  exportResult(limit_number, skip_number){

    // Call function the number of <CPU_CORES> times, so it returns the cpu utilization time for each core and the number of seconds specified by the limit
  
    // Returns a promise until resolved //
    let promiseArray = [];
  
    for (let function_counter = 0; function_counter < CPU_CORES; 
    function_counter++){
      const value = queryFunction(function_counter, limit_number, skip_number);
      promiseArray.push(value);
    }
  
    // Resolve promise and return result //
  
    return Promise.all(promiseArray)
    .then(result => {
  
      let obj = {};
  
      for (let count = 0; count < CPU_CORES; count++){
        obj[`core-${count + 1}`] = result[count]
      }
  
      return obj;
    })
    .catch(err => {
      console.log(`${err.name}: ${err.message}`);
    })
  },
}



