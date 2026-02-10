const fs = require('fs');
const http = require('http');

const allData = JSON.parse(fs.readFileSync('sensor_data_500.json', 'utf-8'));
let entry = [];
let idx = 0;

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

    if(req.method === 'GET' && parsedUrl.pathname === '/'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(fs.readFileSync('../frontend/index.html'));
    }
    if(req.method === 'GET' && parsedUrl.pathname === '/script.js'){
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        return res.end(fs.readFileSync('../frontend/script.js'));
    }
    if(req.method === 'GET' && parsedUrl.pathname === '/style.css'){
        res.writeHead(200, { 'Content-Type': 'text/css' });
        return res.end(fs.readFileSync('../frontend/style.css'));
    }

    if(req.method === 'GET' && parsedUrl.pathname === '/api/telemetry/latest'){
        const data = entry[entry.length - 1] || {};
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(data));
    }

    if(req.method === 'GET' && parsedUrl.pathname === '/api/telemetry/history'){
        const n = parseInt(parsedUrl.searchParams.get('limit')) || 10;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(entry.slice(-n)));
    }
    if(req.method === 'POST' && parsedUrl.pathname === '/api/telemetry'){
        let body = '';
        req.on('data', chunk =>{ body += chunk.toString(); });
        req.on('end', () =>{
            try {
                const payload = JSON.parse(body);
                const { depth, pressure, temperature, direction, timestamp } = payload;
                const isValid = 
                    typeof depth === 'number' &&
                    typeof pressure === 'number' &&
                    typeof temperature === 'number' &&
                    typeof direction === 'number' && direction >= 0 && direction <= 360 &&
                    typeof timestamp === 'string';

                if (!isValid) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    return res.end('Invalid telemetry payload');
                }

                entry.push(payload);
                if (entry.length > 100) entry.shift();

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Telemetry stored' }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON payload');
            }
        });
        return;
    }
    res.writeHead(404);
    res.end('Not Found');
});

setInterval(() => {
    entry.push(allData[idx]);
    if (entry.length > 100) entry.shift();
    idx = (idx + 1) % 500;
}, 5000);

server.listen(3000, () => console.log('Server live at http://localhost:3000'));