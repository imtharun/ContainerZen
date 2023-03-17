const Docker = require('dockerode');
const docker = new Docker();

// Get a reference to the container
const container = docker.getContainer('naughty_shannon');

// Stream the real-time stats of the container
container.stats({ stream: true }, (err, stream) => {
  if (err) {
    console.error(`Failed to stream container stats: ${err.message}`);
    return;
  }
  console.log('Streaming container stats');

  // Read the data from the stream and log it to the console
  stream.on('data', chunk => {
    const data = JSON.parse(chunk.toString('utf8'));
    console.log(`CPU usage: ${data.cpu_stats.cpu_usage.total_usage}`);
    console.log(`Memory usage: ${data.memory_stats.usage/1024*1024}`);
    // Update the frontend with the new data here
  });

  // Handle errors on the stream
  stream.on('error', err => {
    console.error(`Error on container stats stream: ${err.message}`);
  });

  // Handle the end of the stream
  stream.on('end', () => {
    console.log('Container stats stream ended');
  });
});
