import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconStretching2, IconSearch, IconFilter } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"

export default function ExercisesPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold mb-6">Exercises</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search exercises..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <IconFilter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconStretching2 className="h-5 w-5 text-primary" />
                <CardTitle>Push-ups</CardTitle>
              </div>
              <CardDescription>Upper body strength</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sets:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Reps:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Difficulty:</span>
                  <span className="font-medium">Medium</span>
                </div>
                <Button className="w-full mt-4">Start Exercise</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconStretching2 className="h-5 w-5 text-primary" />
                <CardTitle>Squats</CardTitle>
              </div>
              <CardDescription>Lower body strength</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sets:</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Reps:</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Difficulty:</span>
                  <span className="font-medium">Medium</span>
                </div>
                <Button className="w-full mt-4">Start Exercise</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconStretching2 className="h-5 w-5 text-primary" />
                <CardTitle>Plank</CardTitle>
              </div>
              <CardDescription>Core strength</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sets:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <span className="font-medium">60 sec</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Difficulty:</span>
                  <span className="font-medium">Hard</span>
                </div>
                <Button className="w-full mt-4">Start Exercise</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconStretching2 className="h-5 w-5 text-primary" />
                <CardTitle>Lunges</CardTitle>
              </div>
              <CardDescription>Leg strength and balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sets:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Reps:</span>
                  <span className="font-medium">10 each leg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Difficulty:</span>
                  <span className="font-medium">Medium</span>
                </div>
                <Button className="w-full mt-4">Start Exercise</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconStretching2 className="h-5 w-5 text-primary" />
                <CardTitle>Mountain Climbers</CardTitle>
              </div>
              <CardDescription>Full body cardio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sets:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <span className="font-medium">30 sec</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Difficulty:</span>
                  <span className="font-medium">Hard</span>
                </div>
                <Button className="w-full mt-4">Start Exercise</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconStretching2 className="h-5 w-5 text-primary" />
                <CardTitle>Jump Rope</CardTitle>
              </div>
              <CardDescription>Cardio and coordination</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sets:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <span className="font-medium">2 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Difficulty:</span>
                  <span className="font-medium">Medium</span>
                </div>
                <Button className="w-full mt-4">Start Exercise</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 