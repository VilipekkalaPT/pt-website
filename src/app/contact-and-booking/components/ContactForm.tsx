"use client";

import Button from "app/components/Button";
import sendEmailService from "app/lib/sendEmailService";
import { TypeContactFormFields } from "app/lib/types/contentful";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface ContactFormProps {
  contactFormData: TypeContactFormFields;
}

export default function ContactForm({ contactFormData }: ContactFormProps) {
  const { title, subtitle } = contactFormData;
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSending(true);

    const res = await sendEmailService(form);

    if (res.ok) {
      toast.success("Message sent successfully!");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      toast.error("Failed to send message");
    }
    setIsSending(false);
  };

  return (
    <>
      <p className="text-3xl font-bold text-center">{title}</p>
      <p className="text-xl mt-2 text-center">{subtitle}</p>
      <form className="w-1/3 mx-auto mt-6" onSubmit={handleSubmit}>
        <label className="block">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mt-1 p-2 block w-full rounded-md border border-gray-300"
          required
        />
        <label className="block mt-5 text-sm font-medium">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mt-1 p-2 block w-full rounded-md border border-gray-300"
          type="email"
          required
        />
        <label className="block mt-5 text-sm font-medium">Subject</label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="mt-1 p-2 block w-full rounded-md border border-gray-300"
          required
        />
        <label className="block mt-5 text-sm font-medium">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          className="mt-1 p-2 block w-full rounded-md border border-gray-300"
          required
        />
        <Button
          type="submit"
          label={`${isSending ? "Sending..." : "Send"}`}
          disabled={isSending}
          variant="primary"
          className="w-full mt-5 flex justify-center disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => {}}
        />
      </form>
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
}
