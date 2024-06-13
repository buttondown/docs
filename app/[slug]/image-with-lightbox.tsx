"use client";

import * as Dialog from "@radix-ui/react-dialog";

export default function ImageWithLightbox(props: {
  src: string;
  alt: string;
  title?: string;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <img src={props.src} alt={props.alt} className="cursor-zoom-in" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/75 cursor-zoom-out" />
        <Dialog.Content>
          <div className="fixed inset-0 h-screen w-screen p-2 sm:p-6 pointer-events-none">
            <img
              src={props.src}
              className="h-full w-full object-contain"
              alt={props.alt}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
