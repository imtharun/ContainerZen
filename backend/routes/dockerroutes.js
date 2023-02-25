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
    dockerapi.createimage(docker,"ubuntu:latest")
});

 
const promisifyStream = stream => new Promise((resolve, reject) => {
    stream.on('data', data => console.log(data.toString()))
    stream.on('end', resolve)
    stream.on('error', reject)
});


router.get("/createcontainer",async(req,res)=>{
    const config = {
        Image: 'ubuntu:latest',
        Cmd: ['/bin/bash'],
        name: 'my-container'
    };
    docker.createContainer(config, (err, container) => {
        if (err) {
          console.log('Error creating container:', err);
        } else {
          console.log('Container created:', container.id);
      
          // Stream data to the container
          const logStream = docker.getContainer(container.id).attach({
            stream: true,
            stdout: true,
            stderr: true
          }, (err, stream) => {
            if (err) {
              console.log('Error streaming data to container:', err);
            } else {
              console.log('Streaming data to container:', container.id);
            }
          });
      
          // Listen for data events on the stream
          logStream.on('data', (data) => {
            // Send data to the frontend using Socket.io
            io.emit('data', data.toString());
          });
        }
    });
})

router.get('*', (req, res) => {
    res.sendStatus(404);
});


module.exports = router; 