"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  IconStretching2,
  IconSearch,
  IconFilter,
  IconPlus,
  IconFlame,
  IconClock,
  IconRun,
  IconBike,
  IconSwimming,
  IconYoga,
  IconBarbell,
  IconChartLine
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { AddExerciseSheet } from "@/components/add-exercise-sheet";

// Mock data for exercise history
const mockExerciseHistory = [
  { date: 'Mon', duration: 20, calories: 150 },
  { date: 'Tue', duration: 30, calories: 220 },
  { date: 'Wed', duration: 25, calories: 180 },
  { date: 'Thu', duration: 40, calories: 300 },
  { date: 'Fri', duration: 15, calories: 100 },
  { date: 'Sat', duration: 50, calories: 400 },
  { date: 'Sun', duration: 35, calories: 250 },
];

// Exercise type definition
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

// Mock exercises data
const mockExercises: Exercise[] = [
  {
    id: "1",
    name: "Push-ups",
    category: "Strength",
    description: "Upper body strength exercise",
    sets: 3,
    reps: 12,
    calories: 100,
    difficulty: "Medium",
    icon: IconBarbell
  },
  {
    id: "2",
    name: "Squats",
    category: "Strength",
    description: "Lower body strength exercise",
    sets: 4,
    reps: 15,
    calories: 120,
    difficulty: "Medium",
    icon: IconBarbell
  },
  {
    id: "3",
    name: "Plank",
    category: "Core",
    description: "Core strengthening exercise",
    duration: "60 sec",
    calories: 80,
    difficulty: "Hard",
    icon: IconYoga
  },
  {
    id: "4",
    name: "Running",
    category: "Cardio",
    description: "Outdoor running",
    duration: "30 min",
    calories: 300,
    difficulty: "Medium",
    icon: IconRun
  },
  {
    id: "5",
    name: "Cycling",
    category: "Cardio",
    description: "Stationary bike cycling",
    duration: "45 min",
    calories: 400,
    difficulty: "Medium",
    icon: IconBike
  },
  // {
  //   id: "6",
  //   name: "Swimming",
  //   category: "Cardio",
  //   description: "Freestyle swimming",
  //   duration: "30 min",
  //   calories: 350,
  //   difficulty: "Hard",
  //   icon: IconSwimming
  // },
  // {
  //   id: "7",
  //   name: "Jump Rope",
  //   category: "Cardio",
  //   description: "Fast jump rope intervals",
  //   duration: "15 min",
  //   calories: 200,
  //   difficulty: "Medium",
  //   icon: IconRun
  // },
  // {
  //   id: "8",
  //   name: "Burpees",
  //   category: "Full Body",
  //   description: "Full body explosive exercise",
  //   sets: 3,
  //   reps: 10,
  //   calories: 150,
  //   difficulty: "Hard",
  //   icon: IconStretching2
  // },
  // {
  //   id: "9",
  //   name: "Yoga",
  //   category: "Flexibility",
  //   description: "Vinyasa flow sequence",
  //   duration: "60 min",
  //   calories: 180,
  //   difficulty: "Easy",
  //   icon: IconYoga
  // },
];

export default function ExercisesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [addSheetOpen, setAddSheetOpen] = useState(false);

  const filteredExercises = mockExercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExercise = (newExercise: Omit<Exercise, 'id'>) => {
    // In a real app, you would add this to your state or API
    console.log("Adding new exercise:", newExercise);
    setAddSheetOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 py-4 md:gap-8 md:py-6">
      {/* Header and Add Button */}
      <div className="px-4 lg:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Exercises</h1>
        <Button onClick={() => setAddSheetOpen(true)}>
          <IconPlus className="h-4 w-4 mr-2" />
          Add New Exercise
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="px-4 lg:px-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search exercises..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <IconFilter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Exercises Grid */}
      <div className="px-4 lg:px-6">
        {filteredExercises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <exercise.icon className="h-5 w-5 text-primary" />
                    <CardTitle>{exercise.name}</CardTitle>
                  </div>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Category:</span>
                      <span className="font-medium">{exercise.category}</span>
                    </div>
                    
                    {exercise.sets && exercise.reps && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Sets:</span>
                          <span className="font-medium">{exercise.sets}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Reps:</span>
                          <span className="font-medium">{exercise.reps}</span>
                        </div>
                      </>
                    )}
                    
                    {exercise.duration && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Duration:</span>
                          <span className="font-medium">{exercise.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Type:</span>
                          <span className="font-medium">Static</span>
                        </div>
                      </>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Calories:</span>
                      <span className="font-medium flex items-center gap-1">
                        <IconFlame className="h-4 w-4 text-destructive" />
                        {exercise.calories} kcal
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Difficulty:</span>
                      <span className="font-medium">
                        {exercise.difficulty === 'Easy' && (
                          <span className="text-green-500">{exercise.difficulty}</span>
                        )}
                        {exercise.difficulty === 'Medium' && (
                          <span className="text-yellow-500">{exercise.difficulty}</span>
                        )}
                        {exercise.difficulty === 'Hard' && (
                          <span className="text-red-500">{exercise.difficulty}</span>
                        )}
                      </span>
                    </div>
                    
                    <Button className="w-full mt-4">Start Exercise</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8 border border-dashed rounded-lg">
            No exercises found matching your search.
          </div>
        )}
      </div>

      {/* Exercise Activity Chart */}
      <div className="px-4 lg:px-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Weekly Exercise Activity</h2>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <IconChartLine className="h-5 w-5 text-primary" />
              <CardTitle>Exercise Duration & Calories</CardTitle>
            </div>
            <CardDescription>Your exercise activity over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockExerciseHistory} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    tickLine={false} 
                    axisLine={false} 
                    tickMargin={10} 
                    fontSize={12} 
                    stroke="var(--muted-foreground)" 
                  />
                  <YAxis 
                    yAxisId="left" 
                    orientation="left" 
                    tickLine={false} 
                    axisLine={false} 
                    tickMargin={10} 
                    fontSize={12} 
                    stroke="var(--muted-foreground)" 
                    label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    tickLine={false} 
                    axisLine={false} 
                    tickMargin={10} 
                    fontSize={12} 
                    stroke="var(--muted-foreground)" 
                    label={{ value: 'Calories', angle: 90, position: 'insideRight' }}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background p-4 border rounded-lg shadow-sm">
                            <p className="font-medium">{payload[0].payload.date}</p>
                            <p className="text-sm flex items-center gap-2">
                              <IconClock className="h-4 w-4 text-blue-500" />
                              Duration: {payload[0].payload.duration} min
                            </p>
                            <p className="text-sm flex items-center gap-2">
                              <IconFlame className="h-4 w-4 text-red-500" />
                              Calories: {payload[0].payload.calories} kcal
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    yAxisId="left" 
                    dataKey="duration" 
                    stroke="var(--primary)" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                    name="Duration (min)"
                  />
                  <Line 
                    yAxisId="right" 
                    dataKey="calories" 
                    stroke="var(--destructive)" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                    name="Calories (kcal)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Exercise Sheet */}
      <AddExerciseSheet
        open={addSheetOpen}
        onOpenChange={setAddSheetOpen}
        onAddExercise={handleAddExercise}
      />
    </div>
  );
}