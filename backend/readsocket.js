const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:6000');

ws.addEventListener('message', (event) => {
  const usageData = JSON.parse(event.data);
  console.log(usageData);
  console.log(`CPU usage: ${usageData.cpuUsage}%`);
  console.log(`Memory usage: ${usageData.memoryUsage}MB`);
});