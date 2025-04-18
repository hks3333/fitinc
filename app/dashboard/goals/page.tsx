"use client"

import { useState, useEffect, useMemo } from "react"; // Added useMemo
import { GoalCard, type Goal } from "@/components/goal-card";
import { UpdateGoalDrawer } from "@/components/update-goal-drawer";
import { AddGoalSheet } from "@/components/add-goal-sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    IconPlus, IconShoe, IconFlame, IconGlassFull, IconWeight,
    IconChartLine, IconChartBar, IconChartArea, IconChartPie, IconWalk
} from "@tabler/icons-react";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, Label // Added Label from recharts
} from 'recharts';

// --- Mock Data ---
const mockGoalsInitial: Goal[] = [
    { id: "steps-1", title: "Daily Steps", description: "Reach 10k steps each day", type: "steps", targetValue: 10000, currentValue: 7540, unit: "steps", Icon: IconShoe, status: 'active' },
    { id: "calories-1", title: "Calorie Burn", description: "Active calorie burn target", type: "calories", targetValue: 500, currentValue: 320, unit: "kcal", Icon: IconFlame, status: 'active' },
    { id: "water-1", title: "Hydration", description: "Drink enough water daily", type: "water", targetValue: 2.5, currentValue: 1.2, unit: "L", Icon: IconGlassFull, status: 'active' },
    { id: "weight-1", title: "Weight Goal", description: "Reach target weight", type: "weight", targetValue: 75, currentValue: 78.5, unit: "kg", Icon: IconWeight, status: 'active' },
    // Add a completed goal for the pie chart
    { id: "run-1", title: "Run 5k", description: "Complete a 5k run", type: "distance", targetValue: 5, currentValue: 5, unit: "km", Icon: IconShoe, status: 'completed' },
    { id: "workout-freq-1", title: "Workout 3x/Week", description: "Hit the gym regularly", type: "frequency", targetValue: 3, currentValue: 2, unit: "workouts", Icon: IconFlame, status: 'active' },
];

const mockStepsHistory = [
    { date: 'Mon', steps: 6543 }, { date: 'Tue', steps: 8123 }, { date: 'Wed', steps: 7200 },
    { date: 'Thu', steps: 10560 }, { date: 'Fri', steps: 9870 }, { date: 'Sat', steps: 12345 }, { date: 'Sun', steps: 7890 },
];

const mockCaloriesHistory = [
    { date: 'Mon', calories: 345 }, { date: 'Tue', calories: 410 }, { date: 'Wed', calories: 390 },
    { date: 'Thu', calories: 520 }, { date: 'Fri', calories: 480 }, { date: 'Sat', calories: 610 }, { date: 'Sun', calories: 400 },
];

const mockWeightHistory = [
    { date: '2024-07-01', weight: 79.5 }, { date: '2024-07-08', weight: 79.1 }, { date: '2024-07-15', weight: 78.8 },
    { date: '2024-07-22', weight: 78.9 }, { date: '2024-07-29', weight: 78.5 }, { date: '2024-08-05', weight: 78.2 },
];

// --- Chart Configuration ---
// Using the colors defined in your globals.css
const chartConfig = {
    steps: { label: "Steps", color: "var(--chart-1)", icon: IconWalk },
    calories: { label: "Calories", color: "var(--chart-2)", icon: IconFlame },
    weight: { label: "Weight (kg)", color: "var(--chart-3)", icon: IconWeight },
    active: { label: "Active", color: "var(--chart-1)" }, // Using chart-1 for active
    completed: { label: "Completed", color: "var(--chart-4)" }, // Using chart-4 for completed
    // Add others if needed, e.g., water: { label: "Water (L)", color: "hsl(var(--chart-5))" }
} satisfies ChartConfig;

