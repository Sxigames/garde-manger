'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const store = makeStore();
const persitor = persistStore(store);
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
const pathname = usePathname()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-300`}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persitor}>
            <Tabs value={pathname} className="w-full p-4">
          <TabsList>
            <TabsTrigger value="title" disabled>le garde manger</TabsTrigger>
            <TabsTrigger value="/groceries" asChild><Link href="/groceries">Groceries</Link></TabsTrigger>
            <TabsTrigger value="/presets" asChild><Link href="/presets">Presets</Link></TabsTrigger>
          </TabsList>
          <TabsContent value={pathname}>
            <Card className="w-fit min-w-full min-h-full h-fit p-4">
          {children}
          </Card>
          </TabsContent>
          </Tabs>
          </PersistGate>
          </Provider>
      </body>
    </html>
  );
}
export const dynamic = 'force-dynamic'