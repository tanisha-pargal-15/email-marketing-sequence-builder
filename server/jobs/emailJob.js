const sendEmail = require('../emailService');

module.exports = (agenda) => {
  agenda.define('send-email', async (job) => {
    const { to, subject, text } = job.attrs.data;
    await sendEmail({ to, subject, text });
  });
};
