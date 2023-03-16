const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.json());
const io = require('socket.io');
const dockerapi = require("./docker/dockerapi")

// const Docker = require('dockerode');
// const docker = new Docker();

//to list all containers in docker
router.get("/listcontainers", async (req, res) => {
    try {
      const containers = await dockerapi.listcontainers();
      res.json(containers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error listing containers' });
    }
});


//to pull an image from dockerhub
router.get("/createimage",async(req,res)=>{
    dockerapi.createimage(docker,"ubuntu:latest")
    res.send("image created")
});

//to start a docker container using container name
router.get("/startcontainer",async(req,res)=>{
    // const containerid = req.body.containerid;
    const containerid = "my-container"
    const container = await dockerapi.startcontainer(containerid);
    res.json(container);
});


 

const promisifyStream = stream => new Promise((resolve, reject) => {
    stream.on('data', data => console.log(data.toString()))
    stream.on('end', resolve)
    stream.on('error', reject)
});


//to create a new docker container
router.get("/createcontainer",async(req,res)=>{
    const config = {
        Image: 'ubuntu:latest',
        Cmd: ['/bin/bash'],
        name: 'my-container'
    };
    const container = await dockerapi.createContainer(config.Image, config.name,3030);
    res.status(200).json(container);
})

router.get("/stopcontainer",async(req,res)=>{
    const containerid = "my-container"
    const container = await dockerapi.stopcontainer(containerid);
    res.json(container);
});

router.get('*', (req, res) => {
    res.sendStatus(404);
});


module.exports = router; 