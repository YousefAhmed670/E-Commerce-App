import EventEmitter from 'events';
import { sendMail } from '../mail';
export const eventEmitter = new EventEmitter();
eventEmitter.on(
  'userRegistered',
  async ({ email, otp }: { email: string; otp: string }) => {
    await sendMail({
      to: email,
      from: `E-Commerce-App <${process.env.NODEMAILER_USER}>`,
      subject: 'register OTP',
      html: `<h2>your OTP is:</h2>
        <h1>${otp}</h1>
        <p>OTP will expire in 10 minutes</p>`,
    });
  },
);
eventEmitter.on(
  'sendOTP',
  async ({ email, otp }: { email: string; otp: string }) => {
    await sendMail({
      to: email,
      from: `E-Commerce-App <${process.env.NODEMAILER_USER}>`,
      subject: 'send OTP',
      html: `<h2>your OTP is:</h2>
        <h1>${otp}</h1>
        <p>OTP will expire in 10 minutes</p>`,
    });
  },
);
