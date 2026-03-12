import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email, name, status, program } = await request.json();

    if (!email || !name || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const subject =
      status === "approved"
        ? "Application Approved - Global Investment Networks"
        : status === "rejected"
        ? "Application Update - Global Investment Networks"
        : "Application Received - Global Investment Networks";

    const htmlContent =
      status === "approved"
        ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a8a;">Congratulations ${name}!</h2>
        <p>We are pleased to inform you that your application for <strong>${program}</strong> has been approved.</p>
        <p>Our team will contact you shortly with the next steps and enrollment details.</p>
        <p>Thank you for choosing Global Investment Networks.</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">Global Investment Networks<br>Email: ${process.env.SMTP_FROM}</p>
      </div>
    `
        : status === "rejected"
        ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a8a;">Application Update</h2>
        <p>Dear ${name},</p>
        <p>Thank you for your interest in <strong>${program}</strong> at Global Investment Networks.</p>
        <p>After careful review, we regret to inform you that we are unable to proceed with your application at this time.</p>
        <p>We encourage you to apply again in the future and wish you the best in your endeavors.</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">Global Investment Networks<br>Email: ${process.env.SMTP_FROM}</p>
      </div>
    `
        : `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a8a;">Application Received</h2>
        <p>Dear ${name},</p>
        <p>Thank you for applying to <strong>${program}</strong> at Global Investment Networks.</p>
        <p>We have received your application and our team will review it shortly. You will be notified once a decision has been made.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">Global Investment Networks<br>Email: ${process.env.SMTP_FROM}</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
