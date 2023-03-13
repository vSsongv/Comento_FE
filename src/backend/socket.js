const SocketIO = require("socket.io");

module.exports = (server, app) => {
  const io = SocketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("파쿠르할게", socket.request.headers.referer);
    const req = socket.request;
    app.set("io", io);
    const {
      headers: { referer },
    } = req;
    const roomId = referer.split("/")[referer.split("/").length - 1];
    socket.join(roomId);

    socket.on("disconnect", () => {
      console.log("A user disconnected");
      socket.leave(roomId);
    });
  });
};
