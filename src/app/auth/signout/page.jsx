"use client";

import { signOut } from "next-auth/react";

export default function SignOutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Are you sure you want to sign out?</h1>
      <button onClick={() => signOut({ callbackUrl: "/" })} className="px-4 py-2 mt-4 text-white bg-red-600 rounded">
        Sign Out
      </button>
    </div>
  );
}
