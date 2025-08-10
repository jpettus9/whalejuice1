import "../styles/globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata = { title: "WhaleJuice", description: "Ride the Storm. Bet like a Whale." };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><link rel="icon" href="/favicon.ico" /></head>
      <body className="min-h-screen antialiased flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
