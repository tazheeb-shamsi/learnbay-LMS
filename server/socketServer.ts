import http from "http";
import { Server as SocketIOServer } from "socket.io";

export const initSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server);

  io.on("connection", (socket) => {
    console.log("🎉 A user connected");

    //Listen for incoming notification events from frontend
    socket.on("notification", (data) => {
      //brodcasting the data to all connected clients (adminDashboard)
      io.emit("newNotification", data);
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected");
    });
  });
};
