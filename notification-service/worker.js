const {Worker} = require("bullmq");
const dotenv  = require ("dotenv");
const sendEmail  = require ("./email/sendEmail.js");

dotenv.config();

const worker = new Worker("notification-queue",
  async (job) => {
    console.log("Processing Notification:", job.data);

    //if (job.data.type === "assigneeEmail") {
        console.log(`in send emil  ${job.data} `)
      await sendEmail(job.data);
    //}

    console.log("Notification sent:", job.data);
  },
  { connection: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT,password: process.env.REDIS_PASSWORD } }
);

worker.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed with error: ${err.message}`);
});

module.exports =  { worker };