const Docker = require('dockerode');
const docker = new Docker();



const createimage = (image)=>{
    console.log(image)
    docker.createImage({fromImage: image}, function (err, stream) {
        stream.pipe(process.stdout);
    });
}

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


async function createContainer(imageName, containerName, port) {
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
      ExposedPorts: { [`${port}/tcp`]: {} },
      HostConfig: {
        PortBindings: { [`${port}/tcp`]: [{ 'HostPort': `${port}` }] },
      },
    });
  
    await container.start();
    console.log(`Container '${containerName}' created and started`);
  }


module.exports = {
    createimage,
    createContainer,
    listcontainers,
    startcontainer,
    stopcontainer,
}
