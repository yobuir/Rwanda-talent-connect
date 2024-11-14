import * as React from "react" 
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
          icon:"House",
          title: "Home",
          url: "/dashboard/admin",
        },
        {
          icon:"Tag",
          title: "Categories",
          url: "/dashboard/admin/category",
        },
        
        {
          icon:"Users",
          title: "Talents",
          url: "/dashboard/admin/talents-connect/talents",
        },
        {
          icon:"BriefcaseBusiness",
          title: "Employers",
          url: "/dashboard/admin/talents-connect/employers",
        },
        {
          icon:"PhoneIncoming",
          title: "Hiring requests",
          url: "/dashboard/admin/talents-connect/employers/hiring-requests",
        },
        {
          icon:"Building2",
          title: "Companies",
          url: "/dashboard/admin/talents-connect/companies",
        },
      ],
    },
    {
      title: "Communications",
      url: "#",
      items: [
        {
          icon:"Rss",
          title: "News and Updates",
          url: "#",
        },
        {
          icon:"Megaphone",
          title: "Marketing",
          url: "#",
        },
        {
          icon:"Calendar",
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
          icon:"Users",
          title: "Users",
          url: "/dashboard/admin/users",
        },
        {
          icon:"Boxes",
          title: "Team",
          url: "#",
        },
        {
          icon:"Settings",
          title: "Settings",
          url: "#",
        },
        {
          icon:"ArrowLeftRight",
          title: "Transactions",
          url: "/dashboard/admin/payments",
        },
        {
          icon:"ClipboardPlus",
          title: "Reports",
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
                      <Link href={item.url} className="font-semibold text-lg">
                        {React.createElement(require("lucide-react")[item.icon])} {item.title}
                      </Link>
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
