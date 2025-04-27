import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Providers from "./providers";
import { Toaster } from 'react-hot-toast';
import ClientSideLayout from "@/components/client-side-layout";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Agrocore - Gestión",
  description: "Sistema para gestionar clientes y ventas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`antialiased ${inter.className}`}>
        <Providers>
          <ClientSideLayout>
            {children}
          </ClientSideLayout>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}