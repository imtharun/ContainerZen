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
    console.log(image+"create");
    // const image = "ubuntu:latest"
    try{
        dockerapi.createimage(docker,image)
        res.sendStatus(200).json("image created");
    }catch(error){
        res.send(error);
    }
    
});

router.post("/deleteimage",async(req,res)=>{
    const image = req.body.image;
    // const image = "ubuntu:latest"
    console.log(image+"delete");
    try{
        dockerapi.deleteimage(image)
        res.sendStatus(200).json("image deleted");
    }catch(error){
        res.send("Unable to fetch container image");
    }
});

router.get("/listimages",async(req,res)=>{
    try{
        const images = await dockerapi.listimages();
        res.json(images);
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
router.post("/startcontainer",async(req,res)=>{
    const containerid = req.body.containerId;
    console.log(containerid+"start request");
    try{
        const container = await dockerapi.startcontainer(containerid);
        res.sendStatus(200).json("container started");
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
router.post("/createcontainer",async(req,res)=>{
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
        res.status(200).json("container created");
    }catch(error){
        console.log(error);
        res.send(error);
    }
})

//to restart a docker container
router.post("/restartcontainer",async(req,res)=>{
    const containerid = req.body.containerId;
    console.log(containerid+"restart");
    // const containerid = "my-container"
    try{
        const container = await dockerapi.restartcontainer(containerid);
        rres.sendStatus(200).json("container restarted");
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

router.post("/stopcontainer",async(req,res)=>{
    // const containerid = "my-container"
    const containerid = req.body.containerId;
    console.log(containerid+"stop");

    try{
        const container = await dockerapi.stopcontainer(containerid);
        res.sendStatus(200).json("container stopped");
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

router.post("/deletecontainer",async(req,res)=>{
    // const containerid = "my-container"
    const containerid =req.body.containerId;
    console.log(containerid+"delete");

    try{
        const container = await dockerapi.removeContainer(containerid);
        res.sendStatus(200).json("container deleted");
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
router.post("createvolume",async(req,res)=>{
    // const volumeName = "my-volume"
    const volumeName = req.body.volumeName;
    console.log(volumeName+"create");
    try{
        await dockerapi.createVolume(volumeName);
        res.sendStatus(200).json("volume created");
    }
    catch(error){
        res.send("Unable to create volume");
    }
});

router.post("/deletevolume",async(req,res)=>{
    // const volumeName = "my-volume"
    const volumeName = req.body.volumeName;
    console.log(volumeName+"delete");
    try{
        await dockerapi.deleteVolume(volumeName);
        res.sendStatus(200).json("volume deleted");
    }
    catch(error){
        res.send("Unable to delete volume");
    }
});

router.get("/listvolumes",async(req,res)=>{
    try{
        const volumes = await dockerapi.listvolumes();
        res.json(volumes);
    }
    catch(error){
        res.send("Unable to list volumes");
    }
});


//---------------------------------------Networks--------------------------------------------
router.post("/createnetwork",async(req,res)=>{
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

router.post("/deletenetwork",async(req,res)=>{
    const networkName = "my-network"
    try{
        await dockerapi.deleteNetwork(networkName);
        res.json("deleted network");
    }
    catch(error){
        res.send("Unable to delete network");
    }
});

router.get("/listnetworks",async(req,res)=>{
    try{
        const networks = await dockerapi.listnetworks();
        res.json(networks);
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
});

router.get('*', (req, res) => {
    res.sendStatus(404);
});


module.exports = router; 