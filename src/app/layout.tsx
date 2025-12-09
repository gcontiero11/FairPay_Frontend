"use client";

import "./global.css";
import { Toaster } from "sonner";
import { SplitGroupProvider } from "@/contexts/SplitGroupContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <SplitGroupProvider>
          {children}
          <Toaster position="top-right" richColors />
        </SplitGroupProvider>
      </body>
    </html>
  );
}
