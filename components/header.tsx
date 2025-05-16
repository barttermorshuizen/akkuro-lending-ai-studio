import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-row items-center py-4 gap-2">
      <Image src="/akkuro.svg" alt="Akkuro" width={153} height={27} />
      <div className="text-xs text-white">Chatbot v1</div>
    </div>
  );
}
