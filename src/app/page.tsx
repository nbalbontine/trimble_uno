"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Circle } from "lucide-react";
import { MainLayout } from "@/components/layout";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

const analysisSteps = [
  { id: 1, label: "Identifying requirements", duration: 2000 },
  { id: 2, label: "Quantifying expectations", duration: 2000 },
  { id: 3, label: "Finding externally referenced documents", duration: 2500 },
  { id: 4, label: "Extracting drawing info", duration: 1500 },
];

type StepStatus = "pending" | "in-progress" | "completed";

export default function AnalysisPage() {
  const router = useRouter();
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    analysisSteps.map(() => "pending")
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start the first step
    setStepStatuses((prev) => {
      const newStatuses = [...prev];
      newStatuses[0] = "in-progress";
      return newStatuses;
    });

    let totalElapsed = 0;
    const totalDuration = analysisSteps.reduce((sum, step) => sum + step.duration, 0);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      totalElapsed += 50;
      const newProgress = Math.min((totalElapsed / totalDuration) * 100, 100);
      setProgress(newProgress);
    }, 50);

    // Step progression
    const runSteps = async () => {
      for (let i = 0; i < analysisSteps.length; i++) {
        // Set current step to in-progress
        setStepStatuses((prev) => {
          const newStatuses = [...prev];
          newStatuses[i] = "in-progress";
          return newStatuses;
        });

        // Wait for step duration
        await new Promise((resolve) =>
          setTimeout(resolve, analysisSteps[i].duration)
        );

        // Mark step as completed
        setStepStatuses((prev) => {
          const newStatuses = [...prev];
          newStatuses[i] = "completed";
          return newStatuses;
        });
      }

      // All steps complete
      clearInterval(progressInterval);
      setProgress(100);

      // Navigate to summary after a brief delay
      setTimeout(() => {
        router.push("/summary");
      }, 500);
    };

    runSteps();

    return () => {
      clearInterval(progressInterval);
    };
  }, [router]);

  const getStepIcon = (status: StepStatus) => {
    switch (status) {
      case "completed":
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        );
      case "in-progress":
        return (
          <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
            <Loader2 className="w-4 h-4 text-primary animate-spin" />
          </div>
        );
      default:
        return (
          <Circle className="w-6 h-6 text-muted-foreground/40" strokeWidth={1.5} />
        );
    }
  };

  return (
    <MainLayout showSidebar={false}>
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-lg p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-xl font-semibold">
                Your files are being analysed
              </h1>
              <p className="text-sm text-muted-foreground">
                Stay on this page. This process can take a few moments.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
            </div>

            {/* Steps */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {analysisSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    {getStepIcon(stepStatuses[index])}
                    <span
                      className={`text-sm ${
                        stepStatuses[index] === "completed"
                          ? "text-foreground"
                          : stepStatuses[index] === "in-progress"
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </Card>
      </div>
    </MainLayout>
  );
}
