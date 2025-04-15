"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { IconMinus, IconPlus, type Icon as TablerIcon } from "@tabler/icons-react"

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
import { Goal } from "./goal-card" // Import the Goal type

interface UpdateGoalDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  goal: Goal | null // Accept the full goal object
  onUpdate: (updatedGoalData: Partial<Goal> & { id: string }) => void // Callback for saving
}

export function UpdateGoalDrawer({
  open,
  onOpenChange,
  goal,
  onUpdate
}: UpdateGoalDrawerProps) {
  // State to hold the target value being edited
  const [targetValueInput, setTargetValueInput] = useState<string>("")
  // State for dynamic step/min/max based on goal type
  const [stepSize, setStepSize] = useState(1)
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(100000) // A high default max

  // Effect to update local state when the goal prop changes (e.g., drawer opens with a new goal)
  useEffect(() => {
    if (open && goal) {
      setTargetValueInput(goal.targetValue.toString())

      // Configure step/min/max based on goal type
      switch (goal.type) {
        case "steps":
          setStepSize(500)
          setMinValue(1000)
          setMaxValue(50000)
          break
        case "calories":
          setStepSize(50)
          setMinValue(100) // Lowered min calories slightly
          setMaxValue(10000)
          break
        case "water":
          setStepSize(0.25) // Finer control for water
          setMinValue(0.5)
          setMaxValue(10)
          break
        case "weight":
          setStepSize(0.5)
          setMinValue(30) // Example min weight
          setMaxValue(250) // Example max weight
           break
        case "distance":
          setStepSize(0.5)
          setMinValue(0.5)
          setMaxValue(1000) // e.g., max km
          break
        case "frequency": // Example: workouts per week
          setStepSize(1);
          setMinValue(1);
          setMaxValue(7);
          break;
        default:
          // Default sensible values if type is unknown
          setStepSize(1)
          setMinValue(0)
          setMaxValue(100000)
          break
      }
    } else if (!open) {
      // Optionally reset when closed, though useEffect above handles reopening
      // setTargetValueInput("");
    }
  }, [open, goal]) // Rerun when open state or goal object changes

  const handleUpdateGoal = () => {
    if (!goal) return; // Should not happen if drawer is open with a goal

    const newTargetValue = parseFloat(targetValueInput);

    if (isNaN(newTargetValue) || newTargetValue < minValue || newTargetValue > maxValue) {
       toast.error(`Invalid target value. Must be between ${minValue} and ${maxValue}.`, {
          duration: 4000,
       });
       return;
    }

    // Call the onUpdate callback passed from GoalsPage
    onUpdate({
      id: goal.id,
      targetValue: newTargetValue,
      // Only pass back the fields that were actually changed.
      // If we added inputs for title/description, they would be included here.
    });

    // Toast notification can remain here or be moved to the parent component
    // after the update is confirmed (e.g., after API call)
    toast.success(`${goal.title} goal updated successfully!`, {
      duration: 3000,
    })

    onOpenChange(false) // Close the drawer
  }

  // --- Input Handlers ---
  const handleIncrement = () => {
    const numValue = parseFloat(targetValueInput)
    if (!isNaN(numValue)) {
      const newValue = Math.min(maxValue, numValue + stepSize)
      // Format to avoid excessive decimals for types like 'water' or 'weight'
      setTargetValueInput(newValue.toFixed(goal?.type === 'water' || goal?.type === 'weight' || goal?.type === 'distance' ? 2 : 0))
    }
  }

  const handleDecrement = () => {
    const numValue = parseFloat(targetValueInput)
    if (!isNaN(numValue)) {
      const newValue = Math.max(minValue, numValue - stepSize)
      setTargetValueInput(newValue.toFixed(goal?.type === 'water' || goal?.type === 'weight' || goal?.type === 'distance' ? 2 : 0))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     // Allow setting the value directly, validation happens on save
     setTargetValueInput(e.target.value);
  }


  // --- Display Logic ---
  const getProgressPercentage = () => {
    if (!goal) return 0;
    const current = goal.currentValue; // Already a number
    const target = parseFloat(targetValueInput); // Use the edited target for preview

    if (isNaN(current) || isNaN(target) || target === 0) {
      return 0
    }

    return Math.min(100, Math.round((current / target) * 100))
  }

  // Render nothing if the drawer is open but no goal is provided
  if (!goal) {
     // This can happen briefly if the parent state updates slightly out of sync
     // or if opened incorrectly. Returning null prevents errors.
     return null;
  }

  const progressPercentage = getProgressPercentage()
  const GoalIcon: TablerIcon | null = goal.Icon || null; // Get icon component from goal object

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md flex flex-col items-center">
          <DrawerHeader className="items-center text-2xl">
            {/* Use goal title */}
            <DrawerTitle>Update {goal.title}</DrawerTitle>
            <DrawerDescription>
              {/* Use goal description and current value */}
              {goal.description || `Set your target for ${goal.title}.`}
              <br />
              Current progress: {goal.currentValue} {goal.unit}
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="mb-2">
                {/* Render icon from goal object */}
                {GoalIcon && <GoalIcon className="size-12 text-primary" />}
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">
                  {/* Show progress based on the potentially updated target */}
                  {progressPercentage}% Complete
                </div>
                <div className="text-xs text-muted-foreground">
                  {/* Show current vs potentially updated target */}
                  {goal.currentValue} of {targetValueInput || goal.targetValue} {goal.unit}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              {/* Use goal title and unit in label */}
              <Label htmlFor="goal-value" className="text-center">Set your {goal.title} target ({goal.unit})</Label>

              <div className="flex items-center justify-center space-x-2 w-full">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-full cursor-pointer"
                  onClick={handleDecrement}
                  disabled={parseFloat(targetValueInput) <= minValue}
                >
                  <IconMinus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>

                <div className="relative flex-1 max-w-[200px]">
                  <Input
                    id="goal-value"
                    type="number" // Keep type="number" for native controls on mobile
                    value={targetValueInput}
                    onChange={handleInputChange} // Use direct input handler
                    min={minValue}
                    max={maxValue}
                    step={stepSize}
                    className="text-center text-2xl font-bold h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" // Hide number spinners for cleaner look
                    // Consider adding pattern="[0-9]*" or specific patterns if needed
                  />
                  <div className="absolute -bottom-5 left-0 right-0 text-center text-xs text-muted-foreground">
                    {goal.unit}/day (or relevant period)
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-full cursor-pointer"
                  onClick={handleIncrement}
                  disabled={parseFloat(targetValueInput) >= maxValue}
                >
                  <IconPlus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center mt-4 pt-1"> {/* Added pt-1 for spacing */}
                 Adjust target value (Min: {minValue}, Max: {maxValue}, Step: {stepSize} {goal.unit})
              </div>
            </div>
          </div>

          <DrawerFooter className="w-full">
            <Button onClick={handleUpdateGoal} className="cursor-pointer">Update Target</Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer">Cancel</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}