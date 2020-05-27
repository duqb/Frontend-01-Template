const http = require('http');
const hostname = '127.0.0.1';
const port = 8088;
const server = http.createServer((req, res) => {
  console.log('request received');
  console.log(req.headers);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHeader(200, { 'Content-Type': 'text/plain' });
  res.end(
    `<html meta=a>
<head>
    <style>
#container {
    width:500px;
    height:300px;
    display:flex;
    background-color: rgba(255, 255, 255);
}
#container #myid {
    width:200px;
    height:100px;
    background-color: rgba(255, 0, 0);
}
#container .c1 {
    flex: 1;
    background-color: rgba(0, 255, 0);
}
    </style>
</head>
<body>
    <div id="container">
        <div id="myid"/>
        <div class="c1" />
    </div>
</body>
</html>
`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});