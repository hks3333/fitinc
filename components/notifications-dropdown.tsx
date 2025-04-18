import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0 -top-0 h-2 w-2 rounded-full bg-red-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
          <div className="flex w-full items-center justify-between">
            <span className="font-medium">New Workout Available</span>
            <span className="text-xs text-muted-foreground">2h ago</span>
          </div>
          <p className="text-sm text-muted-foreground">
            A new HIIT workout has been added to your recommended workouts.
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
          <div className="flex w-full items-center justify-between">
            <span className="font-medium">Goal Achievement</span>
            <span className="text-xs text-muted-foreground">5h ago</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Congratulations! You've reached your daily step goal.
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 