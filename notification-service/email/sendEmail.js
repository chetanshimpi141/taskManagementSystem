const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT == 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ assigneeEmail , title ,description, assigneeId }) => {
  console.log("SMTP Config:", process.env.EMAIL_HOST, process.env.EMAIL_PORT);
  try {
    const info = await transporter.sendMail({
      from: `"Task Manager" <${process.env.EMAIL_USER}>`,
      to:assigneeEmail,
      subject: "New Task Assigned",
      text: `You have a new task assigned: ${title}
            \n Task Description : ${description}
            \n Task ID :${assigneeId}`,
    });

    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};

module.exports = sendEmail;
