"use client";

import { useCallback, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpertiseApi } from "@/api";
import { toast } from "@/components/ui/use-toast";
import { exceptionHandler } from "@/lib/exceptionHandler";

const dataExpertise = [
  "Business strategy",
  "Foresight",
  "Philosophy",
  "Project management",
  "Health care",
  "Religion",
  "Finance",
  "Customer support",
  "Innovation",
  "Sports",
  "Technology",
  "Luxury",
];

export default function ExpertisePage() {
  const queryClient = useQueryClient();

  const [value, setValue] = useState<string[]>([])
  const router = useRouter();

  const updateExpertiseMutation = useMutation({
    mutationFn: async () => {
      const chat_id = localStorage.getItem("id") ?? '';

      await updateExpertiseApi({
        chat_id,
        expertise: value.join(','),
      });

      queryClient.setQueryData(['expertise'], value);

    },
    onSuccess: () => {
      toast({ title: 'Expertises were added of your agent' })
      router.push("/upload");
    },
    onError: (error) => toast({ title: exceptionHandler(error) || 'Error' }),
  })
  
  const handleNext = useCallback(() => {
    // localStorage.setItem('id', uuidv4());
    // router.push('/setName')
    updateExpertiseMutation.mutate();
  }, [updateExpertiseMutation]);

  return (
    <Page 
      title="Select the expertise of your agent" 
      link="/upload"
      nextButton={
        <div className="flex items-center justify-center">
          <Button
            size="lg"
            variant="default"
            onClick={handleNext}
            disabled={value.length === 0}
          >
            {updateExpertiseMutation.isPending && (
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
          {dataExpertise.map((value) => (
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
