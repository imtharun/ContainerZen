const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.json());
const dockerapi = require("./docker/dockerapi")





//---------------------------------------Images--------------------------------------------
//to pull an image from dockerhub
router.post("/createimage",async(req,res)=>{
    const image = req.body.image;
    try{
        await dockerapi.createimage(image)
        img = await dockerapi.listimages();
        res.send(img);
    }catch(error){
        res.status(503);
        res.send(error);
    }
});

router.post("/deleteimage",async(req,res)=>{
    const image = req.body.image;
    // const image = "ubuntu:latest"
    try{
        await dockerapi.deleteimage(image)
        img = await dockerapi.listimages();
        res.send(img);
    }catch(error){
        res.status(503);
        res.send("Unable to fetch container image");
    }
});

router.get("/listimages",async(req,res)=>{
    try{
        const images = await dockerapi.listimages();
        res.json(images);
    }catch(error){
        res.status(503);
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
      res.sendStatus(500);
    }
});

//to start a docker container using container name
router.post("/startcontainer",async(req,res)=>{
    const containerid = req.body.containerId;
    try{
        await dockerapi.startcontainer(containerid);
        cnt = await dockerapi.listcontainers();
        res.send(cnt);
    }
    catch(error){
        if(error.reason === 'no such container'){
        res.send("container not found");
        }
        else{
            res.status(503);
            res.send("Unknown error");
        }
    }
});


//to create a new docker container
router.post("/createcontainer",async(req,res)=>{
    const containername = req.body.containername;
    const containerimage = req.body.image;
    const restartpolicy = req.body.restartpolicy;
    const containernetwork = req.body.networkname;
    const networktype = req.body.networktype;
    const hostport = req.body.hostport;
    const containerport = req.body.containerport;
    const hostvolume = req.body.hostvolume;
    const containervolume = req.body.containervolume;

    try{
        const networ = await dockerapi.createNetwork(containernetwork,networktype);
        const container = await dockerapi.createContainer(containername,containerimage, containernetwork, hostvolume,containervolume, hostport, containerport,restartpolicy);
        cnt = await dockerapi.listcontainers();
        res.send(cnt);
    }catch(error){
        res.status(503);
        res.send(error);
    }
})

//to restart a docker container
router.post("/restartcontainer",async(req,res)=>{
    const containerid = req.body.containerId;
    try{
        await dockerapi.restartcontainer(containerid);
        cnt = await dockerapi.listcontainers();
        res.send(cnt);
    }
    catch(error){
        if(error.reason === 'no such container'){
        res.send("container not found");
        }
        else{
            res.status(503);
            res.send("Unknown error");
        }
    }
})

router.post("/stopcontainer",async(req,res)=>{
    const containerid = req.body.containerId;
    try{
        await dockerapi.stopcontainer(containerid);
        cnt = await dockerapi.listcontainers();
        res.send(cnt);
    }
    catch(error){
        if(error.reason === 'no such container'){
        res.send("container not found");
        }
        else{
            res.status(503);
            res.send("Unable to stop container");
        }
    }
    
});

router.post("/deletecontainer",async(req,res)=>{
    const containerid =req.body.containerId;
    try{
        await dockerapi.removeContainer(containerid);
        cnt = await dockerapi.listcontainers();
        res.send(cnt);
    }
    catch(error){
        if(error.reason === 'no such container'){
        res.send("container not found");
        }
        else{
            res.status(503);
            res.send(error);
        }
    }
    
});

router.get("/currStats",async(req,res)=>{
    try{
        const stats = await dockerapi.fetchContainerStats();
        res.json(stats);
    }
    catch(error){
        res.status(503);
        res.send("Unable to fetch container stats");
    }
});


//---------------------------------------Volumes--------------------------------------------
router.post("/createvolume",async(req,res)=>{
    const volumeName = req.body.volumeName;
    try{
        await dockerapi.createVolume(volumeName);
        vol = await dockerapi.listvolumes();
        res.send(vol);
    }
    catch(error){
        res.status(503);
        res.send("Unable to create volume");
    }
});

router.post("/deletevolume",async(req,res)=>{
    const volumeName = req.body.volumeName;
    try{
        await dockerapi.deleteVolume(volumeName);
        vol = await dockerapi.listvolumes();
        res.send(vol);
    }
    catch(error){
        res.status(503);
        res.send("Unable to delete volume");
    }
});

router.get("/listvolumes",async(req,res)=>{
    try{
        const volumes = await dockerapi.listvolumes();
        res.json(volumes);
    }
    catch(error){
        res.status(503);
        res.send("Unable to list volumes");
    }
});


//---------------------------------------Networks--------------------------------------------
router.post("/createnetwork",async(req,res)=>{
    const networkName = "my-network"
    const networkDriver = "bridge"
    try{
        await dockerapi.createNetwork(networkName, networkDriver);
        ntw = await dockerapi.listnetworks();
        res.sendFile(ntw);
    }
    catch(error){
        res.status(503);
        res.send("Unable to create network");
    }
});

router.post("/deletenetwork",async(req,res)=>{
    const networkName = "my-network"
    try{
        await dockerapi.deleteNetwork(networkName);
        ntw = await dockerapi.listnetworks();
        res.sendFile(ntw);
    }
    catch(error){
        res.status(503);
        res.send("Unable to delete network");
    }
});

router.get("/listnetworks",async(req,res)=>{
    try{
        const networks = await dockerapi.listnetworks();
        res.json(networks);
    }
    catch(error){
        res.status(503);
        res.send(error);
    }
});

router.get('*', (req, res) => {
    res.sendStatus(404);
});


module.exports = router; 