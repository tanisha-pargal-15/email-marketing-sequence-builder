const express = require('express');

const router = express.Router();

module.exports = (agenda) => {
  router.post('/schedule-email', async (req, res) => {
    const { to, subject, text, delayInMinutes } = req.body;

    try {
      await agenda.schedule(`${delayInMinutes} minutes`, 'send-email', {
        to,
        subject,
        text,
      });

      res.status(200).json({ message: '✅ Email scheduled successfully' });
    } catch (err) {
      console.error("❌ Failed to schedule email:", err);
      res.status(500).json({ error: 'Failed to schedule email' });
    }
  });

  return router;
};
