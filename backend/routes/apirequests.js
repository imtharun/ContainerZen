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


router.get('/stats', (req, res) => {
    // Get the container
    // const container = docker.getContainer(req.params.id);
    const containerid = "2860a7d21106c74fd38bf193e39505105aa241ed2938020b3ef388c45a236b4c";
    const container  = docker.getContainer(containerid);
  
    // Get container stats and stream them to the frontend over a WebSocket connection
    container.stats({ stream: true }, (err, stream) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }
  
      stream.on('data', (chunk) => {
        const stats = JSON.parse(chunk.toString());
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(stats));
          }
        });
      });
  
      stream.on('error', (err) => {
        console.error(err);
      });
  
      // Return a success response to the client
      res.status(200).send('Started streaming container stats');
    });
  });
  






router.get("/createvolume",async(req,res)=>{
    const volumeName = "my-volume"
    try{
        const volume = await dockerapi.createVolume(volumeName);
        res.json(volume);
    }
    catch(error){
        res.send("Unable to create volume");

    }
})

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