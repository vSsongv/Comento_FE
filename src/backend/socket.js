const SocketIO = require("socket.io");

module.exports = (server, app) => {
  const io = SocketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    app.set("io", io);

    socket.on("join", (data) => {
      socket.join(data);
    });
    socket.on("connect", () => {
      console.log("connect");
    });
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
