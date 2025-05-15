import Header from "../studio/components/header";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen bg-background overflow-x-hidden overflow-y-auto">
      <Header />
      <main className="h-full">{children}</main>
    </div>
  );
}
