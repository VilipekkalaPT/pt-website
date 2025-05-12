"use client";

import Button from "app/components/Button";
import sendEmailService, { FormInput } from "app/lib/sendEmailService";
import { TypeContactFormFields } from "app/lib/types/contentful";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import FormField from "./FormField";

interface ContactFormProps {
  contactFormData: TypeContactFormFields;
}

export default function ContactForm({ contactFormData }: ContactFormProps) {
  const { title, subtitle } = contactFormData;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const [isSending, setIsSending] = useState(false);

  const onSubmit: SubmitHandler<FormInput> = async (data: FormInput) => {
    setIsSending(true);
    await sendEmailService(data);
    setIsSending(false);
  };

  return (
    <>
      <p className="text-3xl font-bold text-center">{title}</p>
      <p className="text-xl mt-2 text-center">{subtitle}</p>
      <form className="w-1/3 mx-auto mt-6" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Name*"
          type="text"
          register={register("name", { required: "Name is required" })}
          error={errors.name?.message}
        />
        <FormField
          label="Email*"
          type="text"
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          error={errors.email?.message}
        />
        <FormField
          label="Message*"
          type="textarea"
          register={register("message", { required: "Message is required" })}
          error={errors.message?.message}
        />
        <Button
          type="submit"
          label={`${isSending ? "Sending..." : "Send"}`}
          disabled={isSending}
          variant="primary"
          className="w-full mt-5 flex justify-center disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
        />
      </form>
      <ToastContainer autoClose={2000} hideProgressBar />
    </>
  );
}
