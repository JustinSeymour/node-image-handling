var http = require('http');
var url = require('url');
var _data = require('./data');

var server = http.createServer((req,res) => {

    var parsedUrl = url.parse(req.url, true);

    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    var method = req.method.toLowerCase();

    var queryStringObject = parsedUrl.query;

    var headers = req.headers;

    let body = [];

    //req.setEncoding('binary');

    req.on('data', (chunk) => {
        body.push(chunk);
    });

    

    req.on('end', () => {
        var imageBuffer = Buffer.concat(body);
        let timeStamp = Date.now().toString();
        _data.create('test',timeStamp, imageBuffer, '.jpeg', (err) => {
            if(!err) {
                res.writeHead(200, {'Content-Type': 'image/jpeg' });
                res.end(imageBuffer);
            } else {
                console.log(err);
                res.statusCode = 500;
                res.end();
            };
        });
    });
});

server.listen(3000, () => {
    console.log('The server is up and running');
});