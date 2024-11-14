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
import CustomAvatar from '../CustomAvatar';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react";

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
        <button
          className="menu-btn text-gray-500 hover:text-gray-800"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b mb-5 bg-white shadow-sm">
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
                      <DropdownMenuItem>
                        <Link href={`/dashboard`}>Dashboard</Link>
                      </DropdownMenuItem>
                        <DropdownMenuItem>
                        <Link href={`/dashboard/client/${user.id}`}>My Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
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
