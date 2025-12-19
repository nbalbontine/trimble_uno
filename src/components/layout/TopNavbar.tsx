"use client";

import { Bell, Settings, HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TopNavbarProps {
  title?: string;
}

export function TopNavbar({ title = "Trimble uno" }: TopNavbarProps) {
  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4 shrink-0">
      {/* Left side - Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">T</span>
        </div>
        <span className="font-semibold text-lg tracking-tight">{title}</span>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-1">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Help</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Settings className="h-5 w-5 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="w-px h-6 bg-border mx-2" />

        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src="" alt="User" />
          <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
            NB
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

