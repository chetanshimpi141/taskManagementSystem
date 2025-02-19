const express= require("express");
const dotenv = require ("dotenv");
const cors = require ("cors");
const { addNotificationJob } = require ("./queue/queue");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/notify", async (req, res) => {
  console.log('notify called')  
  try {
    const { to, subject, text, type, scheduledAt } = req.body;

    await addNotificationJob({ to, subject, text, type, scheduledAt });

    res.status(200).json({ message: "Notification added to queue" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add notification job" });
  }
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
