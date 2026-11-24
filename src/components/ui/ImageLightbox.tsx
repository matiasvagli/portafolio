"use client";

import { useEffect, useId, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number | null;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ImageLightbox({ images, currentIndex, title, onClose, onPrev, onNext }: ImageLightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const open = currentIndex !== null;

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  return (
    <dialog ref={dialog} className="case-gallery" aria-labelledby={titleId} onClose={onClose}
      onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
      onKeyDown={event => {
        if (images.length < 2) return;
        if (event.key === "ArrowLeft") onPrev();
        if (event.key === "ArrowRight") onNext();
      }}>
      {currentIndex !== null && <div className="gallery-inner">
        <header className="gallery-header">
          <div><h3 id={titleId}>{title}</h3><p aria-live="polite">Captura {currentIndex + 1} de {images.length}</p></div>
          <button type="button" aria-label="Cerrar capturas" onClick={() => dialog.current?.close()}><X size={22} aria-hidden="true" /></button>
        </header>
        <div className="gallery-image">
          <img src={images[currentIndex]} alt={`Captura ${currentIndex + 1} de ${title}`} />
        </div>
        {images.length > 1 && <div className="gallery-controls">
          <button type="button" onClick={onPrev}><ChevronLeft size={17} aria-hidden="true" /> Anterior</button>
          <button type="button" onClick={onNext}>Siguiente <ChevronRight size={17} aria-hidden="true" /></button>
        </div>}
      </div>}
    </dialog>
  );
}
