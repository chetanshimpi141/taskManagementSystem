const { Worker } = require("bullmq");
const Redis = require("ioredis");
const sendEmail = require("./emailService");
const { sendRealTimeNotification } = require("./webSocketServer");

const connection = new Redis();

const notificationWorker = new Worker(
  "notifications",
  async (job) => {
    console.log(`Processing job: ${job.id} - ${job.data.type}`);

    // Email Notification
    if (job.data.type === "email") {
      await sendEmail(job.data.userEmail, "Task Update", job.data.message);
    }

    // Real-time Notification via WebSockets
    if (job.data.type === "real-time") {
      sendRealTimeNotification(job.data.userId, job.data.message);
    }
  },
  { connection }
);

console.log("Notification Worker Started...");
