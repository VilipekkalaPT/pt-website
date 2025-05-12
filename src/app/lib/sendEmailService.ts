import { toast } from "react-toastify";

export interface FormInput {
  name: string;
  email: string;
  message: string;
}

export default async function sendEmailService(form: FormInput) {
  try {
    const res = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success("Message sent successfully!");
    } else {
      toast.error("Failed to send message");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    toast.error("Failed to send message");
  }
}
