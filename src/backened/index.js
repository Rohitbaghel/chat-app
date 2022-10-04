const express = require("express");
const { Server } = require("socket.io");
var http = require("http");
const cors = require("cors");
const {Encrypt}=require("./aes");

const app = express();
app.use(cors());

var server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Chat BE with Socket.io by Rohit Baghel");
  res.end();
});

io.on("connection", (socket) => {
  // console.log(socket.id);

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("newMessage", ({ newMessage, room }) => {
const {time,msg,name } = newMessage;
    io.in(room).emit("getLatestMessage", {time, msg:Encrypt(msg), name});
  console.log(Encrypt(msg));
  });
});

const port = process.env.PORT || 8000;

server.listen(port, console.log(`App started at port ${port}`));
