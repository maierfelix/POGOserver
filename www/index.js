import http from "http";
import url from "url";
import path from "path";
import fs from "fs";
const port = process.argv[2] || 9000;

http.createServer((request, response) => {
  const uri = url.parse(request.url).pathname;
  let filename = path.join(process.cwd(), uri);

  fs.exists(filename, exists => {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/api/index.html';

    fs.readFile(filename, "binary", (err, file) => {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(`${err}\n`);
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));

console.log(`Web-API for POGOserver running at => http://localhost:${port}/\nCTRL + C to shutdown`);