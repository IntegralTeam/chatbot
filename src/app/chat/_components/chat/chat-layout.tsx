"use client";

import { userData } from "@/app/chat/_components/data";
import React, { useEffect, useState } from "react";

import { Chat } from "./chat";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
}

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
}: ChatLayoutProps) {
  const [selectedUser, setSelectedUser] = React.useState(userData[0]);

  return (
    <div className="flex w-full flex-col lg:flex-row">
      <div className="w-100 flex-1">
        <Chat
          messages={selectedUser.messages}
          selectedUser={selectedUser}
          isMobile={false}
        />
      </div>
    </div>
  );
}
