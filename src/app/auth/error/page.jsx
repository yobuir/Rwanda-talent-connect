"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Error</h1>
      <p className="text-red-500">{error || "Something went wrong."}</p>
      <Link href="/auth/signin" className="mt-4 text-blue-600 underline">
        Go back to Sign In
      </Link>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorContent />
    </Suspense>
  );
}