import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "./components/dashboard";
import { dm_sans } from "./fonts";
import { StoreProvider } from "./StoreProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryProvider } from "./ReactQueryProvider";

const queryClient = new QueryClient()

export const metadata: Metadata = {
  title: {
    template: '%s | SwiftCart',
    default: 'SwiftCart', // a default is required when creating a template
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dm_sans.className} antialiased`}>
        <ReactQueryProvider>
          <StoreProvider>
            <div className="min-h-screen w-full bg-[#f4f4f2]">
              <div className="w-full">
                <TopNav />
              </div>

              <div className="p-2">{children}</div>
            </div>
          </StoreProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
