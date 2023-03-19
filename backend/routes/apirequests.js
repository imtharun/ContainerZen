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



//---------------------------------------Images--------------------------------------------
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

router.get("/deleteimage",async(req,res)=>{
    // const image = req.body.image;
    const image = "ubuntu:latest"
    try{
        dockerapi.deleteimage(image)
        res.send("image deleted")
    }catch(error){
        res.send("Unable to fetch container image");
    }
});


//---------------------------------------Containers--------------------------------------------
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
    const containername = req.body.containername;
    const containerimage = req.body.image;
    const containernetwork = req.body.network;
    const hostvolume = req.body.hostvolume;
    const containervolume = req.body.containervolume;
    const hostport = req.body.hostport;
    const containerport = req.body.containerport;
    const restartpolicy = req.body.restartpolicy;

    try{
        const networ = await dockerapi.createNetwork("my-network", "bridge");
        const container = await dockerapi.createContainer("my-container", "docker/getting-started:latest", "my-network", "", "", 8080, 80, "always");
        res.status(200).json(container);
    }catch(error){
        console.log(error);
        res.send(error);
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
            res.send(error);
        }
    }
    
});

router.get("/deletecontainer",async(req,res)=>{
    const containerid = "my-container"
    try{
        const container = await dockerapi.removeContainer(containerid);
        res.json(container);
    }
    catch(error){
        if(error.reason === 'no such container'){
        res.send("container not found");
        }
        else{
            res.send(error);
        }
    }
    
});


//---------------------------------------Volumes--------------------------------------------
router.get("createvolume",async(req,res)=>{
    const volumeName = "my-volume"
    try{
        await dockerapi.createVolume(volumeName);
        res.json("created volume");
    }
    catch(error){
        res.send("Unable to create volume");
    }
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


//---------------------------------------Networks--------------------------------------------
router.get("/createnetwork",async(req,res)=>{
    const networkName = "my-network"
    const networkDriver = "bridge"
    try{
        await dockerapi.createNetwork(networkName, networkDriver);
        res.json("created network");
    }
    catch(error){
        res.send("Unable to create network");
    }
});

router.get("/deletenetwork",async(req,res)=>{
    const networkName = "my-network"
    try{
        await dockerapi.deleteNetwork(networkName);
        res.json("deleted network");
    }
    catch(error){
        res.send("Unable to delete network");
    }
});

router.get('*', (req, res) => {
    res.sendStatus(404);
});


module.exports = router; 