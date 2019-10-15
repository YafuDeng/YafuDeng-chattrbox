var path = require("path");

var extractFilePath = function (url) {
  var filePath;
  var fileName = "index.html";

  if(url.length > 1) {
    fileName = url.substring(1);
  }
  else {
    fileName = "error.html";
  }
  console.log("The fileName is " + fileName);

  filePath = path.resolve(__dirname, "app", fileName);
  return filePath;
};

module.exports = extractFilePath;
