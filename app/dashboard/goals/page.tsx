"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconTarget } from "@tabler/icons-react"
import { UpdateGoalDrawer } from "@/components/update-goal-drawer"

export default function GoalsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeGoal, setActiveGoal] = useState<{
    type: "steps" | "calories" | "water"
    goal: string
    current: string
  } | null>(null)

  const handleUpdateGoal = (type: "steps" | "calories" | "water", goal: string, current: string) => {
    setActiveGoal({ type, goal, current })
    setDrawerOpen(true)
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold mb-6">Daily Goals</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconTarget className="h-5 w-5 text-primary" />
                <CardTitle>Steps</CardTitle>
              </div>
              <CardDescription>Daily step count goal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">10,000</div>
              <div className="text-sm text-muted-foreground mt-1">Current: 6,543</div>
              <Button 
                className="mt-4 w-full"
                onClick={() => handleUpdateGoal("steps", "10000", "6,543")}
              >
                Update Goal
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconTarget className="h-5 w-5 text-primary" />
                <CardTitle>Calories</CardTitle>
              </div>
              <CardDescription>Daily calorie burn goal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">500</div>
              <div className="text-sm text-muted-foreground mt-1">Current: 320</div>
              <Button 
                className="mt-4 w-full"
                onClick={() => handleUpdateGoal("calories", "500", "320")}
              >
                Update Goal
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconTarget className="h-5 w-5 text-primary" />
                <CardTitle>Water</CardTitle>
              </div>
              <CardDescription>Daily water intake goal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2.5L</div>
              <div className="text-sm text-muted-foreground mt-1">Current: 1.2L</div>
              <Button 
                className="mt-4 w-full"
                onClick={() => handleUpdateGoal("water", "2.5", "1.2L")}
              >
                Update Goal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {activeGoal && (
        <UpdateGoalDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          goalType={activeGoal.type}
          currentGoal={activeGoal.goal}
          currentValue={activeGoal.current}
        />
      )}
    </div>
  )
} 