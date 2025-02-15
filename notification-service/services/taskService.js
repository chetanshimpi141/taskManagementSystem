const notificationQueue = require("./notificationQueue");

async function sendTaskNotification(task, user) {
  await notificationQueue.add("task_notification", {
    type: "email", // email, sms, push
    userEmail: user.email,
    message: `Task "${task.title}" has been assigned to you.`,
  });
}

module.exports = { sendTaskNotification };
