"use client";

import * as React from "react";

import { Page } from "@/components/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";

export default function SummaryPage() {
  const queryClient = useQueryClient();

  const name = queryClient.getQueryData(["name"]);
  const traits = queryClient.getQueryData(["traits"]) as string[] ?? [];
  const expertise = queryClient.getQueryData(["expertise"]) as string[] ?? [];
  const urls = queryClient.getQueryData(["urls"]) as { url: string; name: string } [] ?? [];

  return (
    <Page title="Summary" link="/chat">
      <div className="flex flex-col w-[80vw] gap-8">
        <div className="flex gap-4 justify-around items-center">
          <h2>Personality</h2>
          {traits.map((value) => (
            <div className="border border-primary p-2 rounded-md" key={value}>
              {value}
            </div>
          ))}
        </div>
        <div className="flex gap-4 justify-around items-center">
          <h2>Expertise</h2>

          {expertise.map((value) => (
            <div className="border border-primary p-2 rounded-md" key={value}>
              {value}
            </div>
          ))}
        </div>
        <div className="flex gap-4 justify-around items-center">
          <h2>Data sets</h2>

          {urls.map(({ name}, index) => (
            <div className="border border-primary p-2 rounded-md" key={`${name}-${index}`}>
              {name}
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
