import "../styles/globals.css";

export const metadata = { title: "WhaleJuice", description: "Ride the Storm. Bet like a Whale." };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><link rel="icon" href="/favicon.ico" /></head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
