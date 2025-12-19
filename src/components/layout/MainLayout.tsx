"use client";

import { ReactNode } from "react";
import { TopNavbar } from "./TopNavbar";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  showNavbar?: boolean;
}

export function MainLayout({
  children,
  showSidebar = true,
  showNavbar = true,
}: MainLayoutProps) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {showNavbar && <TopNavbar />}
      
      <div className="flex-1 flex overflow-hidden">
        {showSidebar && <Sidebar />}
        
        <main className="flex-1 overflow-hidden flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}

