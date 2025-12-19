"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, X, Save, Mail, Video } from "lucide-react";
import { MainLayout, PageHeader } from "@/components/layout";
import { RichTextEditor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { projectInfo, questionsData } from "@/lib/data";

// Generate initial HTML content from questions data
const generateQuestionsHTML = () => {
  let html = "<ul>";
  
  questionsData.forEach((section) => {
    html += `<li><strong>${section.title}</strong><ul>`;
    section.questions.forEach((q) => {
      html += `<li>${q.text}</li>`;
    });
    html += "</ul></li>";
  });
  
  html += "</ul>";
  return html;
};

export default function EditorPage() {
  const router = useRouter();
  const [content, setContent] = useState(generateQuestionsHTML());

  const breadcrumbs = [
    { label: "Discussions", href: "/discussions" },
    { label: "Summary", href: "/summary" },
    { label: "Review", href: "/review" },
    { label: "Deliverables", href: "/deliverables" },
    { label: "Edit deliverables", active: true },
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
      onClick: () => router.push("/deliverables"),
    },
    {
      label: "Save",
      icon: <Save className="h-4 w-4" />,
      variant: "default" as const,
      onClick: () => router.push("/discussions"),
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

      <div className="flex-1 overflow-hidden">
        <RichTextEditor content={content} onChange={setContent} />
      </div>

      {/* Bottom Action Bar */}
      <div className="border-t bg-card px-6 py-4 flex justify-end gap-3">
        <Button variant="outline" className="gap-2">
          <Mail className="h-4 w-4" />
          Generate email
        </Button>
        <Button variant="outline" className="gap-2" onClick={() => router.push("/call")}>
          <Video className="h-4 w-4" />
          Video call
        </Button>
      </div>
    </MainLayout>
  );
}

