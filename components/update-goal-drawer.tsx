"use client"

import { useState } from "react"
import { toast } from "sonner"
import { IconDroplet, IconFlame, IconWalk } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UpdateGoalDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  goalType: "steps" | "calories" | "water"
  currentGoal: string
  currentValue: string
}

export function UpdateGoalDrawer({ 
  open, 
  onOpenChange, 
  goalType, 
  currentGoal,
  currentValue
}: UpdateGoalDrawerProps) {
  const [goalValue, setGoalValue] = useState(currentGoal)

  const handleUpdateGoal = () => {
    // Here you would typically save this value to your backend
    toast.success(`${goalType.charAt(0).toUpperCase() + goalType.slice(1)} goal updated successfully!`, {
      duration: 3000,
    })
    onOpenChange(false)
  }

  const getGoalIcon = () => {
    switch (goalType) {
      case "steps":
        return <IconWalk className="size-4 text-muted-foreground" />
      case "calories":
        return <IconFlame className="size-4 text-muted-foreground" />
      case "water":
        return <IconDroplet className="size-4 text-muted-foreground" />
      default:
        return null
    }
  }

  const getGoalLabel = () => {
    switch (goalType) {
      case "steps":
        return "Daily Steps"
      case "calories":
        return "Daily Calories"
      case "water":
        return "Water Intake (L)"
      default:
        return ""
    }
  }

  const getGoalPlaceholder = () => {
    switch (goalType) {
      case "steps":
        return "Enter target steps"
      case "calories":
        return "Enter target calories"
      case "water":
        return "Enter target liters"
      default:
        return ""
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Update {getGoalLabel()}</DrawerTitle>
          <DrawerDescription>
            Set your target for {goalType}. Current value: {currentValue}
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-4 py-4 px-4">
          <div className="grid gap-2">
            <Label htmlFor="goal-value">{getGoalLabel()}</Label>
            <div className="flex items-center gap-2">
              {getGoalIcon()}
              <Input
                id="goal-value"
                type="number"
                value={goalValue}
                onChange={(e) => setGoalValue(e.target.value)}
                placeholder={getGoalPlaceholder()}
              />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleUpdateGoal}>Update Goal</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
} 