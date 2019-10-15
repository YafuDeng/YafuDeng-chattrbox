var http = require("http"); //use node's built-in require function to access the http module included with Node.
var fs = require("fs");
var extract = require("./extract");
var mime = require("mime");
var wss = require("./websockets-server");

var handleError = function (err, res) {
  //res.writeHead(404);
  fs.readFile("app/error.html", function(err, data) {
    res.end(data);
  });
};

//http.createServer takes one argument and one funciton
//
var server = http.createServer(function (req, res) {
  console.log("Responding to a request.");
  var filePath = extract(req.url);
  fs.readFile(filePath, function (err, data) {
    if (err) {
      //filePath = path.resolve(__dirname, "app", "errorDisplay.html");
      handleError(err, res);
      return;
    }
    else {
      res.setHeader("Content-Type", mime.getType(req.url));
      res.end(data);
    }
  });
});
//tell the server to listen on port 3000
server.listen(3000);
