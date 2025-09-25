import React from "react";
import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "../contexts/ThemeContext";

const Toaster = () => {
  const { theme } = useTheme();

  return (
    <SonnerToaster
      theme={theme}
      position="bottom-right"
      toastOptions={{
        style: {
          background: theme === "dark" ? "hsl(0 0% 3.9%)" : "hsl(0 0% 100%)",
          border: theme === "dark" ? "hsl(0 0% 14.9%)" : "hsl(0 0% 89.8%)",
          color: theme === "dark" ? "hsl(0 0% 98%)" : "hsl(0 0% 3.9%)",
        },
      }}
    />
  );
};

export default Toaster;