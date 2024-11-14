import { useState, useEffect } from "react"

/**
 * Hook to check if a given media query matches.
 * @param query - Media query string (e.g., "(min-width: 768px)")
 * @returns `true` if the media query matches, `false` otherwise.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return
    }

    const mediaQueryList = window.matchMedia(query)

    const updateMatch = () => setMatches(mediaQueryList.matches)
    updateMatch()

    mediaQueryList.addEventListener("change", updateMatch)
    return () => mediaQueryList.removeEventListener("change", updateMatch)
  }, [query])

  return matches
}
