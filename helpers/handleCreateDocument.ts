"use client";
import { toast } from "sonner";

export const handleCreateDocument = (create: any, title: string) => {
  const promise = create({ title });
  toast.promise(promise, {
    loading: "Creating document...",
    success: "Document created!",
    error: "Could not create document",
  });
};
