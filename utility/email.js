const dotenv = require("dotenv").config({ path: "./config.env" });
const nodeMailer = require("nodemailer");
class Email {
  constructor(user, url) {
    console.log(user);
    this.to = user.dataValues.email;
    this.firstName = user.dataValues.first_name;
    this.url = url;
    this.from = process.env.FROM;
  }
  newTransport() {
    return nodeMailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  async sendMessage() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Your password reset token (valid for 10 minutes)",
      text: `this is reset token password ${this.url}  .Your password reset token (valid for 10 minutes)`,
    };
    await this.newTransport().sendMail(mailOptions);
  }
}

module.exports = Email;
