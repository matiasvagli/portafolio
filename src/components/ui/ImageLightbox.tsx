"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number | null;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  title,
  onClose,
  onPrev,
  onNext,
}: ImageLightboxProps) {
  if (currentIndex === null || !images[currentIndex]) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl w-full bg-zinc-950 border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-zinc-900/60">
            <span className="text-xs font-mono text-zinc-300">
              {title} — Captura {currentIndex + 1} de {images.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative bg-black flex items-center justify-center min-h-[320px] max-h-[75vh] p-4">
            <img
              src={images[currentIndex]}
              alt={`${title} captura ${currentIndex + 1}`}
              className="max-h-[70vh] w-auto object-contain rounded-lg"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={onPrev}
                  className="absolute left-4 p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/15 text-white"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className="absolute right-4 p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/15 text-white"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
