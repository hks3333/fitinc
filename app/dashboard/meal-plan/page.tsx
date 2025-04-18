import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconMeat, IconPlus, IconSearch } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MealPlanPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold mb-6">Meal Plan</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search meals..." className="pl-10" />
          </div>
          <Button className="gap-2">
            <IconPlus className="h-4 w-4" />
            Add Meal
          </Button>
        </div>
        
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <IconMeat className="h-5 w-5 text-primary" />
                    <CardTitle>Breakfast</CardTitle>
                  </div>
                  <CardDescription>8:00 AM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Oatmeal with Berries</span>
                      <span className="text-sm text-muted-foreground">320 cal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Greek Yogurt</span>
                      <span className="text-sm text-muted-foreground">150 cal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Green Tea</span>
                      <span className="text-sm text-muted-foreground">0 cal</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>470 cal</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-2">Edit Meal</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <IconMeat className="h-5 w-5 text-primary" />
                    <CardTitle>Lunch</CardTitle>
                  </div>
                  <CardDescription>12:30 PM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Grilled Chicken Salad</span>
                      <span className="text-sm text-muted-foreground">350 cal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Apple</span>
                      <span className="text-sm text-muted-foreground">95 cal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Water</span>
                      <span className="text-sm text-muted-foreground">0 cal</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>445 cal</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-2">Edit Meal</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <IconMeat className="h-5 w-5 text-primary" />
                    <CardTitle>Dinner</CardTitle>
                  </div>
                  <CardDescription>7:00 PM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Salmon with Vegetables</span>
                      <span className="text-sm text-muted-foreground">420 cal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Brown Rice</span>
                      <span className="text-sm text-muted-foreground">215 cal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Water</span>
                      <span className="text-sm text-muted-foreground">0 cal</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>635 cal</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-2">Edit Meal</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Daily Summary</CardTitle>
                </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm text-muted-foreground">Calories</span>
                    <span className="text-2xl font-bold">1,550</span>
                    <span className="text-xs text-muted-foreground">of 2,000 goal</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm text-muted-foreground">Protein</span>
                    <span className="text-2xl font-bold">85g</span>
                    <span className="text-xs text-muted-foreground">of 120g goal</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm text-muted-foreground">Carbs</span>
                    <span className="text-2xl font-bold">180g</span>
                    <span className="text-xs text-muted-foreground">of 250g goal</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm text-muted-foreground">Fat</span>
                    <span className="text-2xl font-bold">45g</span>
                    <span className="text-xs text-muted-foreground">of 65g goal</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tomorrow" className="mt-4">
            <div className="text-center py-8 text-muted-foreground">
              No meals planned for tomorrow yet. Click "Add Meal" to get started.
            </div>
          </TabsContent>
          
          <TabsContent value="week" className="mt-4">
            <div className="text-center py-8 text-muted-foreground">
              Weekly meal plan view coming soon.
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="mt-4">
            <div className="text-center py-8 text-muted-foreground">
              Custom meal planning coming soon.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 