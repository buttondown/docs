"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type ComponentProps,
  type MouseEvent,
  useEffect,
  useState,
} from "react";
import { clsx } from "@/lib/utils";

export function ShimmerLink({
  href,
  className,
  children,
  onClick,
  ...props
}: ComponentProps<typeof Link>) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const targetPath = typeof href === "string" ? href : href.pathname;

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== targetPath) {
      setIsLoading(true);
    }
    onClick?.(e);
  };

  return (
    <Link
      href={href}
      className={clsx("max-w-max", className, isLoading && "shimmer-loading")}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}
