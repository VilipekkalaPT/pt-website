import { UseFormReset } from "react-hook-form";
import { toast } from "react-toastify";

export interface FormInput {
  name: string;
  email: string;
  message: string;
}

export default async function sendEmailService(
  form: FormInput,
  resetForm: UseFormReset<FormInput>
) {
  try {
    const res = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Message sent successfully!");
      resetForm();
      return;
    }

    if (res.status === 400) {
      toast.error(data.error);
      return;
    }

    toast.error("Failed to send message");
  } catch (error) {
    console.error("Error sending email:", error);
    toast.error("Failed to send message");
  }
}
