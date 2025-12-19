"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, X, ArrowRight } from "lucide-react";
import { MainLayout, PageHeader } from "@/components/layout";
import { PDFMock } from "@/components/documents/PDFMock";
import { PDFPageList } from "@/components/documents/PDFPageList";
import { FileList } from "@/components/documents/FileList";
import { MapViewer } from "@/components/documents/MapViewer";
import { MapLayersPanel } from "@/components/documents/MapLayersPanel";
import { ObservationPanel } from "@/components/observations";
import {
  files,
  projectInfo,
  documentObservations,
  mapObservations,
  observationCategories,
} from "@/lib/data";

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  children?: Layer[];
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

export default function ReviewPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState("rfp");
  const [showFileList, setShowFileList] = useState(false);
  const [selectedObservation, setSelectedObservation] = useState<string | null>(
    null
  );
  const [layers, setLayers] = useState<Layer[]>(initialLayers);
  const [selectedPage, setSelectedPage] = useState(1);
  const totalRFPPages = 11;

  const isMapView = selectedFile === "golf-course";

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

  const handleBackToFiles = () => {
    setShowFileList(true);
  };

  const handleSelectFile = (fileId: string) => {
    setSelectedFile(fileId);
    setShowFileList(false);
    setSelectedPage(1); // Reset to first page when changing files
  };

  const selectedFileName = files.find((f) => f.id === selectedFile)?.name || "Back";

  return (
    <MainLayout navbarTitle="Request for Proposal">
      <PageHeader
        title={projectInfo.title}
        subtitle={projectInfo.subtitle}
        badge={projectInfo.projectName}
        breadcrumbs={breadcrumbs}
        actions={actions}
      />

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        {/* Left - File List OR PDF Page List OR Map Layers Panel */}
        <div className="w-full lg:w-64 shrink-0 border-b lg:border-b-0">
          {showFileList ? (
            <FileList
              files={files}
              selectedFile={selectedFile}
              onSelectFile={handleSelectFile}
            />
          ) : isMapView ? (
            <MapLayersPanel
              fileName={selectedFileName}
              onBack={handleBackToFiles}
              layers={layers}
              onLayerToggle={toggleLayerVisibility}
              selectedPage={selectedPage.toString()}
              onPageSelect={(page) => setSelectedPage(parseInt(page))}
            />
          ) : (
            <PDFPageList
              totalPages={totalRFPPages}
              selectedPage={selectedPage}
              onSelectPage={setSelectedPage}
              fileName={selectedFileName}
              onBack={handleBackToFiles}
            />
          )}
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
              currentPage={selectedPage}
            />
          )}
        </div>

        {/* Right - Observation Panel */}
        <div className="w-full lg:w-96 shrink-0 border-t lg:border-t-0">
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

