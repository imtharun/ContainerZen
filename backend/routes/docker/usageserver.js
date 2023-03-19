const WebSocket = require('ws');
const Docker = require('dockerode');
const docker = new Docker();

  const dmport = 6000;
  const dmserver = new WebSocket.Server({ port: dmport });

function startserver(){  
  dmserver.on('connection', (socket) => {
    console.log('WebSocket connection established');
    setInterval(() => {
      const containers = [];
      const map = new Map();
      docker.listContainers((err, containerList) => {
        if (err) {
          console.error(`Failed to list containers: ${err.message}`);
          res.status(500).send(`Failed to list containers: ${err.message}`);
          return;
        }
        console.log(`Found ${containerList.length} running containers`);
        containerList.forEach(containerInfo => {
          const container = docker.getContainer(containerInfo.Id);
          containers.push(container);
          container.stats({ stream: true }, (err, stream) => {
            if (err) {
              console.error(`Failed to stream container stats: ${err.message}`);
              return;
            }
            console.log(`Streaming stats for container ${container.id}`);
            stream.on('data', chunk => {
              const data = JSON.parse(chunk.toString('utf8'));
              const cpuDelta = data.cpu_stats.cpu_usage.total_usage - data.precpu_stats.cpu_usage.total_usage;
              const systemDelta = data.cpu_stats.system_cpu_usage - data.precpu_stats.system_cpu_usage;
              const cpuPercent = cpuDelta / systemDelta * 100;
              const usageData = {
                id: container.id,
                name: containerInfo.Names[0].substring(1),
                cpuUsage: cpuPercent,
                memoryUsage: data.memory_stats.usage /1024/1024
              };
              map.set(container.id, usageData);
              const jsonString = JSON.stringify(Array.from(map.entries()));
              console.log(jsonString);
              socket.send(jsonString);
            });
            stream.on('error', err => {
              console.error(`Error on container stats stream: ${err.message}`);
            });
          });
        });
      });
    }, 1000);
  });
}


module.exports = {
  startserver
}
