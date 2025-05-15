import CarouselScreens from "./carousel-screens";
import Show from "./condition/show";
import { Button } from "./ui/button";
import Image from "next/image";
import PhoneFrameStatusBar from "@/app/assets/phone-frame/status-bar.svg";
import PhoneFrameHomeIndicator from "@/app/assets/phone-frame/home-indicator.svg";
import { useMemo } from "react";
import IntroScreen from "./screens/intro-screen";
import ConfiguratingProductScreen from "./screens/configurating-product-screen";
import useConfiguringProduct from "@/stores/useConfiguringProduct";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductScreen() {
  const screens = useMemo(
    () => [
      {
        id: "intro",
        component: <IntroScreen />,
      },
      {
        id: "configuring-product",
        component: <ConfiguratingProductScreen />,
      },
    ],
    [],
  );

  const { product } = useConfiguringProduct();

  return (
    <>
      <AnimatePresence>
        <Show when={!!product}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex rounded-xl flex-1 h-full py-10 justify-center text-[#EDE7E0] items-center bg-[#EDE7E01A]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
              className="aspect-[393/852] flex flex-col justify-start items-start h-full border-4 max-h-[80vh] border-black rounded-[30px] bg-[#EDE7E0]"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <Image src={PhoneFrameStatusBar} alt="Status Bar" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex-1 flex-col w-full h-full overflow-hidden"
              >
                <CarouselScreens screens={screens} />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <Image src={PhoneFrameHomeIndicator} alt="Home Indicator" />
              </motion.div>
            </motion.div>
          </motion.div>
        </Show>
      </AnimatePresence>
    </>
  );
}
