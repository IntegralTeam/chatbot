import * as React from "react";

import { Page } from "@/components/page";
import { Input } from "@/components/ui/input";
import { ChatLayout } from "./_components/chat/chat-layout";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  return (
    <div className="flex items-center justify-center">
      <video
        width="640"
        height="320"
        controls={false}
        preload="auto"
        muted
        autoPlay
        loop
        className={cn(`absolute z-0`)}
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="z-10 h-[calc(80dvh)] w-[calc(60dvw)] rounded-lg text-sm flex mt-20">
        <ChatLayout defaultLayout={[320, 480]} />
      </div>
    </div>
  );
}
