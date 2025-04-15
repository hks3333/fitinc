"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconDashboard,
  IconClock,
  IconStretching2,
  IconMeat,
  IconTarget,
  IconChartBar,
  IconSettings,
  IconUser,
  IconTreadmill,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Jane",
    email: "jane@gmail.com",
    avatar: "/ico.png",
  },
  // Reordered navMain to prioritize core tracker features
  navMain: [
    {
      title: "Overview", // Core
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Daily Goals", // Core
      url: "/dashboard/goals",
      icon: IconTarget,
    },
    {
      title: "Progress", // Core
      url: "/dashboard/progress",
      icon: IconChartBar,
    },
    {
      title: "Exercises", // Supporting
      url: "/dashboard/exercises",
      icon: IconTreadmill,
    },
    {
      title: "Meal Plan", // Supporting
      url: "/dashboard/meal-plan",
      icon: IconMeat,
    },
    {
      title: "Workout Timer", // Supporting
      url: "/dashboard/timer",
      icon: IconClock,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: IconUser,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-0"
            >
              <Link href="/dashboard">
                <IconStretching2 className="!size-8" />
                <span className="text-2xl lg:text-3xl font-bold">Fit Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
