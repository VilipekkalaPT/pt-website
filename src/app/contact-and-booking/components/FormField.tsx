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
      <label className="block mt-5 font-medium">{label}</label>
      <InputComponent
        {...register}
        className="mt-1 p-2 block w-full rounded-md border border-gray-300"
      />
      {error && <p className="text-red-500 text-sm pt-1">{error}</p>}
    </>
  );
}
