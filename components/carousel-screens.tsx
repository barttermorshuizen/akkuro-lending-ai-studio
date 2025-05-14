"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface CarouselScreensProps {
  screens: {
    id: string;
    component: React.ReactNode;
  }[];
}

export default function CarouselScreens({ screens }: CarouselScreensProps) {
  return (
    <div className="flex-1 h-full w-full">
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        spaceBetween={30}
        slidesPerView={1}
        className="h-full"
      >
        {screens.map((screen) => (
          <SwiperSlide className="pb-6" key={screen.id}>
            {screen.component}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
