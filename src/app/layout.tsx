import type { Metadata } from "next";
import "@/styles/globals.css";
import { fredoka } from "@/styles/fonts";

import SideNav from "@/components/side-nav";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

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
        className={`${fredoka.className} antialiased flex flex-col h-screen bg-gradient-to-t from-slate-500 to-slate-400  dark:from-slate-900 dark:to-slate-800`}
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

          <section className="flex-grow md:overflow-y-auto">
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
