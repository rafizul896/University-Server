import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production', // true for port 465, false for other ports
    auth: {
      user: 'rafizulislam896@gmail.com',
      pass: 'cppp djgo uidm wbzr',
    },
  });

  await transporter.sendMail({
    from: 'rafizulislam896@gmail.com', // sender address
    to, // recipient's email address
    subject: 'Account Password Change Request', // Subject line
    text: `Reset your password within 10 minutes!`, // plain text body
    html,
    // html: `
    // <p>Dear User,</p>
    // <p>We have received a request to change the password for your university account. If you made this request, please proceed to reset your password using the provided instructions.</p>
    // <p>If you did not request this change, we recommend securing your account by updating your password and enabling additional security measures.</p>
    // <p>For further assistance, please contact our support team.</p>
    // <p>Best regards,<br>University Support Team</p>
    // `, // HTML body
  });
};
