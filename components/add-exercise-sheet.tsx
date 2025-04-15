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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  IconRun,
  IconBike,
  IconSwimming,
  IconYoga,
  IconBarbell,
  IconStretching2,
  IconClock,
  IconFlame
} from "@tabler/icons-react"
import { Textarea } from "@/components/ui/textarea"

// Exercise type options
const exerciseTypeOptions = [
  { value: "strength", label: "Strength Training", Icon: IconBarbell },
  { value: "cardio", label: "Cardio", Icon: IconRun },
  { value: "flexibility", label: "Flexibility", Icon: IconYoga },
  { value: "balance", label: "Balance", Icon: IconStretching2 },
  { value: "sports", label: "Sports", Icon: IconSwimming },
]

// Difficulty options
const difficultyOptions = [
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" },
]

interface AddExerciseSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddExercise: (newExercise: Omit<Exercise, 'id'>) => void;
}

type Exercise = {
    id: string;
    name: string;
    category: string;
    description: string;
    sets?: number;
    reps?: number;
    duration?: string;
    calories: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    icon: React.ComponentType<{ className?: string }>;
  };

export function AddExerciseSheet({ open, onOpenChange, onAddExercise }: AddExerciseSheetProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("strength")
  const [description, setDescription] = useState("")
  const [sets, setSets] = useState<string>("3")
  const [reps, setReps] = useState<string>("10")
  const [duration, setDuration] = useState("")
  const [calories, setCalories] = useState<string>("")
  const [difficulty, setDifficulty] = useState("Medium")
  const [exerciseType, setExerciseType] = useState<"reps" | "duration">("reps")

  const selectedCategoryData = exerciseTypeOptions.find(opt => opt.value === category)

  const handleSubmit = () => {
    if (!name || (!duration && exerciseType === "duration") || (!sets && exerciseType === "reps")) {
      // Basic validation - in a real app you'd want more robust validation
      return
    }

    const newExercise: Omit<Exercise, 'id'> = {
      name,
      category,
      description,
      difficulty: difficulty as "Easy" | "Medium" | "Hard",
      calories: calories ? parseInt(calories) : 0,
      icon: selectedCategoryData?.Icon || IconStretching2,
      ...(exerciseType === "reps" ? {
        sets: parseInt(sets),
        reps: parseInt(reps)
      } : {
        duration
      })
    }

    onAddExercise(newExercise)
    resetForm()
    onOpenChange(false)
  }

  const resetForm = () => {
    setName("")
    setCategory("strength")
    setDescription("")
    setSets("3")
    setReps("10")
    setDuration("")
    setCalories("")
    setDifficulty("Medium")
    setExerciseType("reps")
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Add New Exercise</SheetTitle>
          <SheetDescription>
            Fill in the details to create a new exercise routine.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 px-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">BASIC INFORMATION</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Exercise Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Push-ups"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the exercise..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {exerciseTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.Icon className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Exercise Type */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">EXERCISE TYPE</h3>
            <div className="flex gap-2">
              <Button
                variant={exerciseType === "reps" ? "default" : "outline"}
                onClick={() => setExerciseType("reps")}
                className="flex-1"
              >
                Sets & Reps
              </Button>
              <Button
                variant={exerciseType === "duration" ? "default" : "outline"}
                onClick={() => setExerciseType("duration")}
                className="flex-1"
              >
                Duration
              </Button>
            </div>

            {exerciseType === "reps" ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sets</Label>
                  <Input
                    type="number"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    placeholder="3"
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Reps</Label>
                  <Input
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    placeholder="10"
                    min="1"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Duration</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 30 min or 2 rounds"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Calories */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">CALORIES</h3>
            <div className="space-y-2">
              <Label>Estimated Calories Burned</Label>
              <div className="relative">
                <IconFlame className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-destructive" />
                <Input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="Estimated calories burned"
                  className="pl-10"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-8">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button onClick={handleSubmit}>Save Exercise</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}