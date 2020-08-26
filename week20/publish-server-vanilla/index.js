const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');
const https = require('https');
const path = require('path');

// Create an HTTP server
const server = http.createServer((req, res) => {

  if (req.url.match(/^\/auth/)) {
    return auth(req, res);
  }

  if (!req.url.match(/^\/favicon.ico/)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not found');
    return;
  }

  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: `/user`,
    method: 'GET',
    headers: {
      'Authorization': `token ${req.headers.token}`,
      'User-Agent': 'toy-publisher'
    }
  };

  const request = https.request(options, (response) => {
    let body = "";
    response.on('data', (d) => {
      body += d.toString();
    });
    response.on('end', () => {
      let user = JSON.parse(body);
      console.log(user);
      //TODO 权限检查
      let writeStream = unzip.Extract({ path: '../server/public' });
      req.pipe(writeStream);
      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('okay');
      });
    });
  });

  request.on('error', (e) => {
    console.error(e);
  });


  // let matched = req.url.match(/filename=([^&]+)/);
  // let filename = matched && matched[1];
  // if (!filename) {
  //   return;
  // }
  // let writeStream = fs.createWriteStream("../server/public/", filename);

  let writeStream = unzip.Extract({ path: '../server/public' });
  req.pipe(writeStream);

  // pipe 等同于 on data , on end
  // req.on('data', trunk => {
  //   writeStream.write(trunk);
  // })
  // req.on('end', trunk => {
  //   writeStream.end(trunk);
  // })

  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
  });
  req.end();
});
server.listen(8081);

function auth(req, res) {
  let code = req.url.match(/code=([^&]+)/)[1];
  let state = "abc123";
  let client_secret = "93f808695c66deba19c543cac59b76c87cd5873";
  let client_id = "Iv1.17d29ae55d14ecd";
  let redirect_uri = encodeURIComponent("http://localhost:8081/auth");

  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;
  let url = `https://github.com/login/oauth/access_token?${params}`;

  const options = {
    hostname: 'github.com',
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    method: 'POST'
  }

  const request = https.request(options, (response) => {
    console.log('statusCode:', response.statusCode);
    console.log('headers:', response.headers);

    response.on('data', (d) => {
      let result = d.toString().match(/access_token=([^&]+)/);
      if (result) {
        let token = result[1];
        res.writeHead(200, {
          'access_token': token,
          'Content-Type': 'text/plain'
        });
        res.end(`<a href="http://localhost:8080/publish?token=${token}">publish</a>`);
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end('error');
      }
    });
  });

  request.on('error', (e) => {
    console.error(e);
  });
  request.end();

  // let code = req.url.match(/code=([^&]+)/);
  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  // res.end('okay');
}