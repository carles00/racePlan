import express from 'express'
import { createServer } from 'node:http'
import {Server} from 'socket.io'
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173"
  }
});


app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

io.on("connection", (socket) => {
  console.log('a user connected');
  socket.on('test', (...args)=>{
    console.log(args)
  })
});

const port = 4000;
httpServer.listen(port);
console.log(`Server started on port ${port}`)
