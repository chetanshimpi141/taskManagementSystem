const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shimpic676@gmail.com",
    pass: "shimpic676",
  },
});

async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: "shimpic676@gmail.com",
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendEmail;
