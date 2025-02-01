import type { Metadata } from "next";
import "@/styles/globals.css";
import { fredoka } from "@/styles/fonts";

import SideNav from "@/components/website/side-nav";
import Footer from "@/components/website/footer";
import Navbar from "@/components/website/navbar";

export const metadata: Metadata = {
  title: {
    template: "%s | Your Movies",
    default: "Your Movies",
  },
  description:
    "Browse your favorite movies, TV series and upcoming movies. Manage and create lists of your favorites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.className} antialiased flex flex-col h-screen bg-gray-950`}
      >
        <header>
          <Navbar />
        </header>

        <main className="flex flex-grow flex-col md:flex-row md:overflow-hidden">
          <aside className="w-full flex-none md:w-40 relative">
            <SideNav />
            <footer className="hidden md:block absolute bottom-0">
              <Footer />
            </footer>
          </aside>

          <section className="flex-grow md:overflow-y-auto scrollbar scrollbar-thumb-slate-600 scrollbar-track-gray-900">
            {children}
          </section>
        </main>

        <footer className="md:hidden">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
