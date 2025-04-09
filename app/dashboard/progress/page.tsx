import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconChartBar, IconCalendar, IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProgressPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold mb-6">Progress Tracking</h1>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <IconArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+12%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,450</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <IconArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+8%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Weight</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">165 lbs</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <IconArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">-3 lbs</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Workout Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5 days</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <IconArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+2 days</span>
                    <span className="ml-1">from last week</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconChartBar className="h-5 w-5 text-primary" />
                    <CardTitle>Activity Overview</CardTitle>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <IconCalendar className="h-4 w-4" />
                    Last 30 Days
                  </Button>
                </div>
                <CardDescription>Your fitness activity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                  <p className="text-muted-foreground">Activity chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <IconChartBar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">5 Day Workout Streak</h4>
                        <p className="text-sm text-muted-foreground">You've worked out for 5 days in a row!</p>
                        <p className="text-xs text-muted-foreground mt-1">Achieved 2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <IconChartBar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Weight Goal Progress</h4>
                        <p className="text-sm text-muted-foreground">You're 75% of the way to your weight goal!</p>
                        <p className="text-xs text-muted-foreground mt-1">Achieved 5 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <IconChartBar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">New Personal Record</h4>
                        <p className="text-sm text-muted-foreground">You ran 5K in under 25 minutes!</p>
                        <p className="text-xs text-muted-foreground mt-1">Achieved 1 week ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Weight Goal</span>
                        <span className="text-sm text-muted-foreground">75%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">3 lbs to go</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Workout Goal</span>
                        <span className="text-sm text-muted-foreground">60%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">12 workouts to go</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Running Goal</span>
                        <span className="text-sm text-muted-foreground">40%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "40%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">15 miles to go</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="weight" className="mt-4">
            <div className="text-center py-8 text-muted-foreground">
              Weight tracking details coming soon.
            </div>
          </TabsContent>
          
          <TabsContent value="workouts" className="mt-4">
            <div className="text-center py-8 text-muted-foreground">
              Workout tracking details coming soon.
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition" className="mt-4">
            <div className="text-center py-8 text-muted-foreground">
              Nutrition tracking details coming soon.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 