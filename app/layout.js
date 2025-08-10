import "../styles/globals.css";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import dynamic from "next/dynamic";
const MobileNav = dynamic(()=>import("../components/layout/MobileNav"),{ ssr:false });

export const metadata = { title: "WhaleJuice", description: "Ride the Storm. Bet like a Whale." };

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen antialiased flex flex-col">
        <Nav />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
