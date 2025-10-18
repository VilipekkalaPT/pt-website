import { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  label: string;
  type: "text" | "textarea";
  register: UseFormRegisterReturn;
  error?: string;
}

export default function FormField({
  label,
  type,
  register,
  error,
}: FormFieldProps) {
  const InputComponent = type === "textarea" ? "textarea" : "input";

  return (
    <>
      <label className="leading-[1.4] text-left">{label}</label>
      <InputComponent
        {...register}
        className="bg-black/50 border border-border-default-primary rounded-lg p-4"
      />
      {error && <p className="text-red-500 text-sm pt-1">{error}</p>}
    </>
  );
}
