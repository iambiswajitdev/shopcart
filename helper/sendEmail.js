import nodemailer from "nodemailer";
import config from "../config.js";

export default async function ({
  from,
  to,
  subject = "",
  text = "",
  html = "",
}) {
  const transport = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });

  let mailOptions = {
    from,
    to,
    subject,
    text,
    html,
  };

  return await transport.sendMail(mailOptions);
}
