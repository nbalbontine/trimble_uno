"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, X, Save, Mail, Video } from "lucide-react";
import { MainLayout, PageHeader } from "@/components/layout";
import { RichTextEditor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { projectInfo, questionsData } from "@/lib/data";

// Generate HTML content with questions AND answers
const generateAnsweredQuestionsHTML = () => {
  let html = "<ul>";
  
  questionsData.forEach((section) => {
    html += `<li><strong>${section.title}</strong><ul>`;
    section.questions.forEach((q) => {
      if (q.answer) {
        html += `<li><strong>${q.text.split('?')[0]}?</strong><br/>${q.answer}</li>`;
      } else {
        html += `<li>${q.text}</li>`;
      }
    });
    html += "</ul></li>";
  });
  
  html += "</ul>";
  return html;
};

export default function OutputPage() {
  const router = useRouter();
  const [content, setContent] = useState(generateAnsweredQuestionsHTML());

  const breadcrumbs = [
    { label: "Discussions", href: "/discussions" },
    { label: "Summary", href: "/summary" },
    { label: "Review", href: "/review" },
    { label: "Output", href: "/deliverables" },
    { label: "Output view", active: true },
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
      onClick: () => router.push("/discussions?loading=true"),
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

