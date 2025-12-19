"use client";

import { useState, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface PDFMockProps {
  activeHighlight?: string | null;
  highlightColor?: string;
  currentPage?: number;
}

const highlightColorClasses: Record<string, string> = {
  red: "bg-red-200/50 border-l-4 border-red-500",
  orange: "bg-orange-200/50 border-l-4 border-orange-500",
  yellow: "bg-yellow-200/50 border-l-4 border-yellow-500",
  green: "bg-green-200/50 border-l-4 border-green-500",
  blue: "bg-blue-200/50 border-l-4 border-blue-500",
  purple: "bg-purple-200/50 border-l-4 border-purple-500",
};

export function PDFMock({ activeHighlight, highlightColor = "red", currentPage = 1 }: PDFMockProps) {
  const [zoom, setZoom] = useState(100);
  const highlightRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));

  // Scroll to highlighted section when activeHighlight changes
  useEffect(() => {
    if (activeHighlight && highlightRef.current) {
      // Small delay to ensure rendering is complete
      setTimeout(() => {
        highlightRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest"
        });
      }, 100);
    }
  }, [activeHighlight]);

  return (
    <div className="h-full flex flex-col bg-muted/30 relative">
      {/* PDF Content */}
      <ScrollArea className="flex-1">
        <div className="p-8 flex flex-col items-center gap-8">
          {/* Page 1 */}
          <div
            className="bg-white max-w-3xl w-full shadow-lg"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          >
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
                  ref={activeHighlight === "section-incourage" ? highlightRef : null}
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

              {/* Bullet Points - Highlightable (Orange) */}
              <div
                ref={activeHighlight === "section-capabilities" ? highlightRef : null}
                className={cn(
                  "transition-all duration-300",
                  activeHighlight === "section-capabilities" &&
                    highlightColorClasses[highlightColor]
                )}
              >
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
              </div>

              {/* More content sections */}
              <div className="border-t pt-4">
                <h3 className="font-bold text-sm">1.2 PROJECT BACKGROUND</h3>
                <p className="text-sm mt-2 leading-relaxed">
                  The Tribune Building, constructed in 1920, is a historic landmark in downtown Wisconsin Rapids. The proposed renovation will transform this 45,000 square foot facility into a mixed-use community hub featuring coworking spaces, event venues, and retail opportunities.
                </p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold text-sm">1.3 PROJECT SCOPE</h3>
                <div
                  ref={activeHighlight === "section-timeline" ? highlightRef : null}
                  className={cn(
                    "mt-2 p-2 -ml-2 transition-all duration-300",
                    activeHighlight === "section-timeline" &&
                      highlightColorClasses[highlightColor]
                  )}
                >
                  <p className="text-sm leading-relaxed">
                    The Construction Manager will be responsible for providing pre-construction and construction phase services. The estimated construction budget is $8-10 million, with an anticipated construction start date of Summer 2015.
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h2 className="font-bold">2. SCOPE OF SERVICES</h2>
                <p className="text-sm mt-2 leading-relaxed">
                  The Construction Manager shall provide the following services during the pre-construction and construction phases of the project...
                </p>
              </div>
            </div>
          </div>

          {/* Page 2 */}
          <div
            className="bg-white max-w-3xl w-full shadow-lg"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          >
            <div className="p-12 space-y-6">
              <h2 className="font-bold">2. SCOPE OF SERVICES (continued)</h2>
              
              <div>
                <h3 className="font-bold text-sm">2.1 PRE-CONSTRUCTION PHASE SERVICES</h3>
                <p className="text-sm mt-2 leading-relaxed">
                  During the pre-construction phase, the Construction Manager shall:
                </p>
                <div
                  ref={activeHighlight === "section-aci-standards" ? highlightRef : null}
                  className={cn(
                    "mt-3 p-2 -ml-2 transition-all duration-300",
                    activeHighlight === "section-aci-standards" &&
                      highlightColorClasses[highlightColor]
                  )}
                >
                  <ul className="text-sm space-y-2 list-disc pl-8">
                    <li>Review architectural and engineering design documents at various stages of completion</li>
                    <li>Provide preliminary cost estimates and cost control recommendations</li>
                    <li>Develop and maintain a project schedule</li>
                    <li>Recommend value engineering opportunities</li>
                    <li>Assist in contractor pre-qualification and bidding processes</li>
                    <li>Conduct constructability reviews</li>
                    <li>Provide site logistics planning</li>
                  </ul>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold text-sm">2.2 CONSTRUCTION PHASE SERVICES</h3>
                <p className="text-sm mt-2 leading-relaxed">
                  During the construction phase, the Construction Manager shall:
                </p>
                <div
                  ref={activeHighlight === "section-osha" ? highlightRef : null}
                  className={cn(
                    "mt-3 p-2 -ml-2 transition-all duration-300",
                    activeHighlight === "section-osha" &&
                      highlightColorClasses[highlightColor]
                  )}
                >
                  <ul className="text-sm space-y-2 list-disc pl-8">
                    <li>Supervise and coordinate all construction activities</li>
                    <li>Conduct regular site inspections and progress meetings</li>
                    <li>Manage the project schedule and critical path</li>
                    <li>Review and process contractor payment applications</li>
                    <li>Coordinate change order processes</li>
                    <li>Maintain quality control procedures</li>
                    <li>Ensure compliance with building codes and safety regulations</li>
                    <li>Manage project closeout and warranty documentation</li>
                  </ul>
                </div>
              </div>

              <div className="border-t pt-4">
                <h2 className="font-bold">3. OWNER'S RESPONSIBILITIES</h2>
                <p className="text-sm mt-2 leading-relaxed">
                  Incourage will provide the following during the project duration:
                </p>
                <ul className="text-sm space-y-2 list-disc pl-8 mt-3">
                  <li>Timely decisions on design and construction matters</li>
                  <li>Access to the building and site</li>
                  <li>Coordination with architects and engineers</li>
                  <li>Payment for construction services as agreed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Page 3 */}
          <div
            className="bg-white max-w-3xl w-full shadow-lg"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          >
            <div className="p-12 space-y-6">
              <h2 className="font-bold">4. INSURANCE AND BONDS</h2>
              
              <div>
                <h3 className="font-bold text-sm">4.1 INSURANCE REQUIREMENTS</h3>
                <p className="text-sm mt-2 leading-relaxed">
                  The selected Construction Manager shall maintain the following insurance coverage:
                </p>
                <ul className="text-sm space-y-2 list-disc pl-8 mt-3">
                  <li>General Liability Insurance: Minimum $2,000,000 per occurrence</li>
                  <li>Professional Liability Insurance: Minimum $1,000,000 per claim</li>
                  <li>Workers' Compensation: As required by state law</li>
                  <li>Automobile Liability: Minimum $1,000,000 combined single limit</li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold text-sm">4.2 PERFORMANCE BOND</h3>
                <p className="text-sm mt-2 leading-relaxed">
                  A performance bond in the amount of 100% of the construction contract value may be required, to be determined during contract negotiations.
                </p>
              </div>

              <div className="border-t pt-4">
                <h2 className="font-bold">5. PROPOSAL FORMAT</h2>
                <p className="text-sm mt-2 leading-relaxed">
                  Proposals shall be submitted in the following format and include the information outlined below:
                </p>
              </div>

              <div className="mt-4">
                <h3 className="font-bold text-sm">5.1 COVER LETTER</h3>
                <p className="text-sm mt-2 leading-relaxed">
                  Provide a brief introduction to your firm and summarize your interest in this project.
                </p>
              </div>

              <div className="mt-4">
                <h3 className="font-bold text-sm">5.2 FIRM QUALIFICATIONS</h3>
                <p className="text-sm mt-2 leading-relaxed">
                  Include the following information:
                </p>
                <div
                  ref={activeHighlight === "section-qualifications" ? highlightRef : null}
                  className={cn(
                    "mt-3 p-2 -ml-2 transition-all duration-300",
                    activeHighlight === "section-qualifications" &&
                      highlightColorClasses[highlightColor]
                  )}
                >
                  <ul className="text-sm space-y-2 list-disc pl-8">
                    <li>Company name, address, and primary contact information</li>
                    <li>Years in business and organizational structure</li>
                    <li>Number of employees and key personnel qualifications</li>
                    <li>Relevant certifications and licenses</li>
                    <li>Experience with historic renovation projects</li>
                    <li>Experience with projects of similar size and scope</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Page 4 */}
          <div
            className="bg-white max-w-3xl w-full shadow-lg"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          >
            <div className="p-12 space-y-6">
              <h2 className="font-bold">5. PROPOSAL FORMAT (continued)</h2>
              
              <div>
                <h3 className="font-bold text-sm">5.3 PROJECT REFERENCES</h3>
                <p className="text-sm mt-2 leading-relaxed">
                  Provide at least three (3) references for similar projects completed within the past five years. For each reference, include:
                </p>
                <ul className="text-sm space-y-2 list-disc pl-8 mt-3">
                  <li>Project name and location</li>
                  <li>Client name and contact information</li>
                  <li>Project scope and budget</li>
                  <li>Construction timeline</li>
                  <li>Your firm's role and responsibilities</li>
                  <li>Unique challenges and solutions</li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold text-sm">5.4 PROJECT APPROACH</h3>
                <p className="text-sm mt-2 leading-relaxed">
                  Describe your proposed approach to managing this project, including:
                </p>
                <ul className="text-sm space-y-2 list-disc pl-8 mt-3">
                  <li>Project management methodology</li>
                  <li>Communication and reporting procedures</li>
                  <li>Quality control measures</li>
                  <li>Schedule management strategies</li>
                  <li>Cost control procedures</li>
                  <li>Safety program overview</li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold text-sm">5.5 FEE PROPOSAL</h3>
                <p className="text-sm mt-2 leading-relaxed">
                  Provide a detailed fee structure for both pre-construction and construction phase services. Clearly identify:
                </p>
                <div
                  ref={activeHighlight === "section-budget" ? highlightRef : null}
                  className={cn(
                    "mt-3 p-2 -ml-2 transition-all duration-300",
                    activeHighlight === "section-budget" &&
                      highlightColorClasses[highlightColor]
                  )}
                >
                  <ul className="text-sm space-y-2 list-disc pl-8">
                    <li>Pre-construction services fee (fixed fee or hourly)</li>
                    <li>Construction phase management fee (percentage or fixed)</li>
                    <li>Reimbursable expenses</li>
                    <li>Any additional services and associated costs</li>
                  </ul>
                </div>
              </div>

              <div className="border-t pt-4">
                <h2 className="font-bold">6. PROPOSAL SUBMITTAL</h2>
                <p className="text-sm mt-2 leading-relaxed">
                  Submit five (5) hard copies and one (1) electronic copy (PDF format) of your proposal to:
                </p>
                <div className="text-sm mt-3 pl-4">
                  <p className="font-semibold">Incourage Community Foundation</p>
                  <p>Attn: Tribune Building Project</p>
                  <p>478 E. Grand Avenue</p>
                  <p>Wisconsin Rapids, WI 54494</p>
                </div>
              </div>
            </div>
          </div>

          {/* Page 5 */}
          <div
            className="bg-white max-w-3xl w-full shadow-lg"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          >
            <div className="p-12 space-y-6">
              <h2 className="font-bold">7. PROPOSER'S SITE VISIT & Q&A SESSION</h2>
              
              <div>
                <p className="text-sm mt-2 leading-relaxed">
                  A mandatory site visit and Q&A session will be held on:
                </p>
                <div className="text-sm mt-3 pl-4 space-y-1">
                  <p><strong>Date:</strong> Tuesday, January 27, 2015</p>
                  <p><strong>Time:</strong> 10:00 a.m. CST</p>
                  <p><strong>Location:</strong> Tribune Building, 220 First Avenue South, Wisconsin Rapids, WI</p>
                </div>
                <p className="text-sm mt-3 leading-relaxed">
                  All interested firms must attend this session. Questions may be submitted in writing via email to tribuneproject@incouragecf.org by January 30, 2015. Responses to all questions will be distributed to all prospective proposers by February 3, 2015.
                </p>
              </div>

              <div className="border-t pt-4">
                <h2 className="font-bold">8. FINAL SELECTION</h2>
                <p className="text-sm mt-2 leading-relaxed">
                  The selection process will be conducted as follows:
                </p>
                <div
                  ref={activeHighlight === "section-selection-timeline" ? highlightRef : null}
                  className={cn(
                    "mt-3 p-2 -ml-2 transition-all duration-300",
                    activeHighlight === "section-selection-timeline" &&
                      highlightColorClasses[highlightColor]
                  )}
                >
                  <ul className="text-sm space-y-2 list-disc pl-8">
                    <li><strong>Proposal Review:</strong> All submitted proposals will be reviewed by the selection committee</li>
                    <li><strong>Shortlist:</strong> Up to three (3) firms will be selected for interviews</li>
                    <li><strong>Interviews:</strong> Scheduled for the week of February 23, 2015</li>
                    <li><strong>Final Selection:</strong> The selected firm will be notified by March 6, 2015</li>
                    <li><strong>Contract Negotiation:</strong> To be completed by March 20, 2015</li>
                  </ul>
                </div>
                <p className="text-sm mt-4 leading-relaxed">
                  Incourage reserves the right to reject any or all proposals and to waive any informalities or irregularities in the selection process.
                </p>
              </div>

              <div className="border-t pt-4">
                <h2 className="font-bold">9. ADDITIONAL INFORMATION REQUESTS</h2>
                <p className="text-sm mt-2 leading-relaxed">
                  For additional information or questions regarding this RFP, please contact:
                </p>
                <div className="text-sm mt-3 pl-4 space-y-1">
                  <p><strong>Kelly Ryan</strong></p>
                  <p>President & CEO</p>
                  <p>Incourage Community Foundation</p>
                  <p>Phone: (715) 423-3863</p>
                  <p>Email: tribuneproject@incouragecf.org</p>
                </div>
              </div>

              <div className="border-t pt-6 mt-8">
                <p className="text-sm text-center text-muted-foreground">
                  – End of Document –
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

      {/* Page Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background border rounded-lg shadow-lg px-3 py-1">
        <span className="text-sm font-medium">
          Page {currentPage} of 11
        </span>
      </div>
    </div>
  );
}

