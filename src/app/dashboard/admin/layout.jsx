import React from 'react';
import { AppSidebar } from "@/components/app-sidebar" 
import { Separator } from "@/components/ui/separator"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CustomAvatar from '@/app/components/CustomAvatar';
import { ConfigProvider } from 'antd';


function RootLayout({ children }) {
  return (
      <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#fa8c16',
            },
          }}
        >
          <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
              <div className='flex items-center gap-2'>  
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
              <div className='flex items-end gap-2'> 
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <CustomAvatar/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem> 
                    </DropdownMenuContent>
                </DropdownMenu> 
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="min-h-[100vh] flex-1 rounded-xl  md:min-h-min  ">
              {children}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ConfigProvider>
   
  );
}

export default RootLayout;
