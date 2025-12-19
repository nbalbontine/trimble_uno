"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MapViewerProps {
  activeHighlight?: string | null;
  highlightColor?: string;
}

export function MapViewer({ activeHighlight, highlightColor = "green" }: MapViewerProps) {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));

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
    <div className="h-full flex flex-col bg-muted/30 relative">
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
  );
}

