"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconPlayerPlay, IconPlayerPause, IconPlayerStop, IconRotate, IconClock } from "@tabler/icons-react"
import { toast } from "sonner"

export default function TimerPage() {
  const [timerMinutes, setTimerMinutes] = useState(20)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [stopwatchTime, setStopwatchTime] = useState(0)
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false)

  // Timer logic
  useEffect(() => {
    let timerInterval: NodeJS.Timeout

    if (isTimerRunning && (timerMinutes > 0 || timerSeconds > 0)) {
      timerInterval = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinutes === 0) {
            clearInterval(timerInterval)
            setIsTimerRunning(false)
            toast.success("Timer completed!")
          } else {
            setTimerMinutes(prev => prev - 1)
            setTimerSeconds(59)
          }
        } else {
          setTimerSeconds(prev => prev - 1)
        }
      }, 1000)
    }

    return () => clearInterval(timerInterval)
  }, [isTimerRunning, timerMinutes, timerSeconds])

  // Stopwatch logic
  useEffect(() => {
    let stopwatchInterval: NodeJS.Timeout

    if (isStopwatchRunning) {
      stopwatchInterval = setInterval(() => {
        setStopwatchTime(prev => prev + 1)
      }, 1000)
    }

    return () => clearInterval(stopwatchInterval)
  }, [isStopwatchRunning])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const handleQuickStart = (minutes: number) => {
    setTimerMinutes(minutes)
    setTimerSeconds(0)
    setIsTimerRunning(true)
    toast.success(`Timer set for ${minutes} minutes`)
  }

  const handleTimerControl = (action: 'start' | 'pause' | 'reset') => {
    switch (action) {
      case 'start':
        setIsTimerRunning(true)
        break
      case 'pause':
        setIsTimerRunning(false)
        break
      case 'reset':
        setTimerMinutes(20)
        setTimerSeconds(0)
        setIsTimerRunning(false)
        break
    }
  }

  const handleStopwatchControl = (action: 'start' | 'pause' | 'reset') => {
    switch (action) {
      case 'start':
        setIsStopwatchRunning(true)
        break
      case 'pause':
        setIsStopwatchRunning(false)
        break
      case 'reset':
        setStopwatchTime(0)
        setIsStopwatchRunning(false)
        break
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Timer Section */}
        <Card>
          <CardHeader>
            <CardTitle>Timer</CardTitle>
            <CardDescription>Countdown timer for your workouts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl font-bold">
                {formatTime(timerMinutes * 60 + timerSeconds)}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleTimerControl(isTimerRunning ? 'pause' : 'start')}
                >
                  {isTimerRunning ? (
                    <IconPlayerPause className="h-4 w-4" />
                  ) : (
                    <IconPlayerPlay className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleTimerControl('reset')}
                >
                  <IconRotate className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stopwatch Section */}
        <Card>
          <CardHeader>
            <CardTitle>Stopwatch</CardTitle>
            <CardDescription>Track your workout duration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl font-bold">
                {formatTime(stopwatchTime)}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleStopwatchControl(isStopwatchRunning ? 'pause' : 'start')}
                >
                  {isStopwatchRunning ? (
                    <IconPlayerPause className="h-4 w-4" />
                  ) : (
                    <IconPlayerPlay className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleStopwatchControl('reset')}
                >
                  <IconRotate className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start Section */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>Start a timer with preset durations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => handleQuickStart(5)}>
              5 min
            </Button>
            <Button variant="outline" onClick={() => handleQuickStart(10)}>
              10 min
            </Button>
            <Button variant="outline" onClick={() => handleQuickStart(15)}>
              15 min
            </Button>
            <Button variant="outline" onClick={() => handleQuickStart(20)}>
              20 min
            </Button>
            <Button variant="outline" onClick={() => handleQuickStart(30)}>
              30 min
            </Button>
            <Button variant="outline" onClick={() => handleQuickStart(45)}>
              45 min
            </Button>
            <Button variant="outline" onClick={() => handleQuickStart(60)}>
              60 min
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Workouts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Workouts</CardTitle>
          <CardDescription>Your recently completed workouts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconClock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">HIIT Workout</p>
                  <p className="text-sm text-muted-foreground">30 minutes</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Start Again
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconClock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Yoga Session</p>
                  <p className="text-sm text-muted-foreground">45 minutes</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Start Again
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 