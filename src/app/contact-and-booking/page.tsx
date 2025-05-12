import { getEntries } from "app/lib/contentfulDataService";
import ContactForm from "./components/ContactForm";
import { TypeContactFormSkeleton } from "app/lib/types/contentful/TypeContactForm";
import Divider from "app/components/Divider";

export default async function Contact() {
  const contactFormData = await getEntries<TypeContactFormSkeleton>(
    "contactForm"
  );

  return (
    <div className="mt-30">
      <ContactForm contactFormData={contactFormData[0]} />
      <Divider />
    </div>
  );
}
