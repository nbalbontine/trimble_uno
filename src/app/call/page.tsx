"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Mic,
  Video,
  Captions,
  Hand,
  MonitorUp,
  MoreVertical,
  PhoneOff,
  Info,
  Users,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { questionsData } from "@/lib/data";

const participants = [
  { id: 1, name: "Sarah Chen", role: "Project Manager", isMain: true },
  { id: 2, name: "Michael Ross", role: "Engineer" },
  { id: 3, name: "Emily Davis", role: "Architect" },
  { id: 4, name: "James Wilson", role: "Safety Officer" },
];

export default function CallPage() {
  const router = useRouter();

  const handleHangUp = () => {
    router.push("/output");
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-900 text-white">
      {/* Header */}
      <header className="h-14 border-b border-zinc-700 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              E
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">Estimat</span>
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - Questions */}
        <div className="w-full lg:w-[500px] border-b lg:border-b-0 lg:border-r border-zinc-700 bg-zinc-800 flex flex-col max-h-[40vh] lg:max-h-none">
          <Card className="m-4 flex-1 bg-white text-foreground overflow-hidden">
            <CardContent className="p-0 h-full">
              <ScrollArea className="h-full">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Questions</h2>
                  <div className="space-y-4 text-sm">
                    {questionsData.map((section) => (
                      <div key={section.id}>
                        <h3 className="font-medium mb-2">{section.title}</h3>
                        <ul className="space-y-2 pl-4">
                          {section.questions.map((q) => (
                            <li key={q.id} className="flex gap-2">
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">{q.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Video Grid */}
        <div className="flex-1 flex flex-col p-4">
          <div className="flex-1 flex gap-4">
            {/* Main Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 relative rounded-xl overflow-hidden bg-zinc-700"
            >
              {/* Background GIF */}
              <img 
                src="/01.gif" 
                alt="Background" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>

            {/* Side Thumbnails */}
            <div className="w-48 flex flex-col gap-3">
              {participants.slice(1).map((participant, index) => (
                <motion.div
                  key={participant.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="aspect-video relative rounded-lg overflow-hidden bg-zinc-700 border border-zinc-600"
                >
                  {/* Add background GIF for Emily Davis */}
                  {participant.name === "Emily Davis" && (
                    <img 
                      src="/02.gif" 
                      alt="Background" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Add background photo for Michael Ross */}
                  {participant.name === "Michael Ross" && (
                    <img 
                      src="/Gemini_Generated_Image_e6ute8e6ute8e6ut.png" 
                      alt="Michael Ross Background" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Add background photo for James Wilson */}
                  {participant.name === "James Wilson" && (
                    <img 
                      src="/image5.png" 
                      alt="James Wilson Background" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Show avatar only for participants without backgrounds */}
                  {participant.name !== "Emily Davis" && participant.name !== "Michael Ross" && participant.name !== "James Wilson" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="text-sm">
                          {participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  
                  <div className="absolute bottom-1 left-1 right-1 z-10">
                    <p className="text-xs truncate text-center bg-black/50 rounded px-1">
                      {participant.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="h-20 border-t border-zinc-700 bg-zinc-800 flex items-center justify-between px-6">
        {/* Meeting Info */}
        <div className="text-sm">
          <span className="text-zinc-400">Class meeting</span>
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="lg"
            className="h-12 w-12 rounded-full bg-zinc-700 hover:bg-zinc-600"
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="h-12 w-12 rounded-full bg-zinc-700 hover:bg-zinc-600"
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="h-12 w-12 rounded-full bg-zinc-700 hover:bg-zinc-600"
          >
            <Captions className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="h-12 w-12 rounded-full bg-zinc-700 hover:bg-zinc-600"
          >
            <Hand className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="h-12 w-12 rounded-full bg-zinc-700 hover:bg-zinc-600"
          >
            <MonitorUp className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="h-12 w-12 rounded-full bg-zinc-700 hover:bg-zinc-600"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
          
          {/* Hang Up Button */}
          <Button
            size="lg"
            className="h-12 w-12 rounded-full bg-red-600 hover:bg-red-700 ml-2"
            onClick={handleHangUp}
          >
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-zinc-400 hover:text-white"
          >
            <Info className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-zinc-400 hover:text-white"
          >
            <Users className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-zinc-400 hover:text-white"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-zinc-400 hover:text-white"
          >
            <ShieldCheck className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

