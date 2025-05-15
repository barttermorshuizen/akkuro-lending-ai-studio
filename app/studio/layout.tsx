import Header from "./components/header";
import SideBar from "./components/side-bar";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-full bg-white">
      <Header />
      <SideBar />
      <main className="h-[calc(100vh-64px)]">{children}</main>
    </div>
  );
}
