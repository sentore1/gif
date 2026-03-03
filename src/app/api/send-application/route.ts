import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_USER,
      subject: "New Application Received - GFI",
      html: `
        <h2>New Application Received</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.middleName} ${data.surname}</p>
        <p><strong>ID Number:</strong> ${data.idNumber}</p>
        <p><strong>Program:</strong> ${data.program}</p>
        <p><strong>Duration:</strong> ${data.duration}</p>
        <p><strong>Education:</strong> ${data.educationLevel} - ${data.specialization}</p>
        <p><strong>Application ID:</strong> ${data.applicationId}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
