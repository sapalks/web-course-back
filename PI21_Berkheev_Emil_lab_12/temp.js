const fs = require("fs");
var base64_convert = require('base64-js'); 
var content = fs.readFileSync("test/Image_00001.jpg");
console.log(base64_convert.fromByteArray(content));

 