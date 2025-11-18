import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  projectName: string;
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectIndex: (index: number) => void;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  projectName,
  currentIndex,
  onNext,
  onPrev,
  onSelectIndex,
}) => {
  return (
    <div className="relative w-full h-80 rounded-xl overflow-hidden bg-gray-700/30">
      {images.length > 0 ? (
        <>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${projectName} screenshot ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={onPrev}
                className="
                  absolute left-2 top-1/2 -translate-y-1/2
                  w-10 h-10 rounded-full bg-black/50 hover:bg-black/70
                  flex items-center justify-center text-white
                  transition-colors duration-200
                "
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={onNext}
                className="
                  absolute right-2 top-1/2 -translate-y-1/2
                  w-10 h-10 rounded-full bg-black/50 hover:bg-black/70
                  flex items-center justify-center text-white
                  transition-colors duration-200
                "
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => onSelectIndex(index)}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-200
                    ${
                      index === currentIndex ? "bg-blue-500 w-6" : "bg-gray-400"
                    }
                  `}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500 text-6xl">
          📱
        </div>
      )}
    </div>
  );
};
