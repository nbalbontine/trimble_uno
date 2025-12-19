"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Camera,
  Mic,
  Send,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Observation } from "@/lib/data/observations";

interface ObservationPanelProps {
  categories: string[];
  observations: Observation[];
  selectedObservation: string | null;
  onSelectObservation: (id: string | null) => void;
}

const colorClasses: Record<string, string> = {
  red: "bg-[hsl(var(--observation-red))]",
  orange: "bg-[hsl(var(--observation-orange))]",
  yellow: "bg-[hsl(var(--observation-yellow))]",
  green: "bg-[hsl(var(--observation-green))]",
  blue: "bg-[hsl(var(--observation-blue))]",
  purple: "bg-[hsl(var(--observation-purple))]",
  gray: "bg-[hsl(var(--observation-gray))]",
};

const borderColorClasses: Record<string, string> = {
  red: "border-[hsl(var(--observation-red))]",
  orange: "border-[hsl(var(--observation-orange))]",
  yellow: "border-[hsl(var(--observation-yellow))]",
  green: "border-[hsl(var(--observation-green))]",
  blue: "border-[hsl(var(--observation-blue))]",
  purple: "border-[hsl(var(--observation-purple))]",
  gray: "border-[hsl(var(--observation-gray))]",
};

const bgColorClasses: Record<string, string> = {
  red: "bg-[hsl(var(--observation-red)/0.05)]",
  orange: "bg-[hsl(var(--observation-orange)/0.05)]",
  yellow: "bg-[hsl(var(--observation-yellow)/0.05)]",
  green: "bg-[hsl(var(--observation-green)/0.05)]",
  blue: "bg-[hsl(var(--observation-blue)/0.05)]",
  purple: "bg-[hsl(var(--observation-purple)/0.05)]",
  gray: "bg-[hsl(var(--observation-gray)/0.05)]",
};

export function ObservationPanel({
  categories,
  observations,
  selectedObservation,
  onSelectObservation,
}: ObservationPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCards, setExpandedCards] = useState<string[]>([]);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const filteredObservations = observations.filter(
    (obs) =>
      obs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obs.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCardExpand = (id: string) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleCommentChange = (obsId: string, value: string) => {
    setCommentInputs((prev) => ({ ...prev, [obsId]: value }));
  };

  const handleSendComment = (obsId: string) => {
    console.log("Sending comment for", obsId, ":", commentInputs[obsId]);
    setCommentInputs((prev) => ({ ...prev, [obsId]: "" }));
  };

  const renderObservationCard = (observation: Observation) => {
    const isSelected = selectedObservation === observation.id;
    const isExpanded = expandedCards.includes(observation.id);

    return (
      <motion.div
        key={observation.id}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card
          className={cn(
            "transition-all duration-200 cursor-pointer overflow-hidden",
            isSelected
              ? cn(
                  "border-2",
                  borderColorClasses[observation.color],
                  bgColorClasses[observation.color]
                )
              : "border hover:bg-muted/50"
          )}
          onClick={() =>
            onSelectObservation(isSelected ? null : observation.id)
          }
        >
          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full mt-1 shrink-0",
                    colorClasses[observation.color]
                  )}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">
                      Observation
                    </span>
                  </div>
                  <h4 className="font-medium text-sm">{observation.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {observation.description}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Expandable Content */}
            <Collapsible open={isExpanded}>
              <CollapsibleTrigger
                className="w-full text-left flex items-start justify-start"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCardExpand(observation.id);
                }}
              >
                <span className="text-xs text-primary mt-3 hover:underline whitespace-nowrap flex-shrink-0">
                  {isExpanded ? "Hide comments" : "Add comment"}
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden">
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="mt-3 space-y-3 border-t pt-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Existing Comments */}
                      {observation.comments?.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className="text-xs">
                              {comment.author.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {comment.author}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {comment.role}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Comment Input */}
                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Input
                          placeholder="Add a comment..."
                          value={commentInputs[observation.id] || ""}
                          onChange={(e) =>
                            handleCommentChange(observation.id, e.target.value)
                          }
                          className="h-8 text-sm"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                        >
                          <Mic className="h-4 w-4" />
                        </Button>
                        {commentInputs[observation.id] && (
                          <Button
                            size="icon"
                            className="h-8 w-8 shrink-0"
                            onClick={() => handleSendComment(observation.id)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="h-full flex flex-col border-l bg-card">
      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search observations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Accordion Categories */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Accordion type="multiple" defaultValue={categories} className="space-y-2">
            {categories.map((category) => {
              const categoryObservations = filteredObservations.filter(
                (obs) => obs.category === category
              );

              return (
                <AccordionItem
                  key={category}
                  value={category}
                  className="border rounded-lg px-4"
                >
                  <AccordionTrigger className="hover:no-underline py-3">
                    <span className="font-medium text-sm">{category}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pb-2">
                      {categoryObservations.length > 0 ? (
                        categoryObservations.map(renderObservationCard)
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No observations in this category
                        </p>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}

