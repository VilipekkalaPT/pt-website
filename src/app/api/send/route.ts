import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken: process.env.GOOGLE_ACCESS_TOKEN,
  },
});

export async function POST(request: Request) {
  const { name, email, message, subject } = await request.json();

  if (!name || !email || !message)
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );

  try {
    await transporter.sendMail({
      replyTo: email,
      to: process.env.GOOGLE_USER,
      subject: `Message from ${name}: ` + subject,
      html: message,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
