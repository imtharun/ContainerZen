const Docker = require('dockerode');
const docker = new Docker();


// ---------------------------------------Images--------------------------------------------
const createimage = (image)=>{
    console.log(image)
    docker.createImage({fromImage: image}, function (err, stream) {
        stream.pipe(process.stdout);
    });
}

async function deleteimage(image){
    const delimage = await docker.getImage(image);
    await delimage.remove();
    return delimage;
}


// ---------------------------------------Containers--------------------------------------------
async function startcontainer(containerid){
    const container = await docker.getContainer(containerid);
    await container.start();
    return container;
}

async function stopcontainer(containerid){
    const container = await docker.getContainer(containerid);
    await container.stop();
    return container;
}

async function listcontainers(){
    const containers = await docker.listContainers();
    return containers
}

async function createContainer(containerName, imageName, networkName, hostvolume,containervolume, hostport,containerport,restartpolicy) {
  // Check if the image exists locally
  let image = await docker.getImage(imageName).inspect().catch(() => null);

  if (!image) {
    console.log(`Image '${imageName}' not found locally. Pulling from Docker Hub...`);

    // Pull the image from Docker Hub
    const stream = await docker.pull(imageName);

    // Wait for the image to finish downloading
    await new Promise((resolve, reject) => {
      docker.modem.followProgress(stream, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });

    // Get the image again to make sure it was downloaded successfully
    image = await docker.getImage(imageName).inspect();
  }

  // Create the container
  const container = await docker.createContainer({
    Image: imageName,
    name: containerName,
    RestartPolicy: {
      Name: restartpolicy,
      MaximumRetryCount: 5,
    },
    HostConfig: {
      Binds: [`${hostvolume}:${containervolume}`],
      PortBindings: { [`${containerport}/tcp`]: [{ 'HostPort': `${hostport}` }] },
    },
    NetworkingConfig: {
      EndpointsConfig: {
        [networkName]: {}
      }
    }
  });

  await container.start();
  console.log(`Container '${containerName}' created and started`);  
  return container;
    
}

async function restartcontainer(containerid){
    const container = await docker.getContainer(containerid);
    await container.restart();
    return container;
}

async function removeContainer(containerId) {
    const container = docker.getContainer(containerId);
    await container.remove();
}


// function to get stats for a container
async function getContainerStats(containerId) {
  try {
    const container = dockerClient.getContainer(containerId);
    const stats = await container.stats({ stream: false });

    // parse the stats and return the relevant information
    const cpuUsage = stats.cpu_stats.cpu_usage.total_usage;
    const systemCpuUsage = stats.cpu_stats.system_cpu_usage;
    const cpuPercent = ((cpuUsage / systemCpuUsage) * 100).toFixed(2);
    const memoryUsage = stats.memory_stats.usage;
    const memoryLimit = stats.memory_stats.limit;
    const memoryPercent = ((memoryUsage / memoryLimit) * 100).toFixed(2);
    const timestamp = moment(stats.read).format('YYYY-MM-DD HH:mm:ss');

    return {
      containerId,
      cpuPercent,
      memoryUsage,
      memoryLimit,
      memoryPercent,
      timestamp,
    };
  } catch (err) {
    console.error(`Error getting stats for container ${containerId}: ${err}`);
    return null;
  }
}


// ---------------------------------------Volumes--------------------------------------------

async function createVolume(volumeName) {
    const volume = await docker.createVolume({
    Name: volumeName
    });
    console.log(`Created volume ${volumeName}`);
    return volume;
}

async function deleteVolume(volumeName) {
    await docker.getVolume(volumeName).remove();
}


// ---------------------------------------Networks--------------------------------------------

async function createNetwork(name, driver) {
  try {
    const network = await docker.createNetwork({
      Name: name,
      Driver: driver,
    });
    console.log(`Network ${name} created successfully with driver ${driver}.`);
    return network;
  } catch (error) {
    console.error(`Error creating network ${name}: ${error}`);
    throw error;
  }
}

async function deleteNetwork(name) {
  try {
    const network = docker.getNetwork(name);
    await network.remove();
    console.log(`Network ${name} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting network ${name}: ${error}`);
    throw error;
  }
}




module.exports = {
    createimage,
    createContainer,
    listcontainers,
    startcontainer,
    stopcontainer,
    restartcontainer,
    removeContainer,
    createVolume,
    deleteVolume,
    getContainerStats,
    createNetwork,
    deleteimage,
    deleteNetwork,
}
