"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";

export default function ImageWithLightbox(props: {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Image 
          src={props.src} 
          alt={props.alt} 
          width={props.width || 600}
          height={props.height || 400}
          className="cursor-zoom-in" 
        />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/75 cursor-zoom-out" />
        <Dialog.Content>
          <div className="fixed inset-0 h-screen w-screen p-2 sm:p-6 pointer-events-none">
            <Image
              src={props.src}
              className="h-full w-full object-contain"
              alt={props.alt}
              width={props.width || 600}
              height={props.height || 400}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
