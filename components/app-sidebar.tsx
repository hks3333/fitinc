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
    name: "John Doe",
    email: "johndoe@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Daily Goals",
      url: "/dashboard/goals",
      icon: IconTarget,
    },
    {
      title: "Workout Timer",
      url: "/dashboard/timer",
      icon: IconClock,
    },
    {
      title: "Exercises",
      url: "/dashboard/exercises",
      icon: IconTreadmill,
    },
    {
      title: "Meal Plan",
      url: "/dashboard/meal-plan",
      icon: IconMeat,
    },
    {
      title: "Progress",
      url: "/dashboard/progress",
      icon: IconChartBar,
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
