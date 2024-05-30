"use client";

import { Message, UserData } from "@/app/chat/_components/data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { askApi } from "@/api";

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
}

export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
  const queryClient = useQueryClient();

  const [messagesState, setMessages] = React.useState<Message[]>([]);

  const mutation = useMutation({
    mutationFn: askApi,
    onSuccess: (data: string) => {
      setMessages(prevMessages => [...prevMessages, {
        id: prevMessages.length + 1,
        avatar: '/User1.png',
        name: 'Robot',
        message: data ?? '',
      }]);
      queryClient.invalidateQueries({ queryKey: ['balance'] })
    },
  })

  const sendMessageClick = (newMessage: Message) => {
    const chat_id = localStorage.getItem("id") ?? "";

    setMessages([...messagesState, newMessage]);
    mutation.mutateAsync({
      chat_id,
      question: newMessage.message,
    })
  };
  return (
    <div className="flex flex-col justify-between w-full h-full">
      {/* <ChatTopbar selectedUser={selectedUser} /> */}

      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessageClick}
        isMobile={isMobile}
      />
    </div>
  );
}
