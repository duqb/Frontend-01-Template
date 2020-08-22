const http = require("http");
const fs = require('fs');
// const querystring = require("querystring");

var archiver = require('archiver');

// const postData = querystring.stringify({
//   "content": "Hello World!2222"
// })

let packname = "./package";
// fs.stat(filename, (error, stat) => {

const options = {
  host: "localhost",
  port: 8081,
  path: "/?filename=package.zip",
  method: "POST",
  headers: {
    "Content-Type": "application/octet-stream",
  }
};

var archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

archive.directory(packname, false);
archive.finalize();
archive.pipe(req);

archive.on("end", () => {
  req.end();
});

/*
let readStream = fs.createReadStream("./" + filename);
readStream.pipe(req);
readStream.on("end", () => {
    req.end();
});
*/

    // Write data to request body
    // req.write(postData);
    // req.end();
// })