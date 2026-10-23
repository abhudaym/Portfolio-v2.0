import { useCallback, useEffect, useState } from "react";

const current = () => {
  if (typeof document === "undefined") return "dark";
  const a = document.documentElement.getAttribute("data-theme");
  if (a) return a;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export default function useTheme() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => setTheme(current()), []);
  const toggle = useCallback(() => {
    const next = current() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    setTheme(next);
  }, []);
  return [theme, toggle];
}
