import { ReactNode } from "react";
import Link from "next/link"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Page({
  title,
  children,
  link,
  nextButton,
}: {
  title: string;
  link?: string;
  children?: ReactNode;
  nextButton?: ReactNode;
}) {
  return (
    <div className="h-[90vh] p-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {title}
      </h1>
      <div className="h-full flex items-center justify-center relative">
        <video
          width="640"
          height="320"
          controls={false}
          preload="auto"
          muted
          autoPlay
          loop
          className={cn(`absolute z-0`, children && "blur-lg opacity-50")}
        >
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {children && <div className="z-10">{children}</div>}
      </div>
      {link && !nextButton && (
        <div className="flex items-center justify-center">
          <Button size="lg" variant="default" asChild>
            <Link href={link}>
              NEXT
            </Link>
          </Button>
        </div>
      )}
      {nextButton && nextButton}
    </div>
  );
}
