var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;

var topic = "";
var announcement = "";

var ws = new WebSocketServer({
  port: port
});
var message = [];

console.log("websockets server started");

//handlw connection
ws.on("connection", function (socket) {
  console.log("client connection established");

  if(topic) {
    socket.send("*** Topic is: " + topic);
  }

  message.forEach(function (msg) {
    socket.send(msg);
  });

  socket.on("message", function(data) {
    console.log("message received: " + data);
    if (data.indexOf("/topic")===0) {
      topic = data.slice(7);
      announcement = "*** Topic has changed to: " + topic;
    }
    else{
      announcement = data;
      message.push(data);
    }
    //message.push(data);
    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(announcement);
    });
  });
});
