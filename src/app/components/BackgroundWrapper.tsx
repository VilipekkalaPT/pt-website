interface BackgroundWrapperProps {
  children: React.ReactNode;
}

export default function BackgroundWrapper({
  children,
}: BackgroundWrapperProps) {
  return (
    <div className='h-full w-full relative overflow-hidden bg-[url("/background-1.svg")] bg-no-repeat bg-cover'>
      {children}
    </div>
  );
}
