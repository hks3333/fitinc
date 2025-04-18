"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

export default function SettingsPage() {
  // Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    age: 28,
    gender: "male",
    height: 175, // cm
    weight: 75, // kg
    targetWeight: 70, // kg
    activityLevel: "moderate",
    fitnessGoal: "weight-loss",
  })

  // Dietary Preferences
  const [dietaryPreferences, setDietaryPreferences] = useState({
    dietType: "balanced",
    restrictions: ["nuts", "shellfish"],
    allergies: ["peanuts"],
    mealPreferences: {
      breakfast: "light",
      lunch: "moderate",
      dinner: "light",
    },
    waterIntake: 2.5, // liters
    calorieTarget: 2000, // calories
  })

  // Workout Preferences
  const [workoutPreferences, setWorkoutPreferences] = useState({
    preferredWorkoutDays: ["monday", "wednesday", "friday"],
    workoutDuration: 45, // minutes
    workoutIntensity: "moderate",
    preferredWorkoutTypes: ["strength", "cardio"],
    equipmentAccess: ["dumbbells", "resistance-bands"],
    restDayPreferences: ["sunday"],
  })

  // Notification Settings
  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    mealReminders: true,
    progressUpdates: true,
    goalAchievements: true,
    reminderTime: "09:00",
  })

  const handlePersonalInfoChange = (field: string, value: string | number) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleDietaryPreferencesChange = (field: string, value: any) => {
    setDietaryPreferences(prev => ({ ...prev, [field]: value }))
  }

  const handleWorkoutPreferencesChange = (field: string, value: any) => {
    setWorkoutPreferences(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: any) => {
    setNotifications(prev => ({ ...prev, [field]: value }))
  }

  const handleUpdateSettings = () => {
    // Here you would typically send the data to your backend
    toast.success("Settings updated successfully!")
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="dietary">Dietary</TabsTrigger>
          <TabsTrigger value="workout">Workout</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and physical attributes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={personalInfo.name}
                    onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={personalInfo.age}
                    onChange={(e) => handlePersonalInfoChange("age", parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={personalInfo.gender}
                    onValueChange={(value) => handlePersonalInfoChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={personalInfo.height}
                    onChange={(e) => handlePersonalInfoChange("height", parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Current Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={personalInfo.weight}
                    onChange={(e) => handlePersonalInfoChange("weight", parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetWeight">Target Weight (kg)</Label>
                  <Input
                    id="targetWeight"
                    type="number"
                    value={personalInfo.targetWeight}
                    onChange={(e) => handlePersonalInfoChange("targetWeight", parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Activity Level</Label>
                  <Select
                    value={personalInfo.activityLevel}
                    onValueChange={(value) => handlePersonalInfoChange("activityLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Lightly Active</SelectItem>
                      <SelectItem value="moderate">Moderately Active</SelectItem>
                      <SelectItem value="very">Very Active</SelectItem>
                      <SelectItem value="extra">Extra Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fitnessGoal">Fitness Goal</Label>
                  <Select
                    value={personalInfo.fitnessGoal}
                    onValueChange={(value) => handlePersonalInfoChange("fitnessGoal", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select fitness goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight-loss">Weight Loss</SelectItem>
                      <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="endurance">Endurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dietary Preferences Tab */}
        <TabsContent value="dietary">
          <Card>
            <CardHeader>
              <CardTitle>Dietary Preferences</CardTitle>
              <CardDescription>Set your dietary restrictions and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dietType">Diet Type</Label>
                  <Select
                    value={dietaryPreferences.dietType}
                    onValueChange={(value) => handleDietaryPreferencesChange("dietType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select diet type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="keto">Keto</SelectItem>
                      <SelectItem value="paleo">Paleo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calorieTarget">Daily Calorie Target</Label>
                  <Input
                    id="calorieTarget"
                    type="number"
                    value={dietaryPreferences.calorieTarget}
                    onChange={(e) => handleDietaryPreferencesChange("calorieTarget", parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waterIntake">Daily Water Intake (L)</Label>
                  <Input
                    id="waterIntake"
                    type="number"
                    step="0.1"
                    value={dietaryPreferences.waterIntake}
                    onChange={(e) => handleDietaryPreferencesChange("waterIntake", parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Dietary Restrictions</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["nuts", "shellfish", "dairy", "gluten", "soy", "eggs"].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={item}
                          checked={dietaryPreferences.restrictions.includes(item)}
                          onCheckedChange={(checked) => {
                            const newRestrictions = checked
                              ? [...dietaryPreferences.restrictions, item]
                              : dietaryPreferences.restrictions.filter((r) => r !== item)
                            handleDietaryPreferencesChange("restrictions", newRestrictions)
                          }}
                        />
                        <Label htmlFor={item} className="capitalize">{item}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Allergies</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["peanuts", "tree-nuts", "shellfish", "fish", "milk", "eggs"].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={`allergy-${item}`}
                          checked={dietaryPreferences.allergies.includes(item)}
                          onCheckedChange={(checked) => {
                            const newAllergies = checked
                              ? [...dietaryPreferences.allergies, item]
                              : dietaryPreferences.allergies.filter((a) => a !== item)
                            handleDietaryPreferencesChange("allergies", newAllergies)
                          }}
                        />
                        <Label htmlFor={`allergy-${item}`} className="capitalize">{item.replace("-", " ")}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workout Preferences Tab */}
        <TabsContent value="workout">
          <Card>
            <CardHeader>
              <CardTitle>Workout Preferences</CardTitle>
              <CardDescription>Customize your workout routine and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workoutDuration">Preferred Workout Duration (minutes)</Label>
                  <Input
                    id="workoutDuration"
                    type="number"
                    value={workoutPreferences.workoutDuration}
                    onChange={(e) => handleWorkoutPreferencesChange("workoutDuration", parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workoutIntensity">Workout Intensity</Label>
                  <Select
                    value={workoutPreferences.workoutIntensity}
                    onValueChange={(value) => handleWorkoutPreferencesChange("workoutIntensity", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select intensity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="intense">Intense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Preferred Workout Days</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {["monday", "wednesday", "friday", "sunday"].map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={day}
                          checked={workoutPreferences.preferredWorkoutDays.includes(day)}
                          onCheckedChange={(checked) => {
                            const newDays = checked
                              ? [...workoutPreferences.preferredWorkoutDays, day]
                              : workoutPreferences.preferredWorkoutDays.filter((d) => d !== day)
                            handleWorkoutPreferencesChange("preferredWorkoutDays", newDays)
                          }}
                        />
                        <Label htmlFor={day} className="capitalize">{day}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Preferred Workout Types</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["strength", "cardio", "flexibility", "hiit", "yoga", "pilates"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={workoutPreferences.preferredWorkoutTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            const newTypes = checked
                              ? [...workoutPreferences.preferredWorkoutTypes, type]
                              : workoutPreferences.preferredWorkoutTypes.filter((t) => t !== type)
                            handleWorkoutPreferencesChange("preferredWorkoutTypes", newTypes)
                          }}
                        />
                        <Label htmlFor={`type-${type}`} className="capitalize">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Available Equipment</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["dumbbells", "resistance-bands", "yoga-mat", "pull-up-bar", "bench", "kettlebell"].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={`equipment-${item}`}
                          checked={workoutPreferences.equipmentAccess.includes(item)}
                          onCheckedChange={(checked) => {
                            const newEquipment = checked
                              ? [...workoutPreferences.equipmentAccess, item]
                              : workoutPreferences.equipmentAccess.filter((e) => e !== item)
                            handleWorkoutPreferencesChange("equipmentAccess", newEquipment)
                          }}
                        />
                        <Label htmlFor={`equipment-${item}`} className="capitalize">{item.replace("-", " ")}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Workout Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders for scheduled workouts
                    </p>
                  </div>
                  <Switch
                    checked={notifications.workoutReminders}
                    onCheckedChange={(checked) => handleNotificationChange("workoutReminders", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Meal Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders for meal planning
                    </p>
                  </div>
                  <Switch
                    checked={notifications.mealReminders}
                    onCheckedChange={(checked) => handleNotificationChange("mealReminders", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Progress Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly progress reports
                    </p>
                  </div>
                  <Switch
                    checked={notifications.progressUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("progressUpdates", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Goal Achievements</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when you achieve your goals
                    </p>
                  </div>
                  <Switch
                    checked={notifications.goalAchievements}
                    onCheckedChange={(checked) => handleNotificationChange("goalAchievements", checked)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reminderTime">Daily Reminder Time</Label>
                  <Input
                    id="reminderTime"
                    type="time"
                    value={notifications.reminderTime}
                    onChange={(e) => handleNotificationChange("reminderTime", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleUpdateSettings}>Update Settings</Button>
      </div>
    </div>
  )
} 