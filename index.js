// front
import express from 'express'
import { Server } from 'socket.io';
import cors from 'cors'

const app = express();
const port = 3000

app.use(cors('http://localhost:3000'))

const server = app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
})

const io = new Server (server, {
    cors: {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.log('Un client est connecté');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Un client est déconnecté');
    });
});
