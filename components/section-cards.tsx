import { IconActivityHeartbeat, IconFlame, IconTargetArrow, IconShoe } from "@tabler/icons-react" // Updated icons (Replaced IconGoal)

import { Badge } from "@/components/ui/badge" // Keep Badge for potential future use, but remove from current cards
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    // Removed bg-gradient-to-t
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Card 1: Steps Today */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Steps Today</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            7,540 <span className="text-base font-normal text-muted-foreground">/ 10,000</span>
          </CardTitle>
          <CardAction>
            {/* Increased icon size and changed color */}
            <IconShoe className="size-8 text-primary" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            75% towards your daily goal!
          </div>
          <div className="text-muted-foreground">
            Keep going!
          </div>
        </CardFooter>
      </Card>
      {/* Card 2: Calories Burned */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Calories Burned</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            350 <span className="text-base font-normal text-muted-foreground">kcal</span>
          </CardTitle>
          <CardAction>
            {/* Increased icon size and changed color */}
            <IconFlame className="size-8 text-primary" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            From workouts & activity
          </div>
          <div className="text-muted-foreground">
            Estimated total for today
          </div>
        </CardFooter>
      </Card>
      {/* Card 3: Calories Consumed */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Calories Consumed</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,200 <span className="text-base font-normal text-muted-foreground">/ 2,000 kcal</span>
          </CardTitle>
          <CardAction>
             {/* Increased icon size and changed color */}
             <IconActivityHeartbeat className="size-8 text-primary" /> {/* Placeholder icon */}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            On track with nutrition plan
          </div>
          <div className="text-muted-foreground">
            Logged via Meal Plan
          </div>
        </CardFooter>
      </Card>
       {/* Card 4: Active Goal */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Goal</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Run 5k
          </CardTitle>
          <CardAction>
            {/* Increased icon size and changed color */}
            <IconTargetArrow className="size-8 text-primary" /> {/* Replaced IconGoal */}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Target: Next Tuesday
          </div>
          <div className="text-muted-foreground">
            Progress: 60%
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
