const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
const bodyParser = require('body-parser')
const path = require("path")

server.listen( process.env.PORT || 8001, () => console.log('connected to port 8001!'));
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}else{
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}
app.use(cors());

app.post(
  `/webhook/cb6433d48a4d94a51d0184718e66eb5e56b6c44d05576111c283f5adc409007d`,
  bodyParser.json(),
  async function(req, res) {
    console.log(
      JSON.stringify({
        message: 'Webhook information',
        data: req.body
      })
    )
    io.emit('new-message', req.body)
    return await res.json({
      status: 'ok'
    })
  }
)
io.on('connection', socket => {
  console.log("socket connect 456")
  socket.on("receive-change-user-info",(data) =>{
    io.emit("send-change-user-info",data);
  });
});
console.log("connect node");