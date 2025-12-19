"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  User,
  ArrowUpDown,
  Settings,
  ChevronDown,
  Calculator,
  Pencil,
} from "lucide-react";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  discussionsThisMonth,
  discussionsNextMonth,
  discussionsLoaded,
  timelineData,
} from "@/lib/data";

function DiscussionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("main");
  const [isLoading, setIsLoading] = useState(false);
  const [loadedData, setLoadedData] = useState(false);

  // Check if we came from the output page with loading state
  useEffect(() => {
    if (searchParams.get("loading") === "true") {
      setIsLoading(true);
      // Simulate loading for 3 seconds
      const timer = setTimeout(() => {
        setIsLoading(false);
        setLoadedData(true);
        // Clean up the URL
        router.replace("/discussions");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  const currentDiscussions = loadedData
    ? discussionsLoaded
    : discussionsThisMonth;

  const handleRowClick = (subject: string) => {
    if (subject.toLowerCase().includes("request for proposal")) {
      router.push("/deliverables");
    }
  };

  const renderTableRow = (discussion: typeof discussionsThisMonth[0], index: number, isFirstTable: boolean = false) => {
    if (discussion.isLoading || (isLoading && index === 0)) {
      return (
        <TableRow key={discussion.id} className="bg-muted/30">
          <TableCell>
            <Checkbox disabled />
          </TableCell>
          <TableCell>
            <div className="h-4 w-32 animate-shimmer rounded" />
          </TableCell>
          <TableCell>
            <div className="h-4 w-16 animate-shimmer rounded" />
          </TableCell>
          <TableCell>
            <div className="h-4 w-24 animate-shimmer rounded" />
          </TableCell>
          <TableCell>
            <div className="h-4 w-24 animate-shimmer rounded" />
          </TableCell>
          <TableCell>
            <div className="h-4 w-20 animate-shimmer rounded" />
          </TableCell>
          <TableCell>
            <div className="h-4 w-24 animate-shimmer rounded" />
          </TableCell>
          <TableCell>
            <div className="h-4 w-24 animate-shimmer rounded" />
          </TableCell>
        </TableRow>
      );
    }

    return (
      <TableRow
        key={discussion.id}
        className="cursor-pointer hover:bg-muted/50"
        onClick={() => handleRowClick(discussion.subject)}
      >
        <TableCell>
          <Checkbox onClick={(e) => e.stopPropagation()} />
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <span className="font-medium">{discussion.subject}</span>
            {discussion.count && (
              <Badge variant="secondary" className="text-xs">
                {discussion.count}
              </Badge>
            )}
          </div>
        </TableCell>
        <TableCell className="text-muted-foreground">
          {discussion.fileType}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {discussion.input}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {discussion.project}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {discussion.participants}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {discussion.date}
        </TableCell>
        <TableCell>
          {isFirstTable && index === 0 ? (
            <Button
              variant="default"
              size="sm"
              onClick={(e) => e.stopPropagation()}
              className="gap-2"
            >
              <Calculator className="h-4 w-4" />
              Generate Estimate
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => e.stopPropagation()}
              className="gap-2"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
          )}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">Discussions</h1>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="main">Main table</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === "main" ? (
          <>
            {/* Toolbar */}
            <div className="px-6 py-3 border-b flex items-center gap-3 flex-wrap">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add new task
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                person
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                person
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </Button>
            </div>

            {/* Tables */}
            <ScrollArea className="flex-1">
              <div className="px-6 py-4 space-y-8">
                {/* This Month */}
                <div>
                  <button className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <ChevronDown className="h-4 w-4" />
                    This month
                  </button>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted hover:bg-muted">
                          <TableHead className="w-12">
                            <Checkbox />
                          </TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>File</TableHead>
                          <TableHead>Input</TableHead>
                          <TableHead>Project</TableHead>
                          <TableHead>Participants</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentDiscussions.map((discussion, index) =>
                          renderTableRow(discussion, index, true)
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Next Month */}
                <div>
                  <button className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <ChevronDown className="h-4 w-4" />
                    Next month
                  </button>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted hover:bg-muted">
                          <TableHead className="w-12">
                            <Checkbox />
                          </TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>File</TableHead>
                          <TableHead>Input</TableHead>
                          <TableHead>Project</TableHead>
                          <TableHead>Participants</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {discussionsNextMonth.map((discussion, index) =>
                          renderTableRow(discussion, index, false)
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </>
        ) : (
          /* Timeline View */
          <ScrollArea className="flex-1">
            <div className="px-6 py-4">
              {/* Toolbar */}
              <div className="pb-4 border-b flex items-center gap-3 flex-wrap mb-6">
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add new task
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  person
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  person
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  Sort
                </Button>
              </div>

              <h2 className="text-xl font-semibold mb-6">Timeline</h2>

              {/* Timeline Groups */}
              <div className="space-y-8">
                {timelineData.map((group) => (
                  <div key={group.label}>
                    <h3 className="text-lg font-semibold mb-4">{group.label}</h3>
                    <div className="space-y-4 relative">
                      {/* Vertical line */}
                      <div className="absolute left-4 top-2 bottom-2 w-px bg-border" />

                      {group.events.map((event, index) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-4 pl-1"
                        >
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 z-10">
                            <Settings className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0 pt-1">
                            <p className="text-sm">{event.description}</p>
                            {event.hasViewMore && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2 -ml-2"
                              >
                                View More
                              </Button>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground shrink-0">
                            {event.timestamp}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        )}
      </div>
    </MainLayout>
  );
}

export default function DiscussionsPage() {
  return (
    <Suspense fallback={
      <MainLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </MainLayout>
    }>
      <DiscussionsContent />
    </Suspense>
  );
}

