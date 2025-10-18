"use client";

import Image from "next/image";
import Button from "app/components/Button";
import sendEmailService, { FormInput } from "app/lib/sendEmailService";
import { TypeContactFormFields } from "app/lib/types/contentful";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import FormField from "./FormField";
import { SEND_WHATSAPP } from "app/utils/variables";
import { whatsappDomain } from "app/utils/routes";

interface ContactFormProps {
  contactFormData: TypeContactFormFields;
  whatsappLink?: string;
}

export default function ContactForm({
  contactFormData,
  whatsappLink,
}: ContactFormProps) {
  const { title, subtitle } = contactFormData;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>();
  const [isSending, setIsSending] = useState(false);

  const onSubmit: SubmitHandler<FormInput> = async (data: FormInput) => {
    setIsSending(true);
    await sendEmailService(data, reset);
    setIsSending(false);
  };

  const openWhatsApp = () => {
    if (!whatsappLink) return;
    const url = `${whatsappDomain}${whatsappLink}`;
    window.open(url, "_blank");
  };

  return (
    <div className="mt-40 w-4/5 mx-auto text-center">
      <p className="title-hero">{title}</p>
      <p className="subtitle">{subtitle}</p>
      <form
        className="mt-8 w-1/3 mx-auto p-4 bg-black/50 border border-border-default-primary flex flex-col rounded-lg justify-start gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        {!!whatsappLink && (
          <Button
            type="button"
            label={SEND_WHATSAPP}
            disabled={isSending}
            variant="ghost"
            glassmorphism
            className="mt-1 justify-center"
            onClick={openWhatsApp}
            iconRight={
              <Image
                src="/whatsapp.svg"
                alt="Logo"
                width={24}
                height={24}
                className=""
              />
            }
          />
        )}
        <Button
          type="submit"
          label={`${isSending ? "Sending..." : "Send"}`}
          disabled={isSending}
          variant="primary"
          glassmorphism
          hasShadow
          className="w-full mt-4 flex justify-center disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
        />
      </form>
      <ToastContainer autoClose={2000} hideProgressBar />
    </div>
  );
}
