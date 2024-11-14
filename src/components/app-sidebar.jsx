import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      items: [
        {
          title: "Home",
          url: "/dashboard/admin",
        },
        {
          title: "Categories",
          url: "/dashboard/admin/category",
        },
        {
          title: "Talents",
          url: "/dashboard/admin/talents",
        },
        {
          title: "Employers",
          url: "/dashboard/admin/employers",
        },
        {
          title: "Hiring requests",
          url: "/dashboard/admin/employers/hiring-requests",
        },
         {
          title: "Companies",
          url: "/dashboard/admin/companies",
        },
      ],
    },
     {
      title: "Communications",
      url: "#",
      items: [
        {
          title: "News and Updates",
          url: "#",
        },
        {
          title: "Marketing",
          url: "#",
        },
         {
          title: "Events",
          url: "#",
        },
      ],
    }, 
       {
      title: "Others",
      url: "#",
      items: [
        {
          title: "Users",
          url: "/dashboard/admin/users",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
        {
          title: "Transactions",
          url: "/dashboard/admin/payments",
        },
        {
          title: "Reports",
          url: "#",
        },
        ,
        {
          title: "Tickets",
          url: "#",
        }
        
      ],
    }, 
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar {...props}>
      <SidebarHeader>
        <h1 className="font-extrabold text-orange-500">
        {process.env.APP_NAME}
        </h1>
      </SidebarHeader>
      <SidebarContent> 
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>)
  );
}
