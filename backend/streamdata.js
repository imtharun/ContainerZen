const socket = io();

socket.on('data', (data) => {
  console.log(data);
  // Update the UI with the data
});