'use client';
import hydrateAuthStore from "@/lib/hydrateAuthStore";
import { useEffect } from "react";

export default function ClientHydrate() {
  useEffect(() => {
    hydrateAuthStore();
  }, []);

  return null; // This component only runs the hydration logic
}
