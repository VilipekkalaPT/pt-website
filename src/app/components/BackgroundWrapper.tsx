import Image from "next/image";

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

export default function BackgroundWrapper({
  children,
}: BackgroundWrapperProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src="/background-1.png"
        alt="Background"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
