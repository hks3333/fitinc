"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { Icon as TablerIcon } from "@tabler/icons-react"
import { IconEdit } from "@tabler/icons-react"

export interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'steps' | 'calories' | 'water' | 'weight' | 'distance' | 'frequency'; // Add more as needed
  targetValue: number;
  currentValue: number;
  unit: string;
  Icon: TablerIcon;
  status: 'active' | 'completed';
  // Optional deadline: Date;
}

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  // onUpdateProgress?: (goalId: string) => void; // Future enhancement
  // onArchive?: (goalId: string) => void; // Future enhancement
}

export function GoalCard({ goal, onEdit }: GoalCardProps) {
  const { title, description, targetValue, currentValue, unit, Icon, status } = goal;

  const progressPercentage = targetValue > 0 ? Math.min(100, Math.round((currentValue / targetValue) * 100)) : 0;

  // Format numbers for display (optional but nice)
  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <goal.Icon className="h-8 w-8 text-primary flex-shrink-0" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow justify-between">
        <div>
          <div className="mb-2">
            <span className="text-2xl font-bold">{formatNumber(currentValue)}</span>
            <span className="text-lg text-muted-foreground"> / {formatNumber(targetValue)} {unit}</span>
          </div>
          <Progress value={progressPercentage} aria-label={`${title} progress`} className="h-3" />
          <div className="text-xs text-muted-foreground mt-1 text-right">
            {progressPercentage}% complete
          </div>
        </div>
        <div className="mt-4 flex gap-2">
           {/* Add other buttons like "Log Progress" or "Archive" later if needed */}
           <Button
            variant="outline"
            size="sm"
            className="w-full cursor-pointer"
            onClick={() => onEdit(goal)}
            disabled={status === 'completed'} // Example: Disable editing completed goals
          >
            <IconEdit className="h-4 w-4 mr-2" />
            Edit Goal
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}