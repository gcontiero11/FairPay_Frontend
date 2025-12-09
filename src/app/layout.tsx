import "./global.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "FairPay - Gestão de Despesas",
  description: "Gerencie suas despesas de forma justa e eficiente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
