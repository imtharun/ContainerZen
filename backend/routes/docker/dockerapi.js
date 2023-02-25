const createimage = (docker,image)=>{
    docker.createImage({fromImage: image}, function (err, stream) {
        stream.pipe(process.stdout);
    });
}


module.exports = {
    createimage
}
