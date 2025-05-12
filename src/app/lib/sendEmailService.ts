interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default async function sendEmailService(form: FormData) {
  const res = await fetch("/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  return res;
}
