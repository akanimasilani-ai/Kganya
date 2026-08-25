import { Resend } from "resend";
import nodemailer from "nodemailer";

type EmailProvider = "resend" | "smtp";

const provider: EmailProvider = (process.env.EMAIL_PROVIDER || "resend") as EmailProvider;

let transporter: any = null;

if (provider === "smtp") {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

const resend = provider === "resend" ? new Resend(process.env.RESEND_API_KEY) : null;

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: EmailOptions) {
  const fromEmail = from || process.env.EMAIL_FROM || "noreply@kganya.local";

  try {
    if (provider === "resend" && resend) {
      const result = await resend.emails.send({
        from: fromEmail,
        to,
        subject,
        html,
      });
      return result;
    } else if (provider === "smtp" && transporter) {
      const result = await transporter.sendMail({
        from: fromEmail,
        to,
        subject,
        html,
      });
      return result;
    } else {
      console.log("Email would be sent:", { to, subject });
      return { success: true, message: "Email service not configured" };
    }
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}

// Email Templates

export function registrationEmail(name: string, email: string) {
  return {
    subject: "Welcome to Kganya Royal Funeral Services",
    html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: Arial, sans-serif; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background-color: #1e3a5f; color: white; padding: 20px; text-align: center; }
      .header h1 { margin: 0; font-size: 24px; }
      .content { padding: 20px; background-color: #f9f9f9; }
      .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
      .button { 
        display: inline-block; 
        background-color: #d4af37; 
        color: #1e3a5f; 
        padding: 12px 24px; 
        text-decoration: none; 
        border-radius: 4px; 
        font-weight: bold;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Kganya Royal Funeral Services</h1>
        <p>Honouring Life with Dignity, Compassion & Excellence</p>
      </div>
      <div class="content">
        <h2>Welcome, ${name}!</h2>
        <p>Thank you for registering with Kganya Royal Funeral Services.</p>
        <p>Your account has been successfully created. You can now:</p>
        <ul>
          <li>Apply for funeral cover</li>
          <li>Submit claims</li>
          <li>Request catering services</li>
          <li>Request tombstone services</li>
          <li>Track your applications and claims</li>
        </ul>
        <a href="${process.env.APP_URL}/auth/login" class="button">Log In to Your Account</a>
        <p><strong>Need assistance?</strong><br>
        Contact us: 071 120 8918 | royalfu neralservice@gmail.com</p>
      </div>
      <div class="footer">
        <p>&copy; 2026 Kganya Royal Funeral Services (Pty) Ltd</p>
      </div>
    </div>
  </body>
</html>
    `,
  };
}

export function applicationSubmittedEmail(
  name: string,
  referenceNumber: string,
  coverType: string
) {
  return {
    subject: `Application Submitted - Reference: ${referenceNumber}`,
    html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: Arial, sans-serif; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background-color: #1e3a5f; color: white; padding: 20px; text-align: center; }
      .content { padding: 20px; background-color: #f9f9f9; }
      .reference-box { 
        background-color: #d4af37; 
        color: #1e3a5f; 
        padding: 15px; 
        margin: 20px 0; 
        text-align: center;
        border-radius: 4px;
      }
      .reference-box h3 { margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase; }
      .reference-box p { margin: 0; font-size: 24px; font-weight: bold; }
      .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Kganya Royal Funeral Services</h1>
      </div>
      <div class="content">
        <h2>Application Submitted Successfully</h2>
        <p>Dear ${name},</p>
        <p>Thank you for submitting your ${coverType} application to Kganya Royal Funeral Services.</p>
        <div class="reference-box">
          <h3>Your Reference Number</h3>
          <p>${referenceNumber}</p>
        </div>
        <p><strong>Important:</strong> Please save your reference number. You can use it to track your application status anytime.</p>
        <p>Our team will review your application within 3-5 business days. You will receive an email notification when there's an update.</p>
        <p><strong>Track your application:</strong><br>
        Visit: ${process.env.APP_URL}/track?ref=${referenceNumber}</p>
        <p>If you have any questions, please contact us:<br>
        Phone: 071 120 8918<br>
        Email: royalfu neralservice@gmail.com</p>
      </div>
      <div class="footer">
        <p>&copy; 2026 Kganya Royal Funeral Services (Pty) Ltd</p>
      </div>
    </div>
  </body>
</html>
    `,
  };
}

export function claimSubmittedEmail(
  name: string,
  referenceNumber: string,
  deceasedName: string
) {
  return {
    subject: `Claim Submitted - Reference: ${referenceNumber}`,
    html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: Arial, sans-serif; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background-color: #1e3a5f; color: white; padding: 20px; text-align: center; }
      .content { padding: 20px; background-color: #f9f9f9; }
      .reference-box { 
        background-color: #d4af37; 
        color: #1e3a5f; 
        padding: 15px; 
        margin: 20px 0; 
        text-align: center;
        border-radius: 4px;
      }
      .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Kganya Royal Funeral Services</h1>
      </div>
      <div class="content">
        <h2>Claim Submitted Successfully</h2>
        <p>Dear ${name},</p>
        <p>We have received your claim for the late ${deceasedName}.</p>
        <div class="reference-box">
          <h3>Your Claim Reference Number</h3>
          <p>${referenceNumber}</p>
        </div>
        <p>Our claims team will review your submission and contact you if any additional information is required.</p>
        <p><strong>Track your claim status:</strong><br>
        Visit: ${process.env.APP_URL}/track?ref=${referenceNumber}</p>
        <p>Contact us for support:<br>
        Phone: 071 120 8918<br>
        Email: royalfu neralservice@gmail.com</p>
      </div>
      <div class="footer">
        <p>&copy; 2026 Kganya Royal Funeral Services (Pty) Ltd</p>
      </div>
    </div>
  </body>
</html>
    `,
  };
}

export function statusUpdateEmail(
  name: string,
  referenceNumber: string,
  status: string,
  message: string
) {
  return {
    subject: `Application/Claim Status Update - ${status}`,
    html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: Arial, sans-serif; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background-color: #1e3a5f; color: white; padding: 20px; text-align: center; }
      .content { padding: 20px; background-color: #f9f9f9; }
      .status-box { 
        background-color: #d4af37; 
        color: #1e3a5f; 
        padding: 15px; 
        margin: 20px 0; 
        border-radius: 4px;
      }
      .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Kganya Royal Funeral Services</h1>
      </div>
      <div class="content">
        <h2>Status Update</h2>
        <p>Dear ${name},</p>
        <p>There's an update on your submission (Reference: ${referenceNumber})</p>
        <div class="status-box">
          <h3>Current Status: ${status}</h3>
        </div>
        <p>${message}</p>
        <p>For more details, log in to your account or contact us:<br>
        Phone: 071 120 8918<br>
        Email: royalfu neralservice@gmail.com</p>
      </div>
      <div class="footer">
        <p>&copy; 2026 Kganya Royal Funeral Services (Pty) Ltd</p>
      </div>
    </div>
  </body>
</html>
    `,
  };
}
