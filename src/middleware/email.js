const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

module.exports = (email_user, subject, url, name) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email_user,
    subject: `${subject} is your otp`,
    text: `Hello ${name} \n your otp is ${subject}`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Error " + err);
      console.log("email not sent!");
    } else {
      console.log("Email sent successfully");
      return "email sent successfully";
    }
  });
};
