import { getEntries, getEntriesWithTag } from "app/lib/contentfulDataService";
import ContactForm from "./components/ContactForm";
import { TypeContactFormSkeleton } from "app/lib/types/contentful/TypeContactForm";
import {
  TypeFooterFields,
  TypeFooterSkeleton,
} from "app/lib/types/contentful/TypeFooter";

export default async function Contact() {
  const [contactFormData, footerLink] = await Promise.all([
    await getEntries<TypeContactFormSkeleton>("contactForm"),
    await getEntriesWithTag<TypeFooterSkeleton>("footer", "whatsapp"),
  ]);

  const footerData = footerLink[0] as TypeFooterFields | undefined;
  const whatsappLink = footerData?.url ?? footerData?.description;

  return (
    <ContactForm
      contactFormData={contactFormData[0]}
      whatsappLink={whatsappLink}
    />
  );
}
