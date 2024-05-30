"use client";

import { Page } from "@/components/page";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useUploadThing } from "@/lib/uploadthing";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exceptionHandler } from "@/lib/exceptionHandler";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { updateUrlApi } from "@/api";

export default function UploadPage() {
  const queryClient = useQueryClient();
  
  const router = useRouter();

  const [files, setFiles] = useState<({ url: string; name: string } | any)[]>(
    []
  );

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (res) => {
        console.log("Files: ", res);
        console.log("uploaded successfully!");
        setFiles((files) => [...files, res[0]]);
      },
      onUploadError: () => {
        console.log("error occurred while uploading");
      },
      onUploadBegin: () => {
        console.log("upload has begun");
      },
    }
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // setFiles(acceptedFiles);
      startUpload(acceptedFiles);
    },
    [startUpload]
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: isUploading,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      const chat_id = localStorage.getItem("id") ?? "";

      await updateUrlApi({
        chat_id,
        urls: files.map(item => item.url).join(','),
      });

      queryClient.setQueryData(['urls'], files);
    },
    onSuccess: () => {
      toast({ title: 'Success added data sets for your agent' })
      router.push("/summary");
    },
    onError: (error) => toast({ title: exceptionHandler(error) || "Error" }),
  });

  const handleNext = useCallback(() => {
    // localStorage.setItem('id', uuidv4());
    // router.push('/setName')
    if (files.length === 0) {
      router.push("/summary");
    } else {
      updateMutation.mutate();
    }
  }, [files.length, router, updateMutation]);
  return (
    <Page
      title="Upload additional data sets for your agent"
      link="/summary"
      nextButton={
        <div className="flex items-center justify-center">
          <Button
            size="lg"
            variant="default"
            onClick={handleNext}
            disabled={updateMutation.isPending || isUploading}
          >
            {updateMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            NEXT
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-4 gap-4 mb-6">
        {files.map((file) => (
          <div key={file.name} className="border border-primary p-4 rounded-md">
            {file.name}
          </div>
        ))}
      </div>
      <div className="flex w-full items-center justify-center">
        <div
          {...getRootProps()}
          className="border border-primary w-[300px] h-[100px] flex items-center justify-center flex-col"
        >
          <input {...getInputProps()} />
          {isUploading ? "Uploading...." : "Drop files here!"}
        </div>
      </div>
    </Page>
  );
}
