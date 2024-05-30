"use client";

import { useCallback, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { exceptionHandler } from "@/lib/exceptionHandler";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTraitsApi } from "@/api";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const dataPersonality = [
  "Adaptive",
  "Analytical",
  "Empathetic",
  "Innovative",
  "Intuitive",
  "Methodical",
  "Proactive",
  "Reliable",
  "Resilient",
  "Sophisticated",
  "Versatile",
  "Witty",
];
export default function PersonalityPage() {
  const queryClient = useQueryClient();
  
  const [value, setValue] = useState<string[]>([]);
  const router = useRouter();

  const updatePersonalityMutation = useMutation({
    mutationFn: async () => {
      const chat_id = localStorage.getItem("id") ?? "";

      await updateTraitsApi({
        chat_id,
        traits: value.join(","),
      });

      queryClient.setQueryData(['traits'], value);

    },
    onSuccess: () => {
      toast({ title: "Success set personality traits of your agent" });
      router.push("/expertise");
    },
    onError: (error) => toast({ title: exceptionHandler(error) || "Error" }),
  });

  const handleNext = useCallback(() => {
    // localStorage.setItem('id', uuidv4());
    // router.push('/setName')
    updatePersonalityMutation.mutate();
  }, [updatePersonalityMutation]);

  return (
    <Page
      title="Select the personality traits of your agent"
      link="/expertise"
      nextButton={
        <div className="flex items-center justify-center">
          <Button
            size="lg"
            variant="default"
            onClick={handleNext}
            disabled={value.length === 0}
          >
            {updatePersonalityMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            NEXT
          </Button>
        </div>
      }
    >
      <div className="w-full h-[300px] mt-20">
        <ToggleGroup
          variant="outline"
          size="lg"
          type="multiple"
          className="grid grid-cols-4 gap-12"
          onValueChange={setValue}
        >
          {dataPersonality.map((value) => (
            <ToggleGroupItem
              key={value}
              value={value}
              aria-label={value}
              className="text-lg h-14"
            >
              {value}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </Page>
  );
}
