const axios = require("axios");
const dotenv = require("dotenv")
const { addNotificationJob } = require ("../../notification-service/queue");
const { response } = require("express");
dotenv.config();

const notifyUser = async (userEmail, taskTitle,data) => {
    console.log('notification is');
   //const response = res.json() 
  try {
    // const response =[
    //     to: userEmail,
    //     subject: "New Task Assigned",
    //     text: `You have a new task assigned: "${taskTitle}"`,
    //     type: "email",
    // ];
    await addNotificationJob(data);
    // const response = await axios.post("http://localhost:5003/notify", {
    //   to: userEmail,
    //   subject: "New Task Assigned",
    //   text: `You have a new task assigned: "${taskTitle}"`,
    //   type: "email",
    // });
    console.log({notificationResponse:response});
    
    console.log(`Notification sent to ${userEmail} for task: ${taskTitle}`);
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
};

module.exports = notifyUser;