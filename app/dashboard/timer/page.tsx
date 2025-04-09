import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconClock, IconPlayerPlay, IconPlayerPause, IconPlayerStop } from "@tabler/icons-react"

export default function TimerPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold mb-6">Workout Timer</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconClock className="h-5 w-5 text-primary" />
                <CardTitle>Timer</CardTitle>
              </div>
              <CardDescription>Track your workout duration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="text-6xl font-bold mb-8">00:00:00</div>
                <div className="flex gap-4">
                  <Button size="lg" className="gap-2">
                    <IconPlayerPlay className="h-5 w-5" />
                    Start
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <IconPlayerPause className="h-5 w-5" />
                    Pause
                  </Button>
                  <Button size="lg" variant="destructive" className="gap-2">
                    <IconPlayerStop className="h-5 w-5" />
                    Stop
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>Common workout durations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">5 min</Button>
                <Button variant="outline">10 min</Button>
                <Button variant="outline">15 min</Button>
                <Button variant="outline">20 min</Button>
                <Button variant="outline">30 min</Button>
                <Button variant="outline">45 min</Button>
                <Button variant="outline">60 min</Button>
                <Button variant="outline">Custom</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Workouts</CardTitle>
              <CardDescription>Your last 5 workout sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 rounded-md bg-muted">
                  <span>Morning Run</span>
                  <span className="font-medium">32:15</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-md bg-muted">
                  <span>HIIT Workout</span>
                  <span className="font-medium">45:00</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-md bg-muted">
                  <span>Yoga Session</span>
                  <span className="font-medium">20:30</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-md bg-muted">
                  <span>Weight Training</span>
                  <span className="font-medium">60:00</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-md bg-muted">
                  <span>Evening Walk</span>
                  <span className="font-medium">25:45</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 