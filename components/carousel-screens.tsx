"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useRef } from "react";

interface CarouselScreensProps {
  screens: {
    id: string;
    component: React.ReactNode;
  }[];
}

export default function CarouselScreens({ screens }: CarouselScreensProps) {
  const swiperRef = useRef<SwiperType>();

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
          spaceBetween={30}
          slidesPerView={1}
          className="h-full"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {screens.map((screen) => (
            <SwiperSlide className="pb-6" key={screen.id}>
              {screen.component}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="px-4 w-full mt-auto pb-4"
      >
        <Button
          className="bg-[#008071] py-6 text-white w-full"
          onClick={() => swiperRef.current?.slideNext()}
        >
          Next
        </Button>
      </motion.div>
    </div>
  );
}
