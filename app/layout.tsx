import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TITLE } from "@/config";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { redirect } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh`}
      >
        <header className="border-b h-16 flex items-center px-6">
          <Button asChild variant="ghost">
            <Link href="/">{TITLE}</Link>
          </Button>

          <form
            action={async (formData: FormData) => {
              "use server";

              const keyword = formData.get("keyword") as string;

              if (keyword) {
                redirect(`/search?keyword=${encodeURIComponent(keyword)}`);
              }
            }}
            className="flex"
          >
            <Input
              autoComplete="off"
              name="keyword"
              type="search"
              className="flex-1"
            />
            <Button size="icon" variant="outline">
              <Search size={20} />
              <span className="sr-only">search</span>
            </Button>
          </form>
        </header>
        <main className="p-6">{children}</main>
        <footer className="border-t h-16 flex items-center px-6 sticky top-full">
          <p>&copy; {TITLE}</p>
        </footer>
      </body>
    </html>
  );
}
