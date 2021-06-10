const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});



io.on("connection", (socket) => {
  console.log(`Socket Client connected with id=${socket.id}`);
  socket.on("new message", (msg) => {
    console.log(msg);
    io.emit("new message", msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
