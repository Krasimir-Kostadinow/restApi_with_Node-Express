const { write } = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Hello World');
        res.end();
    };

    if (req.url === '/api/course') {
        res.write(JSON.stringify({name: 'Krasi', age: 40}));
        res.end();
    };
});



server.listen(3000);
console.log('Listening port 3000...');