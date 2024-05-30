"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { startApi } from "@/api";
import { toast } from "@/components/ui/use-toast";
import { exceptionHandler } from "@/lib/exceptionHandler";

export default function WelcomePage() {
  const router = useRouter();

  const startMutation = useMutation({
    mutationFn: async () => {
      const chat_id = uuidv4();
      localStorage.setItem("id", chat_id);
      await startApi({
        chat_id,
      });
    },
    onSuccess: () => {
      // toast({ title: 'Success name created' })
      router.push("/setName");
    },
    onError: (error) => toast({ title: exceptionHandler(error) || "Error" }),
  });

  const handleNext = useCallback(() => {
    // localStorage.setItem('id', uuidv4());
    // router.push('/setName')
    startMutation.mutate();
  }, [startMutation]);

  return (
    <Page
      title="Welcome to your AI agent builder"
      link="/setName"
      nextButton={
        <div className="flex items-center justify-center">
          <Button
            size="lg"
            variant="default"
            onClick={handleNext}
            disabled={startMutation.isPending}
          >
            {startMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            NEXT
          </Button>
        </div>
      }
    />
  );
}
