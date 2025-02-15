const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("register", (userId) => {
    console.log(`User registered for notifications: ${userId}`);
    socket.join(userId); // Join room with user ID
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Function to send a real-time notification
function sendRealTimeNotification(userId, message) {
  io.to(userId).emit("notification", { message });
}

module.exports = { io, sendRealTimeNotification };
