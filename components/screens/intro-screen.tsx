import AkkuroDarkLogo from "@/public/akkuro-dark.svg";
import Image from "next/image";

export default function IntroScreen() {
  return (
    <div className="w-full h-full flex flex-col gap-6 pb-10 justify-end items-center text-black text-xl">
      <Image src={AkkuroDarkLogo} alt="Akkuro Logo" width={200} height={34} />
      <div className="text-6xl font-extralight font-sans leading-snug">
        Build your <br /> own bank
      </div>
    </div>
  );
}
