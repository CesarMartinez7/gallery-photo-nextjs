import "./globals.css";
import { ubuntu } from "./font";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
