import Image from "next/image";
import noImageAvailable from "app/images/no-image-available.jpg";

export default function NoImageAvailable() {
  return (
    <Image
      src={noImageAvailable}
      alt="No Image Available"
      width={500}
      height={500}
    />
  );
}
