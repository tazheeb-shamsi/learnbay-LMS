import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import ejs from 'ejs';

dotenv.config()

const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = process.env.SMTP_PORT
const SMTP_SERVICE = process.env.SMTP_SERVICE
const SMTP_EMAIL = process.env.SMTP_EMAIL
const SMTP_EMAIL_PASSWORD = process.env.SMTP_EMAIL_PASSWORD

interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: {
    [key: string]: any
  }
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || '587') ,
    service: SMTP_SERVICE,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_EMAIL_PASSWORD
    }
  })

  const { email, subject, template, data } = options;
  //getting the path to the email template file
  const templatePath = path.join(__dirname, "../mail", template)
  // rendering the email template
  const emailTemplate: string = await ejs.renderFile(templatePath, data)

  const emailOptions = {
    from: SMTP_EMAIL,
    to: email,
    subject,
    html:emailTemplate
  }
  await transporter.sendMail(emailOptions)
}

export default sendEmail;