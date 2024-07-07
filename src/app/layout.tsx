import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-datepicker/dist/react-datepicker.css'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEX",
  description: "Video calling app",
  icons:{
    icon:"/icons/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout:{
            logoImageUrl:"/icons/logo.svg",
            
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#0E78F9",
            colorBackground: "#1c1f2e",
            colorInputBackground: "#252a41",
            colorInputText:"#ffff"
          },
        }}
      >
        <body className={`${inter.className} bg-dark-2`}>{children}
       <Toaster />

        </body>
      </ClerkProvider>
    </html>
  );
}
