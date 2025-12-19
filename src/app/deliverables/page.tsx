"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MoreHorizontal, X, Save, Mail, Video, MoreVertical } from "lucide-react";
import { MainLayout, PageHeader } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  projectInfo,
  deliverables,
  kanbanObservations,
  kanbanSuggestions,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const colorClasses: Record<string, string> = {
  red: "bg-[hsl(var(--observation-red))]",
  orange: "bg-[hsl(var(--observation-orange))]",
  yellow: "bg-[hsl(var(--observation-yellow))]",
  green: "bg-[hsl(var(--observation-green))]",
  blue: "bg-[hsl(var(--observation-blue))]",
  purple: "bg-[hsl(var(--observation-purple))]",
  gray: "bg-[hsl(var(--observation-gray))]",
};

export default function DeliverablesPage() {
  const router = useRouter();

  const breadcrumbs = [
    { label: "Discussions", href: "/discussions" },
    { label: "Summary", href: "/summary" },
    { label: "Review", href: "/review" },
    { label: "Deliverables", active: true },
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
      onClick: () => router.push("/review"),
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

      <div className="flex-1 overflow-hidden p-4 md:p-6">
        <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-muted" />
                  <CardTitle className="text-base">Project Details</CardTitle>
                </div>
              </CardHeader>
              <ScrollArea className="h-[calc(100%-60px)]">
                <CardContent className="p-4 space-y-6">
                  {/* Summary Section */}
                  <section>
                    <h2 className="text-lg font-semibold mb-4">Summary</h2>
                    <ul className="space-y-3 text-sm">
                      {projectInfo.scope.map((item, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-muted-foreground">•</span>
                          <span>
                            <strong>{item.title}:</strong> {item.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Deliverables Section */}
                  <section>
                    <h2 className="text-lg font-semibold mb-4">Deliverables</h2>
                    <ul className="space-y-3">
                      {deliverables.map((item) => (
                        <li key={item.id} className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-3 h-3 rounded-full shrink-0",
                              colorClasses[item.color]
                            )}
                          />
                          <span className="text-sm">{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </CardContent>
              </ScrollArea>
            </Card>
          </motion.div>

          {/* Center Column - Observations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-muted" />
                  <CardTitle className="text-base">Observation</CardTitle>
                </div>
              </CardHeader>
              <ScrollArea className="h-[calc(100%-60px)]">
                <CardContent className="p-4 grid grid-rows-2 gap-4 h-full">
                  {kanbanObservations.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.05 }}
                      className="min-h-0"
                    >
                      <Card className="bg-muted/50 h-full">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  "w-3 h-3 rounded-full mt-1 shrink-0",
                                  colorClasses[item.color]
                                )}
                              />
                              <div>
                                <h4 className="font-medium text-sm">
                                  {item.title}
                                </h4>
                                {item.items && item.items.length > 0 && (
                                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                    {item.items.map((subItem, i) => (
                                      <li key={i} className="flex gap-2">
                                        <span>•</span>
                                        <span>{subItem}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                                {item.description && (
                                  <p className="text-sm text-muted-foreground mt-2">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </CardContent>
              </ScrollArea>
            </Card>
          </motion.div>

          {/* Right Column - Suggested Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full bg-green-50/50 dark:bg-green-950/10">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-200 dark:bg-green-800" />
                  <CardTitle className="text-base">Suggested output</CardTitle>
                </div>
              </CardHeader>
              <ScrollArea className="h-[calc(100%-60px)]">
                <CardContent className="p-4 space-y-4">
                  {kanbanSuggestions.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + index * 0.05 }}
                    >
                      <Card className="bg-white dark:bg-card">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  "w-3 h-3 rounded-full mt-1 shrink-0",
                                  colorClasses[item.color]
                                )}
                              />
                              <div>
                                <h4 className="font-medium text-sm">
                                  {item.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {item.description}
                                </p>
                                {item.items && item.items.length > 0 && (
                                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                    {item.items.map((subItem, i) => (
                                      <li key={i} className="flex gap-2">
                                        <span>•</span>
                                        <span>{subItem}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Action Button */}
                          <div className="mt-4 flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push("/editor")}
                            >
                              {item.id === "suggest-1"
                                ? "View questions"
                                : "View suggestions"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </CardContent>
              </ScrollArea>
            </Card>
          </motion.div>
        </div>
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

