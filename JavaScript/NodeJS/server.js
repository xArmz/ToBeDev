var http = require("http")

listener = function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
}

http.createServer(listener).listen(3001);

console.log('Server running at http://localhost:3001/');