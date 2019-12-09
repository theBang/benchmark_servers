'use strict'
 
const autocannon = require('autocannon');

(async () => {
  const result = await autocannon({
    url: 'http://localhost:3000',
    connections: 100, //default
    pipelining: 1, // default
    duration: 10, // default
  });

  const { requests: { average: avgReq } } = result;
  const { latency: { average: avgLat } } = result; 
  
  console.log('Requst', avgReq);
  console.log('Latency', avgLat);
  console.log(result);
})();