"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, X, ArrowRight } from "lucide-react";
import { MainLayout, PageHeader } from "@/components/layout";
import { PDFMock } from "@/components/documents/PDFMock";
import { FileList } from "@/components/documents/FileList";
import { MapViewer } from "@/components/documents/MapViewer";
import { ObservationPanel } from "@/components/observations";
import {
  files,
  projectInfo,
  documentObservations,
  mapObservations,
  observationCategories,
} from "@/lib/data";

export default function ReviewPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState("rfp");
  const [selectedObservation, setSelectedObservation] = useState<string | null>(
    null
  );

  const isMapView = selectedFile === "golf-course";

  const currentObservations = isMapView ? mapObservations : documentObservations;
  const currentCategories = isMapView
    ? observationCategories.map
    : observationCategories.document;

  const selectedObs = currentObservations.find(
    (obs) => obs.id === selectedObservation
  );
  const activeHighlight = selectedObs?.highlightSections?.[0] || null;
  const highlightColor = selectedObs?.color || "red";

  const breadcrumbs = [
    { label: "Discussions", href: "/discussions" },
    { label: "Summary", href: "/summary" },
    { label: "Review", active: true },
  ];

  const actions = [
    {
      label: "More",
      icon: <MoreHorizontal className="h-4 w-4" />,
      variant: "outline" as const,
    },
    {
      label: "cancel",
      icon: <X className="h-4 w-4" />,
      variant: "outline" as const,
      onClick: () => router.push("/summary"),
    },
    {
      label: "Continue",
      icon: <ArrowRight className="h-4 w-4" />,
      variant: "default" as const,
      onClick: () => router.push("/deliverables"),
    },
  ];

  return (
    <MainLayout>
      <PageHeader
        title={projectInfo.title}
        subtitle={projectInfo.subtitle}
        badge={projectInfo.projectName}
        breadcrumbs={breadcrumbs}
        actions={actions}
      />

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        {/* Left - File List */}
        <div className="w-full lg:w-48 shrink-0 border-b lg:border-b-0">
          <FileList
            files={files}
            selectedFile={selectedFile}
            onSelectFile={setSelectedFile}
          />
        </div>

        {/* Center - Document/Map Viewer */}
        <div className="flex-1 overflow-hidden min-h-[300px] lg:min-h-0">
          {isMapView ? (
            <MapViewer
              activeHighlight={activeHighlight}
              highlightColor={highlightColor}
            />
          ) : (
            <PDFMock
              activeHighlight={activeHighlight}
              highlightColor={highlightColor}
            />
          )}
        </div>

        {/* Right - Observation Panel */}
        <div className="w-full lg:w-80 shrink-0 border-t lg:border-t-0">
          <ObservationPanel
            categories={currentCategories}
            observations={currentObservations}
            selectedObservation={selectedObservation}
            onSelectObservation={setSelectedObservation}
          />
        </div>
      </div>
    </MainLayout>
  );
}

