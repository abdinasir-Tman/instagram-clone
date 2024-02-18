import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdinasirmursal2@gmail.com",
    pass: process.env.APP_PASS,
  },
});

const sendVerificationEmail = async (to, info) => {
  let html = `
 <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verification</title>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
    }
    .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
        text-align: center;
        background-color: #007bff;
        color: #ffffff;
        padding: 10px;
        border-radius: 5px 5px 0 0;
    }
    .content {
        padding: 20px;
        text-align: center;
    }
    a.verify-button {
        display: inline-block;
        background-color: #28a745;
        color: #ffffff;
        padding: 10px 20px;
        text-decoration: none;
        margin-top: 20px;
        border-radius: 5px;
    }
    .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 12px;
        color: #777777;
    }
</style>
</head>
<body>
<div class="container">
    <div class="header">
        <h2>Welcome to Instagram-clone</h2>
    </div>
    <div class="content">
        <p>Hello ${info.name},</p>
        <p>Thank you for signing up. Please click the button below to verify your email address and activate your account:</p>
        <a href="${info.token}" class="verify-button">Verify Email</a>
        <p>This link will expire in 2 hours. If you did not request this, please ignore this email or contact us for assistance.</p>
    </div>
    <div class="footer">
        <p>If you have any questions, contact us at ${`abdinasirmursal2@gmail.com`}.</p>
        <p>&copy; ${new Date().getFullYear()} Instagram-clone. All rights reserved.</p>
    </div>
</div>
</body>
</html>


  `;
  try {
    const mailOptions = {
      from: "abdinasirmursal2@gmail.com",
      to,
      subject: "Verification",
      html: html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error at email send ", error);
  }
};

export default sendVerificationEmail;
