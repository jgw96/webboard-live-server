const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(process.env.PORT || 3000);

let mainSocket;

app.get('/', (req, res) => {
    res.send('hello world');
});

app.post('/join', (req, res) => {
    if (req.body.roomName) {
        mainSocket.join(req.body.roomName, (err) => {
            if (!err) {
                res.status(200).send({ message: `joined ${req.body.roomName}` })
            }
        });
    }
});

app.post('/leave', (req, res) => {
    if (req.body.roomName) {
        mainSocket.leave(req.body.roomName, (err) => {
            if (!err) {
                res.status(200).send({ message: `left ${req.body.roomName}` })
            }
        })
    }
})

io.on('connection', (socket) => {
    mainSocket = socket;

    mainSocket.emit('news', { hello: 'world' });

    mainSocket.on('my other event', (data) => {
        console.log(data);
    });

    mainSocket.on('pointerMove', (data) => {
        console.log(data);
    });

    mainSocket.on('pointerUp', (data) => {
        console.log(data);
    });
});