// --- GoalsPage Component ---
export default function GoalsPage() {
    const [goals, setGoals] = useState<Goal[]>(mockGoalsInitial);
    const [editDrawerOpen, setEditDrawerOpen] = useState(false);
    const [addSheetOpen, setAddSheetOpen] = useState(false);
    const [activeGoal, setActiveGoal] = useState<Goal | null>(null);

    const handleEditGoal = (goal: Goal) => {
        setActiveGoal(goal);
        setEditDrawerOpen(true);
    };

    const handleAddNewGoal = (newGoalData: Omit<Goal, 'id' | 'currentValue' | 'status'>) => {
        const newGoal: Goal = {
            ...newGoalData,
            id: `goal-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            currentValue: 0,
            status: 'active',
        };
        setGoals(prevGoals => [...prevGoals, newGoal]);
        // TODO: API call to save the goal
    };

    const handleUpdateGoal = (updatedGoalData: Partial<Goal> & { id: string }) => {
        setGoals(prevGoals =>
            prevGoals.map(g => (g.id === updatedGoalData.id ? { ...g, ...updatedGoalData } : g))
        );
        setActiveGoal(null);
        setEditDrawerOpen(false);
        // TODO: API call to update the goal
    };

    // --- Memoized Pie Chart Data Calculation ---
    const pieChartData = useMemo(() => {
        const statusCounts = goals.reduce((acc, goal) => {
            acc[goal.status] = (acc[goal.status] || 0) + 1;
            return acc;
        }, {} as Record<Goal['status'], number>);

        return Object.entries(statusCounts).map(([status, count]) => {
            let colorKey = status as keyof typeof chartConfig;
            let fallbackColor = "hsl(var(--muted))"; // Fallback if status not in config

            // Ensure the status exists as a key in chartConfig before accessing color
            const fillColor = (chartConfig[colorKey] && 'color' in chartConfig[colorKey])
                                ? chartConfig[colorKey].color
                                : fallbackColor;

            return {
                statusLabel: chartConfig[colorKey]?.label || status, // Use label from config or status itself
                status: status,
                count: count,
                fill: fillColor, // Use the resolved HSL string from config
            };
        });
    }, [goals]); // Recalculate only when goals array changes


    return (
        <div className="flex flex-col gap-6 py-4 md:gap-8 md:py-6">
            {/* Header and Add Button */}
            <div className="px-4 lg:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Fitness Goals</h1>
                <Button onClick={() => setAddSheetOpen(true)} className="cursor-pointer">
                    <IconPlus className="h-4 w-4 mr-2" />
                    Add New Goal
                </Button>
            </div>

            {/* Active Goals Section */}
            <div className="px-4 lg:px-6">
                <h2 className="text-xl font-semibold mb-4">Active Goals</h2>
                {goals.filter(g => g.status === 'active').length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"> {/* Changed lg to xl for 3 columns */}
                        {goals.filter(g => g.status === 'active').map((goal) => (
                            <GoalCard key={goal.id} goal={goal} onEdit={handleEditGoal} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground py-8 border border-dashed rounded-lg">
                        No active goals yet. Click "Add New Goal" to get started!
                    </div>
                )}
                {/* TODO: Add section for Completed Goals */}
            </div>

            {/* --- Goal History / Trends Section --- */}
            <div className="px-4 lg:px-6 mt-8">
                <h2 className="text-xl font-semibold mb-4">Goal Trends & History</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

                    {/* 1. Weekly Steps Line Chart */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <IconChartLine className="h-5 w-5 text-primary" />
                                <CardTitle>Weekly Steps</CardTitle>
                            </div>
                            <CardDescription>Daily step count over the last 7 days.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={mockStepsHistory} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} stroke="hsl(var(--muted-foreground))" />
                                        <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} width={50} stroke="hsl(var(--muted-foreground))" />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="line" />}
                                            />
                                        <Line dataKey="steps" type="monotone" strokeWidth={2} dot={true}
                                            stroke={chartConfig.steps.color} // Use color from config
                                            />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* 2. Weekly Calories Bar Chart */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <IconChartBar className="h-5 w-5 text-destructive" />
                                <CardTitle>Weekly Calories Burned</CardTitle>
                            </div>
                            <CardDescription>Daily active calorie burn over the last 7 days.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={mockCaloriesHistory} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} stroke="hsl(var(--muted-foreground))" />
                                        <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} width={50} stroke="hsl(var(--muted-foreground))" />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="dot"/>}
                                            />
                                        <Bar dataKey="calories" radius={[4, 4, 0, 0]} // Top radius only
                                            fill={chartConfig.calories.color} // Use color from config
                                            />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* 3. Weight Trend Area Chart */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                {/* Using text-chart-3 directly for icon color */}
                                <IconChartArea className="h-5 w-5" style={{ color: chartConfig.weight.color }} />
                                <CardTitle>Weight Trend</CardTitle>
                            </div>
                            <CardDescription>Weight fluctuation over recent weeks.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={mockWeightHistory} margin={{ top: 5, right: 10, left: -5, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} stroke="hsl(var(--muted-foreground))"
                                            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            />
                                        <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} width={40} stroke="hsl(var(--muted-foreground))"
                                            domain={['dataMin - 1', 'dataMax + 1']}
                                            />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="dot"/>}
                                            />
                                        <defs>
                                            <linearGradient id="fillWeight" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={chartConfig.weight.color} stopOpacity={0.8} />
                                                <stop offset="95%" stopColor={chartConfig.weight.color} stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <Area dataKey="weight" type="monotone" strokeWidth={2}
                                            stroke={chartConfig.weight.color} // Use color from config
                                            fill="url(#fillWeight)"
                                            />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* 4. Goal Status Pie Chart */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <IconChartPie className="h-5 w-5 text-blue-500" />
                                <CardTitle>Goal Status Overview</CardTitle>
                            </div>
                            <CardDescription>Breakdown of your current goals.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center">
                             {/* Ensure Pie chart has data before rendering */}
                            {pieChartData.length > 0 ? (
                                <ChartContainer config={chartConfig} className="h-[250px] w-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <ChartTooltip
                                                cursor={false}
                                                content={<ChartTooltipContent hideLabel nameKey="statusLabel" />} // Use statusLabel for tooltip name
                                                />
                                            <Pie data={pieChartData} dataKey="count" nameKey="statusLabel" // Use statusLabel for nameKey
                                                cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                                                labelLine={false}
                                                paddingAngle={2} // Add small padding between slices
                                                >
                                                {pieChartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                                {/* Optional: Add label in the center */}
                                                {/* <Label value={`${goals.length} Goals`} position="center" dy={0} fontSize="16px" fontWeight="bold" fill="hsl(var(--foreground))" /> */}
                                            </Pie>
                                            {/* <Legend verticalAlign="bottom" height={36}/> */}
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                             ) : (
                                <div className="text-center text-muted-foreground h-[250px] flex items-center justify-center">
                                    No goal data available for status chart.
                                </div>
                             )}
                        </CardContent>
                    </Card>

                </div>
            </div>

            {/* Drawers/Sheets for Editing and Adding */}
            {activeGoal && (
                <UpdateGoalDrawer
                    open={editDrawerOpen}
                    onOpenChange={setEditDrawerOpen}
                    goal={activeGoal}
                    onUpdate={handleUpdateGoal}
                />
            )}

            <AddGoalSheet
                open={addSheetOpen}
                onOpenChange={setAddSheetOpen}
                onAddGoal={handleAddNewGoal}
            />
        </div>
    );
}