const nodemailer = require('nodemailer');


const sendEmail = async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;  
      // Create nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      // Email options for the user
      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // Send the email to the user
        subject: 'Confirmation de réception de votre message',
        text: `Cher(ère) ${name},\n\nMerci de nous avoir contactés! Votre message a bien été reçu et nous reviendrons vers vous dès que possible.\n\nCordialement,\nL'équipe DL Motors`,
      };
  
      // Email options for your team
      const teamMailOptions = {
        from: email,
        to: process.env.DESTINATION_EMAIL,
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
      };
  
      // Send emails
      const [userResponse, teamResponse] = await Promise.all([
        transporter.sendMail(userMailOptions),
        transporter.sendMail(teamMailOptions),
      ]);
  
      // Check if both emails were sent successfully
      if (userResponse && teamResponse) {
        res.status(200).send('Emails sent successfully.');
      } else {
        res.status(500).send('Error sending emails.');
      }
    } catch (error) {
      console.error('Error sending emails:', error);
      res.status(500).send(error.toString());
    }
  };
  

module.exports = {
  sendEmail,
};
