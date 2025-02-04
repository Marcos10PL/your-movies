import type { Metadata } from "next";
import "@/styles/globals.css";
import { fredoka } from "@/styles/fonts";

import SideNav from "@/components/website/side-nav";
import Footer from "@/components/website/footer";
import { NavbarDesktop } from "@/components/website/navbars/navbar-desktop";
import NavbarMobile from "@/components/website/navbars/navbar-mobile";
import HeaderMobile from "@/components/website/header-mobile";

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
        {/* DESKTOP*/}
        <header className="hidden md:block">
          <nav>
            <NavbarDesktop />
          </nav>
        </header>

        {/* MOBILE*/}
        <header className="md:hidden">
          <HeaderMobile />
        </header>

        <nav className="md:hidden">
          <NavbarMobile />
        </nav>

        <main className="flex flex-grow flex-col md:flex-row md:overflow-hidden pt-12 md:pt-0">
          {/* DESKTOP */}
          <aside className="w-full flex-none md:w-40 relative hidden md:block">
            <SideNav />
            <footer className="hidden md:block absolute bottom-0">
              <Footer />
            </footer>
          </aside>

          {/* BOTH */}
          <section className="flex-grow md:overflow-y-auto scrollbar scrollbar-thumb-slate-600 scrollbar-track-gray-900 text-lg md:text-xl xl:text-2xl space-y-4 md:space-y-6 pt-2 md:pt-3">
            {children}
          </section>
        </main>

        {/* MOBILE */}
        <footer className="md:hidden pb-14 md:pb-0">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
