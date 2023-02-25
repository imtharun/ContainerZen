const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.json());
const io = require('socket.io');
const dockerapi = require("./docker/dockerapi")

const Docker = require('dockerode');
const docker = new Docker();



router.get("/listcontainers", async (req, res) => {
    try {
      const containers = await docker.listContainers();
      res.json(containers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error listing containers' });
    }
});

router.get("/createimage",async(req,res)=>{
    img = dockerapi.createimage(docker,"ubuntu:latest")
});

 
const promisifyStream = stream => new Promise((resolve, reject) => {
    stream.on('data', data => console.log(data.toString()))
    stream.on('end', resolve)
    stream.on('error', reject)
});

router.get('*', (req, res) => {
    res.sendStatus(404);
});


module.exports = router; 