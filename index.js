import { WebSocketServer } from 'ws';
import http from 'http';
import fs from 'fs';
import path from 'path';

const server = http.createServer((req, res) => {
	let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    let contentType = getContentType(filePath);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
	console.log('Client connected.');

  ws.on('message', function message(data) {
    console.log('received message:', data);

    // Echo back the received message
    ws.send('Received: ${data}');
  });

  ws.on('close', function close() {
  	console.log('Client disconnected.');
  });
});

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// server.use()


// Function to determine content type based on file extension
function getContentType(filePath) {
    let extname = path.extname(filePath).toLowerCase();
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.js':
            return 'text/javascript';
        case '.css':
            return 'text/css';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        default:
            return 'application/octet-stream';
    }
}