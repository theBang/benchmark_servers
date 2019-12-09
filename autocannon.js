'use strict'
 
const autocannon = require('autocannon');
const title = 'Autocannon for: ' + (process.argv[2] || 'Server');

const config = {
  connections: [100, 300]
}

console.log(title);

(async () => {
  const overall = [];
  for (const conn of config.connections) {
    const result = await autocannon({
      url: 'http://localhost:3000',
      connections: conn, 
      duration: 5,
      title: title
    });
  
    const { requests: { average: avgReq } } = result;
    const { requests: { p50: medianReq } } = result;
    const { latency: { average: avgLat } } = result; 
    const { latency: {  p50: medianLat } } = result;
    
    const duration = result.duration;
    const { requests: { total: reqs } } = result;

    overall.push({
      'Connections': conn,
      'Request avg': avgReq,
      'Request median': medianReq,
      'Latency avg': avgLat,
      'Latency median': medianLat,
      'Latency median': medianLat,
      'Total requests': reqs,
      'Duration': duration
    });
  }

  console.table(overall);
})();