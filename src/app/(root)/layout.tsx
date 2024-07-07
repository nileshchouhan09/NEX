import { ReactNode } from "react";
import StreamVideoProvider from "../../../providers/StreamClientProvider";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "NEX",
  description: "Video calling app",
  icons:{
    icon:"/icons/logo.svg"
  }
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    
    <main>
      <StreamVideoProvider>
        {children}
        </StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
