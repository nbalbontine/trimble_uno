"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, Eye, EyeOff, ChevronDown, MoreVertical } from "lucide-react";
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

interface MapViewerProps {
  activeHighlight?: string | null;
  highlightColor?: string;
}

const initialLayers: Layer[] = [
  {
    id: "page1",
    name: "Page 1",
    visible: true,
    children: [
      { id: "layer1", name: "Layer 1", visible: true },
      { id: "drawing", name: "Drawing", visible: true },
      { id: "drawing2", name: "Drawing 2", visible: true },
      { id: "drawing3", name: "Drawing 3", visible: true },
      { id: "drawing4", name: "Drawing 4", visible: true },
    ],
  },
];

const pageThumbnails = [
  { id: "page-1", number: 1 },
  { id: "page-2", number: 2 },
];

export function MapViewer({ activeHighlight, highlightColor = "green" }: MapViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [layers, setLayers] = useState<Layer[]>(initialLayers);
  const [selectedPage, setSelectedPage] = useState("page-1");

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));

  const toggleLayerVisibility = (layerId: string, parentId?: string) => {
    setLayers((prev) =>
      prev.map((layer) => {
        if (layer.id === layerId) {
          return { ...layer, visible: !layer.visible };
        }
        if (layer.id === parentId && layer.children) {
          return {
            ...layer,
            children: layer.children.map((child) =>
              child.id === layerId ? { ...child, visible: !child.visible } : child
            ),
          };
        }
        return layer;
      })
    );
  };

  const getHighlightStyle = () => {
    const colorMap: Record<string, string> = {
      green: "rgba(74, 222, 128, 0.3)",
      yellow: "rgba(250, 204, 21, 0.3)",
      purple: "rgba(192, 132, 252, 0.3)",
      red: "rgba(248, 113, 113, 0.3)",
      blue: "rgba(96, 165, 250, 0.3)",
      orange: "rgba(251, 146, 60, 0.3)",
    };
    return colorMap[highlightColor] || colorMap.green;
  };

  return (
    <div className="h-full flex">
      {/* Left Sidebar - Pages & Layers */}
      <div className="w-48 border-r flex flex-col bg-card shrink-0">
        {/* Pages */}
        <div className="p-3 border-b">
          <h4 className="text-xs font-medium text-muted-foreground mb-2">Pages</h4>
          <div className="space-y-2">
            {pageThumbnails.map((page) => (
              <button
                key={page.id}
                onClick={() => setSelectedPage(page.id)}
                className={cn(
                  "w-full aspect-[4/3] rounded border-2 relative overflow-hidden",
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
                <div className="absolute bottom-1 right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded flex items-center justify-center">
                  {page.number}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Layers */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-3 border-b">
            <h4 className="text-xs font-medium text-muted-foreground">Layers</h4>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {layers.map((layer) => (
                <Collapsible key={layer.id} defaultOpen>
                  <CollapsibleTrigger className="flex items-center gap-2 w-full p-2 hover:bg-muted rounded text-sm">
                    <ChevronDown className="h-3 w-3" />
                    <Checkbox
                      checked={layer.visible}
                      onCheckedChange={() => toggleLayerVisibility(layer.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
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
                          <Checkbox
                            checked={child.visible}
                            onCheckedChange={() =>
                              toggleLayerVisibility(child.id, layer.id)
                            }
                          />
                          <button
                            onClick={() =>
                              toggleLayerVisibility(child.id, layer.id)
                            }
                            className="text-muted-foreground hover:text-foreground"
                          >
                            {child.visible ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4" />
                            )}
                          </button>
                          <span className="flex-1 truncate">{child.name}</span>
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
      </div>

      {/* Map Content */}
      <div className="flex-1 flex flex-col bg-muted/30 relative">
        {/* Map Display */}
        <ScrollArea className="flex-1">
          <div className="p-4 min-h-full flex items-center justify-center">
            <div
              className="relative"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "center center",
              }}
            >
              <Image
                src="/Approved Street and Storm Plan_Page008_Dpi300_Layer000.png"
                alt="Golf Course Plans"
                width={1154}
                height={730}
                className="max-w-none"
                priority
              />

              {/* Highlight Overlay */}
              {activeHighlight && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 1154 730"
                >
                  {activeHighlight === "zone-golf" && (
                    <path
                      d="M400,200 L700,200 L750,350 L700,500 L400,500 L350,350 Z"
                      fill={getHighlightStyle()}
                      stroke={highlightColor === "green" ? "#22c55e" : "#eab308"}
                      strokeWidth="2"
                    />
                  )}
                  {activeHighlight === "zone-residential" && (
                    <path
                      d="M100,100 L350,100 L350,400 L100,400 Z"
                      fill={getHighlightStyle()}
                      stroke="#eab308"
                      strokeWidth="2"
                    />
                  )}
                </svg>
              )}
            </div>
          </div>
        </ScrollArea>

        {/* Floating Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-background border rounded-lg shadow-lg p-1">
          <Button variant="ghost" size="icon" onClick={handleZoomOut} className="h-8 w-8">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-12 text-center">
            {zoom}%
          </span>
          <Button variant="ghost" size="icon" onClick={handleZoomIn} className="h-8 w-8">
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

