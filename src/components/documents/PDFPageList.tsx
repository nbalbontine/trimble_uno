"use client";

import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PDFPageListProps {
  totalPages: number;
  selectedPage: number;
  onSelectPage: (page: number) => void;
  fileName?: string;
  onBack?: () => void;
}

export function PDFPageList({
  totalPages,
  selectedPage,
  onSelectPage,
  fileName = "RFP Pages",
  onBack,
}: PDFPageListProps) {
  return (
    <div className="h-full flex flex-col border-r bg-card">
      {/* Header with Back Button */}
      <div className="p-4 border-b flex items-center gap-2">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8 shrink-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        <h3 className="font-medium text-sm truncate">{fileName}</h3>
      </div>

      {/* Page Thumbnails */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isSelected = selectedPage === page;

            return (
              <button
                key={page}
                onClick={() => onSelectPage(page)}
                className={cn(
                  "w-full aspect-square rounded border-2 transition-all duration-200 relative overflow-hidden",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 hover:border-gray-400"
                )}
              >
                {/* Thumbnail Placeholder */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center",
                    isSelected ? "bg-primary/10" : "bg-muted"
                  )}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-muted-foreground/30">
                      {page}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Page {page}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

