"use client"

import { useState, useEffect, useMemo } from "react";
import { SectionCards } from "@/components/section-cards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    IconShoe, IconFlame, IconGlassFull, IconWeight, IconTargetArrow, IconChartLine, IconChartBar, IconChartArea, IconChartPie, IconActivity, IconApple
} from "@tabler/icons-react"; // Added more icons

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList,
    BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, Label, Legend, // Added Legend
    RadialBarChart, RadialBar // Added RadialBarChart
} from 'recharts';
import type { Goal } from "@/components/goal-card"; // Assuming Goal type is exported

// --- Mock Data ---
// Reusing mock data similar to Goals page for consistency
const mockGoalsInitial: Goal[] = [
    { id: "steps-1", title: "Daily Steps", description: "Reach 10k steps each day", type: "steps", targetValue: 10000, currentValue: 7540, unit: "steps", Icon: IconShoe, status: 'active' },
    { id: "calories-1", title: "Calorie Burn", description: "Active calorie burn target", type: "calories", targetValue: 500, currentValue: 320, unit: "kcal", Icon: IconFlame, status: 'active' },
    { id: "water-1", title: "Hydration", description: "Drink enough water daily", type: "water", targetValue: 2.5, currentValue: 1.2, unit: "L", Icon: IconGlassFull, status: 'active' },
    { id: "weight-1", title: "Weight Goal", description: "Reach target weight", type: "weight", targetValue: 75, currentValue: 78.5, unit: "kg", Icon: IconWeight, status: 'active' },
    { id: "run-1", title: "Run 5k", description: "Complete a 5k run", type: "distance", targetValue: 5, currentValue: 3, unit: "km", Icon: IconShoe, status: 'active' }, // Made active for focus card
    { id: "workout-freq-1", title: "Workout 4x/Week", description: "Hit the gym regularly", type: "frequency", targetValue: 4, currentValue: 3, unit: "workouts", Icon: IconActivity, status: 'active' },
    { id: "sleep-1", title: "Sleep 7 hours", description: "Get enough rest", type: "frequency", targetValue: 7, currentValue: 7, unit: "hours", Icon: IconActivity, status: 'completed' }, // Added completed
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

const mockMacroData = [
    { name: 'Protein', current: 80, target: 100, fill: 'var(--chart-1)' },
    { name: 'Carbs', current: 150, target: 250, fill: 'var(--chart-2)' },
    { name: 'Fat', current: 40, target: 60, fill: 'var(--chart-3)' },
];
const totalMacroTarget = mockMacroData.reduce((sum, item) => sum + item.target, 0); // For Radial Bar

const mockHydrationData = { current: 1.5, target: 2.5 }; // Liters
const hydrationPercentage = Math.min(100, Math.round((mockHydrationData.current / mockHydrationData.target) * 100));

const mockWorkoutConsistency = { completed: 3, goal: 4 };
const workoutConsistencyData = [
    { name: 'Week', completed: mockWorkoutConsistency.completed, remaining: mockWorkoutConsistency.goal - mockWorkoutConsistency.completed }
];

const mockFocusGoal = mockGoalsInitial.find(g => g.id === 'run-1')!; // Find the active 5k run goal

// --- Chart Configuration ---
// Using var() directly as requested
const chartConfig = {
    steps: { label: "Steps", color: "var(--chart-1)", icon: IconShoe },
    calories: { label: "Calories", color: "var(--chart-2)", icon: IconFlame },
    weight: { label: "Weight (kg)", color: "var(--chart-3)", icon: IconWeight },
    protein: { label: "Protein (g)", color: "var(--chart-1)" },
    carbs: { label: "Carbs (g)", color: "var(--chart-2)" },
    fat: { label: "Fat (g)", color: "var(--chart-3)" },
    water: { label: "Water (L)", color: "var(--chart-4)", icon: IconGlassFull },
    completed: { label: "Completed", color: "var(--chart-5)" },
    active: { label: "Active", color: "var(--chart-1)" }, // Reusing chart-1 for active goals
    remaining: { label: "Remaining", color: "var(--muted)" },
} satisfies ChartConfig;


export default function DashboardPage() {
    // Using mock goals directly for this overview page
    const goals = mockGoalsInitial;

    // Memoized Pie Chart Data Calculation (same as Goals page)
    const pieChartData = useMemo(() => {
        const statusCounts = goals.reduce((acc, goal) => {
            acc[goal.status] = (acc[goal.status] || 0) + 1;
            return acc;
        }, {} as Record<Goal['status'], number>);

        return Object.entries(statusCounts).map(([status, count]) => {
            let colorKey = status as keyof typeof chartConfig;
            let fallbackColor = "hsl(var(--muted))";

            const fillColor = (chartConfig[colorKey] && 'color' in chartConfig[colorKey])
                                ? chartConfig[colorKey].color
                                : fallbackColor;

            return {
                statusLabel: chartConfig[colorKey]?.label || status,
                status: status,
                count: count,
                fill: fillColor,
            };
        });
    }, [goals]);

    const focusGoalProgress = mockFocusGoal.targetValue > 0 ? Math.min(100, Math.round((mockFocusGoal.currentValue / mockFocusGoal.targetValue) * 100)) : 0;

    return (
        <div className="flex flex-col gap-6 py-4 md:gap-8 md:py-6">
            {/* Top Summary Cards */}
            <SectionCards />

            {/* Main Content Grid - Randomized Layout */}
            <div className="px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

                {/* 1. Weight Trend Area Chart (Span 1) */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <IconChartArea className="h-5 w-5" style={{ color: chartConfig.weight.color }} />
                            <CardTitle>Weight Trend</CardTitle>
                        </div>
                        <CardDescription>Weight fluctuation over recent weeks.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockWeightHistory} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}> {/* Adjusted left margin */}
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} stroke="var(--muted-foreground)"
                                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                                    <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} width={40} stroke="var(--muted-foreground)" domain={['dataMin - 1', 'dataMax + 1']} />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                    <defs>
                                        <linearGradient id="fillWeightOverview" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={chartConfig.weight.color} stopOpacity={0.8} />
                                            <stop offset="95%" stopColor={chartConfig.weight.color} stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <Area dataKey="weight" type="monotone" strokeWidth={2} stroke={chartConfig.weight.color} fill="url(#fillWeightOverview)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* 2. Goal Status Pie Chart (Span 1) */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <IconChartPie className="h-5 w-5 text-blue-500" />
                            <CardTitle>Goal Status Overview</CardTitle>
                        </div>
                        <CardDescription>Breakdown of your current goals.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        {pieChartData.length > 0 ? (
                            <ChartContainer config={chartConfig} className="h-[250px] w-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="statusLabel" />} />
                                        <Pie data={pieChartData} dataKey="count" nameKey="statusLabel" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2}
                                             labelLine={false}
                                             label={({ statusLabel, percent }) => `${(percent * 100).toFixed(0)}%`} // Label directly on slice
                                             >
                                            {pieChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
                                            ))}
                                            <Label value={goals.length} position="center" fill="var(--foreground)" className="text-xl font-bold"> Goals </Label>
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        ) : (
                            <div className="text-center text-muted-foreground h-[250px] flex items-center justify-center">No goal data available.</div>
                        )}
                    </CardContent>
                </Card>

                {/* 3. Weekly Steps Bar Chart (Full Width - Span 2) */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <IconChartBar className="h-5 w-5 text-primary" /> {/* Changed Icon */}
                            <CardTitle>Weekly Steps</CardTitle>
                        </div>
                        <CardDescription>Daily step count over the last 7 days.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                {/* Changed to Bar Chart */}
                                <BarChart data={mockStepsHistory} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}> {/* Adjusted left margin */}
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} stroke="var(--muted-foreground)" />
                                    <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} width={50} stroke="var(--muted-foreground)" />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                    <Bar dataKey="steps" radius={[4, 4, 0, 0]} fill={chartConfig.steps.color}>
                                        <LabelList dataKey="steps" position="top" offset={5} fontSize={11} fill="var(--foreground)" />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* 4. Macronutrient Breakdown Radial Bar Chart (Span 1) */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <IconApple className="h-5 w-5 text-green-500" />
                            <CardTitle>Today's Macros</CardTitle>
                        </div>
                        <CardDescription>Progress towards daily targets (g).</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        {/* Increased size */}
                        <ChartContainer config={chartConfig} className="h-[300px] w-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                    data={mockMacroData}
                                    startAngle={90} // Start from top
                                    endAngle={-270} // Full circle
                                    innerRadius="30%"
                                    outerRadius="90%"
                                    barSize={15} // Thickness of bars
                                    >
                                    <CartesianGrid strokeDasharray="3 3" /> {/* Removed radialLines={false} */}
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="name" formatter={(value, name, props) => `${value} / ${props.payload.target} g`} />} />
                                    <RadialBar
                                        dataKey="current"
                                        background={{ fill: 'var(--muted) / 50%' }} // Background track
                                        cornerRadius={10}
                                        >
                                        {mockMacroData.map((entry) => (
                                            <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                        ))}
                                    </RadialBar>
                                    {/* Moved Legend */}
                                    <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ bottom: -5 }}/>
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* 5. Weekly Calories Bar Chart (Span 1) */}
                <Card className="lg:col-span-1">
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
                                <BarChart data={mockCaloriesHistory} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}> {/* Adjusted left margin */}
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} stroke="var(--muted-foreground)" />
                                    <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} width={50} stroke="var(--muted-foreground)" />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                    <Bar dataKey="calories" radius={[4, 4, 0, 0]} fill={chartConfig.calories.color}>
                                        <LabelList dataKey="calories" position="top" offset={5} fontSize={11} fill="var(--foreground)" />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* 6. Workout Consistency Stacked Bar Chart (Span 2) */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <IconChartArea className="h-5 w-5" style={{ color: chartConfig.weight.color }} />
                            <CardTitle>Weight Trend</CardTitle>
                        </div>
                        <CardDescription>Weight fluctuation over recent weeks.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockWeightHistory} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}> {/* Adjusted left margin */}
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} stroke="var(--muted-foreground)"
                                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                                    <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} width={40} stroke="var(--muted-foreground)" domain={['dataMin - 1', 'dataMax + 1']} />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                    <defs>
                                        <linearGradient id="fillWeightOverview" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={chartConfig.weight.color} stopOpacity={0.8} />
                                            <stop offset="95%" stopColor={chartConfig.weight.color} stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <Area dataKey="weight" type="monotone" strokeWidth={2} stroke={chartConfig.weight.color} fill="url(#fillWeightOverview)" />
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
                        {pieChartData.length > 0 ? (
                            <ChartContainer config={chartConfig} className="h-[250px] w-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="statusLabel" />} />
                                        <Pie data={pieChartData} dataKey="count" nameKey="statusLabel" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2}
                                             labelLine={false}
                                             label={({ statusLabel, percent }) => `${(percent * 100).toFixed(0)}%`} // Label directly on slice
                                             >
                                            {pieChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
                                            ))}
                                            <Label value={goals.length} position="center" fill="var(--foreground)" className="text-xl font-bold"> Goals </Label>
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        ) : (
                            <div className="text-center text-muted-foreground h-[250px] flex items-center justify-center">No goal data available.</div>
                        )}
                    </CardContent>
                </Card>

                {/* 5. Macronutrient Breakdown Radial Bar Chart */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <IconApple className="h-5 w-5 text-green-500" />
                            <CardTitle>Today's Macros</CardTitle>
                        </div>
                        <CardDescription>Progress towards daily targets (g).</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        {/* Increased size */}
                        <ChartContainer config={chartConfig} className="h-[300px] w-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                    data={mockMacroData}
                                    startAngle={90} // Start from top
                                    endAngle={-270} // Full circle
                                    innerRadius="30%"
                                    outerRadius="90%"
                                    barSize={15} // Thickness of bars
                                    >
                                    <CartesianGrid strokeDasharray="3 3" /> {/* Removed radialLines={false} */}
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="name" formatter={(value, name, props) => `${value} / ${props.payload.target} g`} />} />
                                    <RadialBar
                                        dataKey="current"
                                        background={{ fill: 'var(--muted) / 50%' }} // Background track
                                        cornerRadius={10}
                                        >
                                        {mockMacroData.map((entry) => (
                                            <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                        ))}
                                    </RadialBar>
                                    {/* Moved Legend */}
                                    <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ bottom: -5 }}/>
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                {/* Removed Hydration Chart Code */}

                {/* 6. Workout Consistency Stacked Bar Chart (Moved position) */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <IconActivity className="h-5 w-5 text-orange-500" />
                            <CardTitle>Weekly Workouts</CardTitle>
                        </div>
                        <CardDescription>Consistency towards goal: {mockWorkoutConsistency.completed} / {mockWorkoutConsistency.goal} sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={workoutConsistencyData} layout="vertical" margin={{ top: 5, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" /> {/* Corrected CSS var usage */}
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" hide />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <Legend />
                                    {/* Corrected fill colors */}
                                    <Bar dataKey="completed" stackId="a" fill={chartConfig.active.color} radius={[5, 0, 0, 5]} name={chartConfig.active.label}>
                                        <LabelList position="center" fill="var(--primary-foreground)" fontSize={12} />
                                    </Bar>
                                    <Bar dataKey="remaining" stackId="a" fill={chartConfig.remaining.color} radius={[0, 5, 5, 0]} name={chartConfig.remaining.label}>
                                        <LabelList position="center" fill="var(--secondary-foreground)" fontSize={12} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Removed Hydration and Focus Goal Cards */}

            </div>
        </div>
    );
}
