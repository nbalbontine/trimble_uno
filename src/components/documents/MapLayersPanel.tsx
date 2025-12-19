"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, Eye, EyeOff, MoreVertical, Folder, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  children?: Layer[];
}

interface MapLayersPanelProps {
  fileName: string;
  onBack: () => void;
  layers: Layer[];
  onLayerToggle: (layerId: string, parentId?: string) => void;
  selectedPage: string;
  onPageSelect: (pageId: string) => void;
}

const pageThumbnails = [
  { id: "page-1", number: 1 },
  { id: "page-2", number: 2 },
];

export function MapLayersPanel({
  fileName,
  onBack,
  layers,
  onLayerToggle,
  selectedPage,
  onPageSelect,
}: MapLayersPanelProps) {
  return (
    <div className="h-full flex flex-col border-r bg-card">
      {/* Header with Back Button - FIXED */}
      <div className="p-4 border-b flex items-center gap-2 shrink-0">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8 shrink-0">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-medium text-sm truncate">{fileName}</h3>
      </div>

      {/* Scrollable Content - Pages + Layers */}
      <ScrollArea className="flex-1">
        {/* Pages */}
        <div className="p-3 border-b">
          <h4 className="text-xs font-medium text-muted-foreground mb-2">Pages</h4>
          <div className="space-y-2">
            {pageThumbnails.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageSelect(page.id)}
                className={cn(
                  "w-full aspect-square rounded border-2 relative overflow-hidden",
                  selectedPage === page.id
                    ? "border-primary"
                    : "border-transparent hover:border-muted-foreground/20"
                )}
              >
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <Image
                    src="/Approved Street and Storm Plan_Page008_Dpi300_Layer000.png"
                    alt={`Page ${page.number}`}
                    fill
                    className="object-cover opacity-50"
                  />
                </div>
                <div className="absolute bottom-1 right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded flex items-center justify-center font-medium">
                  {page.number}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Layers */}
        <div className="p-3 border-b">
          <h4 className="text-xs font-medium text-muted-foreground mb-2">Layers</h4>
        </div>
        <div className="p-2">
          {layers.map((layer) => (
            <Collapsible key={layer.id} defaultOpen>
              <CollapsibleTrigger className="flex items-center gap-2 w-full p-2 hover:bg-muted rounded text-sm">
                <ChevronDown className="h-3 w-3" />
                <Folder className="h-4 w-4 text-blue-500" />
                <span className="flex-1 text-left truncate">{layer.name}</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-4 space-y-1">
                  {layer.children?.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center gap-2 p-2 hover:bg-muted rounded text-sm"
                    >
                      <div className="w-3" />
                      <Layers className="h-4 w-4 text-muted-foreground" />
                      <span className="flex-1 truncate">{child.name}</span>
                      <button
                        onClick={() => onLayerToggle(child.id, layer.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {child.visible ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

