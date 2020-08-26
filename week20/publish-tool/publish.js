const http = require("http");
// const fs = require('fs');
// const { fstat } = require('fs');
// const querystring = require("querystring");
const archiver = require('archiver');
const child_process = require('child_process');

// const postData = querystring.stringify({
//   "content": "Hello World!2222"
// })

let packName = "./package";
// fs.stat(filename, (error, stat) => {

let redirect_uri = encodeURIComponent("http://localhost:8081/auth");
child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.17d29ae55d14ecd7&redirect_uri=${redirect_uri}`);

const server = http.createServer((request, res) => {

  let token = request.url.match(/token=([^&]+)/)[1];
  console.log('real publish!!!');
  const options = {
    host: "localhost",
    port: 8081,
    path: "/?filename=package.zip",
    method: "POST",
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "token": token,
      "Content-Type": "application/octet-stream",
    }
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    // res.setEncoding('utf8');
    // res.on('data', (chunk) => {
    //   console.log(`BODY: ${chunk}`) ;
    // });
    // res.on('end', () => {
    //   console.log('No more data in response.');
    // });
  });
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.directory(packName, false);
  archive.finalize();
  archive.pipe(req);

  archive.on("end", () => {
    req.end();
    console.log("publish success!!!");
    res.end("publish success !!");
    server.close();
  });

});
server.listen(8080);

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