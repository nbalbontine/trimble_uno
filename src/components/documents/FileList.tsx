"use client";

import Image from "next/image";
import { ChevronLeft, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileItem {
  id: string;
  name: string;
  type: string;
  icon: string;
}

interface FileListProps {
  files: FileItem[];
  selectedFile: string;
  onSelectFile: (fileId: string) => void;
  onBack?: () => void;
  showBack?: boolean;
}

export function FileList({
  files,
  selectedFile,
  onSelectFile,
  onBack,
  showBack = false,
}: FileListProps) {
  const getImagePath = (fileId: string) => {
    switch (fileId) {
      case "rfp":
        return "/document.png";
      case "golf-course":
        return "/drawing.png";
      case "roading":
        return "/document3.png";
      default:
        return "/document.png";
    }
  };

  return (
    <div className="h-full flex flex-col border-r bg-card">
      {/* Header */}
      <div className="p-4 border-b">
        {showBack && onBack ? (
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 -ml-2">
            <ChevronLeft className="h-4 w-4" />
            {files.find((f) => f.id === selectedFile)?.name || "Back"}
          </Button>
        ) : (
          <h3 className="font-medium text-sm">Files</h3>
        )}
      </div>

      {/* File Thumbnails */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {files.map((file) => {
            const imagePath = getImagePath(file.id);
            const isSelected = selectedFile === file.id;

            return (
              <button
                key={file.id}
                onClick={() => onSelectFile(file.id)}
                className={cn(
                  "w-full text-left rounded-lg border-2 transition-all duration-200",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 hover:border-gray-400"
                )}
              >
                {/* Thumbnail */}
                <div
                  className={cn(
                    "aspect-[4/3] rounded-t-md flex items-center justify-center overflow-hidden",
                    isSelected ? "bg-primary/10" : "bg-muted"
                  )}
                >
                  <Image
                    src={imagePath}
                    alt={file.name}
                    width={200}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Label */}
                <div className="p-2 flex items-center justify-between">
                  <span className="text-xs font-medium truncate">
                    {file.name}
                  </span>
                  <MoreVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

