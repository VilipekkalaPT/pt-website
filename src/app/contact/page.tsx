"use client";

import Button from "app/components/Button";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-30 ">
      <p className="text-3xl font-bold text-center">Contact & Booking</p>
      <p className="text-xl mt-2 text-center">
        Start the conversation - no cost, no pressure
      </p>
      <form className="w-1/3 mx-auto mt-6">
        <label className="block">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mt-1 p-1 block w-full rounded-md border border-gray-300"
          required
        />
        <label className="block mt-5 text-sm font-medium">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mt-1 p-1 block w-full rounded-md border border-gray-300"
          type="email"
          required
        />
        <label className="block mt-5 text-sm font-medium">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          className="mt-1 p-1 block w-full rounded-md border border-gray-300"
          rows={4}
          required
        />
        <Button
          type="submit"
          label="Submit"
          variant="primary"
          className="w-full mt-5 flex justify-center"
          onClick={() => {}}
        />
      </form>
    </div>
  );
}
