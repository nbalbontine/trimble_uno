"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, MoreHorizontal, X, User, UserCog, Building2, FolderOpen, MapPin, Clock } from "lucide-react";
import { MainLayout, PageHeader } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { projectInfo, summaryObservations } from "@/lib/data";
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

export default function SummaryPage() {
  const router = useRouter();

  const breadcrumbs = [
    { label: "Discussions", href: "/discussions" },
    { label: "Summary", active: true },
  ];

  const actions = [
    { label: "More", icon: <MoreHorizontal className="h-4 w-4" />, variant: "outline" as const },
    { label: "cancel", icon: <X className="h-4 w-4" />, variant: "outline" as const },
    {
      label: "Review documents",
      icon: <FileText className="h-4 w-4" />,
      variant: "default" as const,
      onClick: () => router.push("/review"),
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
          {/* Left Panel - Project Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <ScrollArea className="h-full">
                <CardContent className="p-6 space-y-8">
                  {/* Contact Section */}
                  <section>
                    <h2 className="text-lg font-semibold mb-4">Contact</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <span className="text-muted-foreground text-xs block">Primary Contact</span>
                          <span className="font-medium">{projectInfo.contact.primaryContact}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <UserCog className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <span className="text-muted-foreground text-xs block">Engineer Architect</span>
                          <span className="font-medium">{projectInfo.contact.engineerArchitect}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <span className="text-muted-foreground text-xs block">Customer</span>
                          <span className="font-medium">{projectInfo.contact.customer}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <FolderOpen className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <span className="text-muted-foreground text-xs block">Project</span>
                          <span className="font-medium">{projectInfo.contact.project}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <span className="text-muted-foreground text-xs block">Address</span>
                          <span className="font-medium">{projectInfo.contact.address}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <span className="text-muted-foreground text-xs block">Due Date</span>
                          <span className="font-medium">{projectInfo.contact.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Scope Section */}
                  <section>
                    <h2 className="text-lg font-semibold mb-4">Scope</h2>
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

                  {/* Safety Documentation Section */}
                  <section>
                    <h2 className="text-lg font-semibold mb-4">Safety documentation</h2>
                    <ul className="space-y-3 text-sm">
                      {projectInfo.safetyDocumentation.map((item, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-muted-foreground">•</span>
                          <span>
                            <strong>{item.title}:</strong> {item.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </CardContent>
              </ScrollArea>
            </Card>
          </motion.div>

          {/* Right Panel - Observations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Observations</CardTitle>
              </CardHeader>
              <ScrollArea className="h-[calc(100%-60px)]">
                <CardContent className="space-y-3 pt-0">
                  {summaryObservations.map((observation, index) => (
                    <motion.div
                      key={observation.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Card className="bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div
                              className={cn(
                                "w-3 h-3 rounded-full mt-1 shrink-0",
                                colorClasses[observation.color]
                              )}
                            />
                            <div className="min-w-0">
                              <h3 className="font-medium text-sm truncate">
                                {observation.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {observation.description}
                              </p>
                            </div>
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
    </MainLayout>
  );
}

