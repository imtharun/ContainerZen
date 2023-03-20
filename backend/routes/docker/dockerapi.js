const Docker = require('dockerode');
const docker = new Docker();


// ---------------------------------------Images--------------------------------------------
async function createimage(image){
    const stream = await docker.pull(image);
    return new Promise((resolve, reject) => {
      docker.modem.followProgress(stream, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });

    });
}

async function deleteimage(image){
    const delimage = await docker.getImage(image);
    await delimage.remove();
    return delimage;
}

async function listimages(){
    const images = await docker.listImages();
    return images;
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
    const containers = await docker.listContainers({ all: true });
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
  const portbindings = {
    [`${containerport}/tcp`]: [
      {
        HostPort: `${hostport}`,
      },]
  };

  // Create the container
  if(hostvolume && containervolume){
    console.log("edsf")
    const container = await docker.createContainer({
      Image: imageName,
      name: containerName,
      ExposedPorts:{containerport: {}},
      RestartPolicy: {
        Name: restartpolicy,
        MaximumRetryCount: 5,
      },
      HostConfig: {
        Binds: [`${hostvolume}:${containervolume}`],
        PortBindings: portbindings,
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
  }else{
    const container = await docker.createContainer({
      Image: imageName,
      name: containerName,
      ExposedPorts:{containerport: {}},
      RestartPolicy: {
        Name: restartpolicy,
        MaximumRetryCount: 5,
      },
      HostConfig: {
        PortBindings: portbindings,
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
    
}

async function restartcontainer(containerid){
    const container = await docker.getContainer(containerid);
    await container.restart();
    return container;
}

async function removeContainer(containerId) {
    const container = docker.getContainer(containerId);
    try{
      await container.stop();
    }catch(err){
      console.log(err);
    }
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

async function fetchContainerStats() {
  // get all running containers
  const containers = await docker.listContainers();
  
  // array to hold container stats
  const containerStats = [];

  // loop through all containers
  for (const container of containers) {
    // get container stats
    const stats = await docker.getContainer(container.Id).stats({ stream: false });

    // extract relevant stats (CPU usage and memory usage)
    const cpuUsage = stats.cpu_stats.cpu_usage.total_usage;
    const systemCpuUsage = stats.cpu_stats.system_cpu_usage;
    const memoryUsage = stats.memory_stats.usage;

    // calculate CPU usage as a percentage
    const cpuPercent = ((cpuUsage / systemCpuUsage) * 100).toFixed(2);

    // convert memory usage to MB
    const memoryUsageMB = (memoryUsage / 1024 / 1024).toFixed(2);

    // add container stats to array
    containerStats.push({
      id: container.Id,
      name: container.Names[0],
      cpuUsage: cpuPercent,
      memoryUsage: memoryUsageMB
    });
  }

  return containerStats;
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

async function listvolumes(){
    const volumes = await docker.listVolumes();
    return volumes;
}


// ---------------------------------------Networks--------------------------------------------

async function createNetwork(networkName, driver="bridge") {
  try {
    // Check if the network already exists
    const network = await docker.getNetwork(networkName).inspect();
    console.log(`Network ${networkName} already exists`);
    return network;
  } catch (error) {
    // Create a new network if it doesn't exist
    console.log(`Creating network ${networkName}`);
    const networkOptions = {
      Name: networkName,
      Driver: driver,
    };
    const network = await docker.createNetwork(networkOptions);
    console.log(`Created network ${networkName}`);
    return network;
  }
}

async function listnetworks(){
    const networks = await docker.listNetworks();
    return networks;
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





//---------------------------------------Exports--------------------------------------------

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
    listvolumes,
    listnetworks,
    listimages,
    fetchContainerStats,
}
