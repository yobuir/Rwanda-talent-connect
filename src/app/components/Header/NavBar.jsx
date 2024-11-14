'use client';

import Link from 'next/link';
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomAvatar from '../talentConnect/CustomAvatar';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react"; 
import { HomeIcon } from 'lucide-react';
import { SearchIcon } from 'lucide-react';
import { UserIcon } from 'lucide-react';
import { MenuIcon } from 'lucide-react';

function NavBar() {
  const { data: session } = useSession();  
  const user = session?.user || null;

  const [open, setOpen] = useState(false);

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Find talents", path: "/talents" },
    { title: "Contact us", path: "/contact-us" },
  ];

  const Brand = () => (
    <div className="flex items-center justify-between py-5 md:block">
      <Link href="/" className="relative  rounded-full  h-10 flex items-center justify-center">
        <Image
          alt="logo"
          src={`/images/logo/logo.png`}
          width={150}
          height={50}
          className="object-contain"
        />
      </Link>
      <div className="md:hidden">
        {user ? (
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center border rounded-full bg-gray-100/60 hover:bg-gray-100">
                    <CustomAvatar name={user.name} className="bg-gray-200" />
                    <ChevronDown className="ml-1 text-gray-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                      user.role === "talent"? (
                        <>
                        <DropdownMenuItem>
                          <Link href={`/talents/${user.id}`}>My Profile</Link>
                        </DropdownMenuItem> 
                        </>
                      ):
                      (<>
                      <DropdownMenuItem>
                        <Link href={`/dashboard`}>Dashboard</Link>
                      </DropdownMenuItem>
                        <DropdownMenuItem>
                        <Link href={`/dashboard/client/${user.id}`}>My Profile</Link>
                      </DropdownMenuItem>                        
                      </>)
                    }
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="text-red-500 hover:bg-red-500/30 cursor-pointer"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-orange-500 hover:bg-orange-700 active:bg-orange-600 rounded-full md:inline-flex"
              >
                Sign in / up
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            )}
      </div>
    </div>
  );

  const MobileNavBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t flex justify-around py-2 md:hidden">
      <Link href="/" className="flex flex-col items-center text-gray-700 hover:text-orange-500">
        <HomeIcon className="h-6 w-6" />
        <span className="text-xs">Home</span>
      </Link>
      <Link href="/talents" className="flex flex-col items-center text-gray-700 hover:text-orange-500">
        <SearchIcon className="h-6 w-6" />
        <span className="text-xs">Find Talents</span>
      </Link>
      <Link href="/contact-us" className="flex flex-col items-center text-gray-700 hover:text-orange-500">
        <UserIcon className="h-6 w-6" />
        <span className="text-xs">Contact Us</span>
      </Link>
      <button
        className="flex flex-col items-center text-gray-700 hover:text-orange-500"
        onClick={() => setOpen(!open)}
      >
        <MenuIcon className="h-6 w-6" />
        <span className="text-xs">Menu</span>
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b mb-5 bg-white shadow-sm">
      {/* Mobile NavBar */}
      <MobileNavBar />
      {/* Main NavBar */}
      <div className={`md:hidden ${open ? "mx-2 pb-5" : "hidden"}`}>
        <Brand />
      </div>
      <nav
        className={` md:text-sm ${
          open
            ? "absolute top-0 inset-x-0 backdrop-blur-md  z-50 shadow-lg rounded-xl border-none mx-2 mt-2 md:shadow-none md:border-none md:mx-0 md:mt-0 md:relative md:bg-transparent"
            : ""
        }`}
      >
        <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8 backdrop-blur-md  z-50 rounded-lg">
          <Brand />
          <div
            className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
              open ? "block" : "hidden"
            } `}
          >
            <ul className="flex-1 justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((item, idx) => (
                <li
                  key={idx}
                  className="text-gray-700 hover:text-orange-500"
                >
                  <Link href={item.path} className="block">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="items-center justify-end mt-6 space-y-6 md:flex md:mt-0">
              {user ? (
                <div className="flex items-center space-x-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center border rounded-full bg-gray-100/60 hover:bg-gray-100">
                      <CustomAvatar name={user.name} className="bg-gray-200" />
                      <ChevronDown className="ml-1 text-gray-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {
                        user.role === "talent"? (
                          <>
                          <DropdownMenuItem>
                            <Link href={`/talents/${user.id}`}>My Profile</Link>
                          </DropdownMenuItem> 
                          </>
                        ):
                        (<>
                        <DropdownMenuItem>
                          <Link href={`/dashboard`}>Dashboard</Link>
                        </DropdownMenuItem>
                          <DropdownMenuItem>
                          <Link href={`/dashboard/client/${user.id}`}>My Profile</Link>
                        </DropdownMenuItem>                        
                        </>)
                      }
                      <DropdownMenuItem
                        onClick={() => signOut()}
                        className="text-red-500 hover:bg-red-500/30 cursor-pointer"
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-orange-500 hover:bg-orange-700 active:bg-orange-600 rounded-full md:inline-flex"
                >
                  Sign in / up
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
