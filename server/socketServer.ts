const http = require("http");
const { Server: SocketIOServer } = require("socket.io");

export const initSocketServer = (server) => {
  const io = new SocketIOServer(server);

  io.on("connection", (socket) => {
    console.log("🎉 A user connected");

    // Listen for incoming notification events from frontend
    socket.on("notification", (data) => {
      // Broadcasting the data to all connected clients (adminDashboard)
      io.emit("newNotification", data);
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected");
    });
  });
};
