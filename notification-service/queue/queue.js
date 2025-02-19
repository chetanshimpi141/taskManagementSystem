const { Queue } = require ("bullmq");
const dotenv = require ("dotenv");

dotenv.config();
console.log( process.env.REDIS_HOST);

const notificationQueue = new Queue("notification-queue", {connection: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }});

const addNotificationJob = async (data) => {
  console.log("📥 Adding job to queue:", data);
  await notificationQueue.add("send-notification", data, {
    attempts: 3,
    delay: data.scheduledAt ? new Date(data.scheduledAt).getTime() - Date.now() : 0,
  });
  console.log("added to notification");
  
};

module.exports =  { notificationQueue,  addNotificationJob };
