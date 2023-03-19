const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:6000');

ws.addEventListener('message', (event) => {
  const usageData = JSON.parse(event.data);
  console.log(usageData);
  console.log(`CPU usage: ${usageData[0][1].cpuUsage}%`);
  console.log(`Memory usage: ${usageData[0][1].memoryUsage}MB`);
});