
import type {Metadata} from 'next';
import './globals.css';
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "next-themes"
import { Header } from '@/components/header';
import { LaguitoBot } from '@/components/laguito-bot';


export const metadata: Metadata = {
  title: 'Club Del Lago',
  description: 'Desde 1981 el Club Delago es una asociación civil dedicada a promover la sana convivencia familiar.',
  icons: {
    icon: "/images/Logo-vector.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Merriweather:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased")}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            {children}
            <Toaster />
            <LaguitoBot />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
