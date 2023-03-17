const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.json());
const io = require('socket.io');
const dockerapi = require("./docker/dockerapi")

//imports for streaming data
const http = require('http');
const WebSocket = require('ws');
const server = http.createServer(router);
const wss = new WebSocket.Server({ server });

const Docker = require('dockerode');
const docker = new Docker();

//to list all containers in docker
router.get("/listcontainers", async (req, res) => {
    try {
      const containers = await dockerapi.listcontainers();
      res.json(containers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error listing containers'});
    }
});


//to pull an image from dockerhub
router.get("/createimage",async(req,res)=>{
    // const image = req.body.image;
    const image = "ubuntu:latest"
    try{
        dockerapi.createimage(docker,image)
        res.send("image created")
    }catch(error){
        res.send("Unable to fetch container image");
    }
    
});

//to start a docker container using container name
router.get("/startcontainer",async(req,res)=>{
    // const containerid = req.body.containerid;
    const containerid = "my-container"
    try{
        const container = await dockerapi.startcontainer(containerid);
        res.json(container);
    }
    catch(error){
        if(error.reason === 'no such container'){
        res.send("container not found");
        }
        else{
            res.send("Unknown error");
        }
    }
});


//to create a new docker container
router.get("/createcontainer",async(req,res)=>{
    const config = {
        Image: 'ubuntu:latestttd',
        Cmd: ['/bin/bash'],
        name: 'my-container'
    };
    try{
        const container = await dockerapi.createContainer(config.Image, config.name,3030);
        res.status(200).json(container);
    }catch(error){
        res.send("Unable to fetch container image");
    }
})

//to restart a docker container
router.get("/restartcontainer",async(req,res)=>{
    const containerid = "my-container"
    try{
        const container = await dockerapi.restartcontainer(containerid);
        res.json(container);
    }
    catch(error){
        if(error.reason === 'no such container'){
        res.send("container not found");
        }
        else{
            res.send("Unknown error");
        }
    }
})

router.get("/stopcontainer",async(req,res)=>{
    const containerid = "my-container"
    try{
        const container = await dockerapi.stopcontainer(containerid);
        res.json(container);
    }
    catch(error){
        if(error.reason === 'no such container'){
        res.send("container not found");
        }
        else{
            res.send("Unknown error");
        }
    }
    
});

router.get("/removecontainer",async(req,res)=>{
    const containerid = "my-container"
    try{
        const container = await dockerapi.removecontainer(containerid);
        res.json(container);
    }
    catch(error){
        if(error.reason === 'no such container'){
        res.send("container not found");
        }
        else{
            res.send("Unknown error");
        }
    }
});


// Stream the real-time stats of all running containers
router.get('/stats', (req, res) => {
    const containers = [];
    res.writeHead(200,{
        'content-type': 'text/event-stream',
    //     'cache-control': 'no-cache',
    //     'connection': 'keep-alive'
    });
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
            const usageData = {
              id: container.id,
              name: containerInfo.Names[0].substring(1),
              cpuUsage: data.cpu_stats.cpu_usage.total_usage,
              memoryUsage: data.memory_stats.usage
            };
            res.write(`data: ${JSON.stringify(usageData)}\n\n`);
          });
          stream.on('error', err => {
            console.error(`Error on container stats stream: ${err.message}`);
          });
        });
      });
    });
    req.on('close', () => {
      console.log(`Stopping streaming of ${containers.length} containers`);
    //   containers.forEach(container => container.stop());
    });
});

router.get("/deletevolume",async(req,res)=>{
    const volumeName = "my-volume"
    try{
        await dockerapi.deleteVolume(volumeName);
        res.json("deleted volume");
    }
    catch(error){
        res.send("Unable to delete volume");
    }
});

router.get('*', (req, res) => {
    res.sendStatus(404);
});


module.exports = router; 