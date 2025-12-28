import express from 'express'
import { createServer } from 'node:http'
import {Server} from 'socket.io'

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173"
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

io.on("connection", (socket) => {
  console.log('a user connected');
  socket.on('test', (...args)=>{
    console.log(args)
  })
});

const port = 5000;
httpServer.listen(port);
console.log(`Server started on port ${port}`)