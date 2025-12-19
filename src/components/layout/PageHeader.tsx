"use client";

import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ReactNode, Fragment } from "react";

interface BreadcrumbStep {
  label: string;
  href?: string;
  active?: boolean;
}

interface ActionButton {
  label: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
  icon?: ReactNode;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbStep[];
  actions?: ActionButton[];
}

export function PageHeader({
  title,
  subtitle,
  badge,
  breadcrumbs,
  actions,
}: PageHeaderProps) {
  return (
    <div className="border-b bg-card px-4 md:px-6 py-3 md:py-4 shrink-0">
      {/* Title Row */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          {badge && (
            <Badge variant="outline" className="font-normal">
              {badge}
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        {actions && actions.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "outline"}
                onClick={action.onClick}
                className="gap-2"
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm text-muted-foreground mb-3">{subtitle}</p>
      )}

      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <Fragment key={index}>
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink
                      href={crumb.href}
                      className={crumb.active ? "text-foreground font-medium" : ""}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-muted flex items-center justify-center text-[10px] text-muted-foreground">
                          {index + 1}
                        </span>
                        {crumb.label}
                      </span>
                    </BreadcrumbLink>
                  ) : (
                    <span
                      className={`flex items-center gap-2 text-sm ${
                        crumb.active
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span className="w-4 h-4 rounded bg-muted flex items-center justify-center text-[10px]">
                        {index + 1}
                      </span>
                      {crumb.label}
                    </span>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                )}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </div>
  );
}

