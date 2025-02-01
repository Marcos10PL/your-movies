export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-lg md:text-xl xl:text-2xl *:py-2 md:*:py-3">
      {children}
    </div>
  );
}
