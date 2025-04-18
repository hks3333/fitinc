"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Goal } from "./goal-card" // Assuming Goal interface is exported here
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IconShoe, IconFlame, IconGlassFull, IconWeight, IconRoute } from "@tabler/icons-react" // Add necessary icons

// Define Goal Type options for the form
const goalTypeOptions = [
  { value: 'steps', label: 'Steps', unit: 'steps', Icon: IconShoe },
  { value: 'calories', label: 'Calories Burned', unit: 'kcal', Icon: IconFlame },
  { value: 'water', label: 'Water Intake', unit: 'L', Icon: IconGlassFull },
  { value: 'weight', label: 'Weight Target', unit: 'kg', Icon: IconWeight },
  { value: 'distance', label: 'Distance', unit: 'km', Icon: IconRoute },
  // Add more...
];

interface AddGoalSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGoal: (newGoal: Omit<Goal, 'id' | 'currentValue' | 'status'> & { type: Goal['type'] }) => void; // Define structure for adding
}

export function AddGoalSheet({ open, onOpenChange, onAddGoal }: AddGoalSheetProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<Goal['type']>('steps');
  const [targetValue, setTargetValue] = useState<number | string>("")

  const selectedTypeData = goalTypeOptions.find(opt => opt.value === type);

  const handleSubmit = () => {
    if (title && typeof targetValue === 'number' && targetValue > 0 && selectedTypeData) {
      onAddGoal({
        title,
        description,
        type: selectedTypeData.value as Goal['type'],
        targetValue: targetValue,
        unit: selectedTypeData.unit,
        Icon: selectedTypeData.Icon,
        // id, currentValue, status will be set by the parent component/backend
      })
      // Reset form & close sheet
      setTitle("");
      setDescription("");
      setType('steps');
      setTargetValue("");
      onOpenChange(false);
    } else {
      // Add some basic validation feedback if needed
      console.error("Invalid form data");
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Fitness Goal</SheetTitle>
          <SheetDescription>
            Define a new goal to track your progress. Fill in the details below.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 px-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select value={type} onValueChange={(value) => setType(value as Goal['type'])}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select goal type" />
              </SelectTrigger>
              <SelectContent>
                {goalTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <option.Icon className="h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Daily Steps Challenge"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="(Optional) Walk more during breaks"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="target" className="text-right">
              Target
            </Label>
            <Input
              id="target"
              type="number"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value ? Number(e.target.value) : "")}
              className="col-span-3"
              placeholder={`Enter target ${selectedTypeData?.unit || 'value'}`}
              min="0" // Basic validation
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </SheetClose>
          <Button type="button" onClick={handleSubmit}>Save Goal</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}