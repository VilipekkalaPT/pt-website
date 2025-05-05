import { format } from "date-fns";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "dd MMMM, yyyy");
};

export const isStringArray = (input: Array<unknown>): input is string[] => {
  return (
    Array.isArray(input) && input.every((item) => typeof item === "string")
  );
};

export const getTitle = (title: string) => {
  const words = title.split("-");
  return words[0];
};
