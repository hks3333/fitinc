"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { IconDroplet, IconFlame, IconWalk, IconMinus, IconPlus } from "@tabler/icons-react"

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
  const [stepSize, setStepSize] = useState(100)
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(10000)

  // Update step size and limits based on goal type
  useEffect(() => {
    switch (goalType) {
      case "steps":
        setStepSize(500)
        setMinValue(1000)
        setMaxValue(50000)
        break
      case "calories":
        setStepSize(50)
        setMinValue(500)
        setMaxValue(5000)
        break
      case "water":
        setStepSize(0.5)
        setMinValue(1)
        setMaxValue(10)
        break
    }
  }, [goalType])

  // Reset goal value when drawer opens
  useEffect(() => {
    if (open) {
      setGoalValue(currentGoal)
    }
  }, [open, currentGoal])

  const handleUpdateGoal = () => {
    // Here you would typically save this value to your backend
    toast.success(`${goalType.charAt(0).toUpperCase() + goalType.slice(1)} goal updated successfully!`, {
      duration: 3000,
    })
    onOpenChange(false)
  }

  const handleIncrement = () => {
    const numValue = parseFloat(goalValue)
    if (!isNaN(numValue)) {
      const newValue = Math.min(maxValue, numValue + stepSize)
      setGoalValue(newValue.toString())
    }
  }

  const handleDecrement = () => {
    const numValue = parseFloat(goalValue)
    if (!isNaN(numValue)) {
      const newValue = Math.max(minValue, numValue - stepSize)
      setGoalValue(newValue.toString())
    }
  }

  const getGoalIcon = () => {
    switch (goalType) {
      case "steps":
        return <IconWalk className="size-12 text-primary" />
      case "calories":
        return <IconFlame className="size-12 text-primary" />
      case "water":
        return <IconDroplet className="size-12 text-primary" />
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

  const getGoalUnit = () => {
    switch (goalType) {
      case "steps":
        return "steps"
      case "calories":
        return "calories"
      case "water":
        return "L"
      default:
        return ""
    }
  }

  // Calculate progress percentage
  const getProgressPercentage = () => {
    const current = parseFloat(currentValue.replace(/[^0-9.]/g, ''))
    const goal = parseFloat(goalValue)
    
    if (isNaN(current) || isNaN(goal) || goal === 0) {
      return 0
    }
    
    return Math.min(100, Math.round((current / goal) * 100))
  }

  const progressPercentage = getProgressPercentage()

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Update {getGoalLabel()}</DrawerTitle>
            <DrawerDescription>
              Set your target for {goalType}. Current value: {currentValue}
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4 pb-0">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="mb-2">
                {getGoalIcon()}
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">
                  {progressPercentage}% Complete
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentValue} of {goalValue} {getGoalUnit()}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-4">
              <Label htmlFor="goal-value" className="text-center">Set your {getGoalLabel()} goal</Label>
              
              <div className="flex items-center justify-center space-x-2 w-full">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-full"
                  onClick={handleDecrement}
                  disabled={parseFloat(goalValue) <= minValue}
                >
                  <IconMinus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                
                <div className="relative flex-1 max-w-[200px]">
                  <Input
                    id="goal-value"
                    type="number"
                    value={goalValue}
                    onChange={(e) => setGoalValue(e.target.value)}
                    min={minValue}
                    max={maxValue}
                    step={stepSize}
                    className="text-center text-2xl font-bold h-12"
                  />
                  <div className="absolute -bottom-5 left-0 right-0 text-center text-xs text-muted-foreground">
                    {getGoalUnit()}/day
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-full"
                  onClick={handleIncrement}
                  disabled={parseFloat(goalValue) >= maxValue}
                >
                  <IconPlus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground text-center mt-4">
                Adjust by {stepSize} {getGoalUnit()} increments
              </div>
            </div>
          </div>
          
          <DrawerFooter>
            <Button onClick={handleUpdateGoal}>Update Goal</Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
} 