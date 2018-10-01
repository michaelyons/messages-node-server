const http = require('http');
const url = require('url');
const server = http.createServer();

server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000.');
});

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  } else if (request.method === 'POST') {
    let newMessage = {
      id: new Date()
    };

    request.on('data', data => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});

function addMessage(message, response) {
  message.push(message);
  response.writeHead(200, {
    'Content-Type': 'applcation-json'
  });
  response.write(JSON.stringify(message));
  response.end();
}

function getAllMessages(response) {
  response.writeHead(200, {
    'Content-Type': 'application/json'
  });
  response.write(JSON.stringify(messages));
  response.end();
}

let messages = [
  { id: 1, user: 'brittany storoz', message: 'i hate children' },
  { id: 2, user: 'mike john', message: 'check out my chic shades' },
  { id: 3, user: 'lauren', message: 'i love tennis' }
];
