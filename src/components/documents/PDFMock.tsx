"use client";

import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface PDFMockProps {
  activeHighlight?: string | null;
  highlightColor?: string;
}

const highlightColorClasses: Record<string, string> = {
  red: "bg-red-200/50 border-l-4 border-red-500",
  orange: "bg-orange-200/50 border-l-4 border-orange-500",
  yellow: "bg-yellow-200/50 border-l-4 border-yellow-500",
  green: "bg-green-200/50 border-l-4 border-green-500",
  blue: "bg-blue-200/50 border-l-4 border-blue-500",
  purple: "bg-purple-200/50 border-l-4 border-purple-500",
};

export function PDFMock({ activeHighlight, highlightColor = "red" }: PDFMockProps) {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));

  return (
    <div className="h-full flex flex-col bg-muted/30 relative">
      {/* PDF Content */}
      <ScrollArea className="flex-1">
        <div className="p-8 flex justify-center">
          <div
            className="bg-white max-w-3xl w-full"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          >
            {/* PDF Page */}
            <div className="p-12 space-y-6">
              {/* Header with Logo */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-orange-500 flex items-center justify-center">
                  <div className="space-y-1">
                    <div className="w-10 h-1 bg-white" />
                    <div className="w-8 h-1 bg-white" />
                    <div className="w-6 h-1 bg-white" />
                    <div className="w-4 h-1 bg-white" />
                  </div>
                </div>
                <div>
                  <div className="text-orange-500 font-bold text-lg">TRIBUNE BUILDING</div>
                </div>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-xl font-bold">
                  Request for Proposal (RFP) – Tribune Building Project
                </h1>
                <p className="text-sm text-gray-600 mt-2 italic">
                  Incourage Community Foundation, Inc. (&ldquo;Incourage&rdquo;) located in rural central Wisconsin, invites proposals from interested firms for Construction Management services on the Tribune Building Project (located at 220 First Avenue South, Wisconsin Rapids).
                </p>
              </div>

              {/* Submission Deadline */}
              <div className="border-t pt-4">
                <p className="text-sm">
                  <strong>Submission Deadline:</strong>{" "}
                  <span className="ml-4">Friday, February 13, 2015 at 4:00 p.m. CST</span>
                </p>
              </div>

              {/* Table of Contents */}
              <div className="border-t pt-4">
                <h2 className="font-bold text-sm mb-3">TABLE OF CONTENTS</h2>
                <table className="text-sm w-full">
                  <tbody>
                    {[
                      "Project Information",
                      "Scope of Services – Construction Manager's Responsibilities",
                      "Owner's Responsibilities",
                      "Insurance and Bonds",
                      "Proposal Format",
                      "Proposal Submittal",
                      "Proposer's Site Visit & Q&A Session",
                      "Final Selection",
                      "Additional Information Requests",
                    ].map((item, index) => (
                      <tr key={index}>
                        <td className="w-8 py-1">{index + 1}</td>
                        <td className="py-1">{item}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Section 1 */}
              <div className="border-t pt-4">
                <h2 className="font-bold">1. PROJECT INFORMATION</h2>
              </div>

              {/* Section 1.1 - Highlightable */}
              <div>
                <h3 className="font-bold text-sm">1.1 ABOUT INCOURAGE</h3>
                <div
                  className={cn(
                    "mt-2 p-2 -ml-2 transition-all duration-300",
                    activeHighlight === "section-incourage" &&
                      highlightColorClasses[highlightColor]
                  )}
                >
                  <p className="text-sm leading-relaxed">
                    Established in 1994, Incourage Community Foundation is a nationally recognized leader in place-based philanthropy and community change efforts. Incourage operates with a vision of a community that works well for all people. To achieve this vision, values of equity, inclusion and opportunity are applied to all work, and to the relationships Incourage fosters to accomplish its work. To this end, Incourage strives to work with vendors and subcontractors who:
                  </p>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="text-sm space-y-2 list-disc pl-8">
                <li>Are located in the local community or within a 200-mile radius;</li>
                <li>Hire qualified, diverse talent, who are equitably paid for their work;</li>
                <li>
                  Value learning opportunities or practices, and building capacity of their team or others involved in the work;
                </li>
                <li>Can demonstrate a connection to place;</li>
                <li>
                  Have an eye on sustainability (of environment and business) and have demonstrated a commitment to corporate social responsibility.
                </li>
              </ul>

              {/* More content sections */}
              <div className="border-t pt-4">
                <h3 className="font-bold text-sm">1.2 PROJECT BACKGROUND</h3>
                <p className="text-sm mt-2 leading-relaxed">
                  The Tribune Building, constructed in 1920, is a historic landmark in downtown Wisconsin Rapids. The proposed renovation will transform this 45,000 square foot facility into a mixed-use community hub featuring coworking spaces, event venues, and retail opportunities.
                </p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold text-sm">1.3 PROJECT SCOPE</h3>
                <p className="text-sm mt-2 leading-relaxed">
                  The Construction Manager will be responsible for providing pre-construction and construction phase services. The estimated construction budget is $8-10 million, with an anticipated construction start date of Summer 2015.
                </p>
              </div>

              <div className="border-t pt-4">
                <h2 className="font-bold">2. SCOPE OF SERVICES</h2>
                <p className="text-sm mt-2 leading-relaxed">
                  The Construction Manager shall provide the following services during the pre-construction and construction phases of the project...
                </p>
              </div>
            </div>
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

