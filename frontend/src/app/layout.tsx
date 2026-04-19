import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css"; // ตรวจสอบว่ามีไฟล์นี้เพื่อโหลด Tailwind

export const metadata: Metadata = {
  title: "Woxa | Institutional Brokers",
  description: "Access global liquidity through our curated network.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0B1221] text-gray-300 font-sans min-h-screen flex flex-col">
        {/* HEADER */}
        <header className="border-b border-gray-800 bg-[#0B1221] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white tracking-wide">
              Woxa
            </Link>
            <nav className="hidden md:flex space-x-8 text-sm font-medium">
              <Link href="/" className="text-white border-b-2 border-white pb-1">Brokers</Link>
              <Link href="#" className="hover:text-white transition">Markets</Link>
              <Link href="#" className="hover:text-white transition">Analysis</Link>
              <Link href="#" className="hover:text-white transition">Education</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="hover:text-white">🔔</button>
              <button className="hover:text-white">👤</button>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-grow">{children}</main>

        {/* FOOTER */}
        <footer className="border-t border-gray-800 bg-[#0B1221] py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-wider font-semibold">
            <div className="mb-4 md:mb-0 text-white text-lg font-bold normal-case tracking-wide">Woxa</div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link href="#" className="hover:text-gray-300">Privacy Policy</Link>
              <Link href="#" className="hover:text-gray-300">Terms of Service</Link>
              <Link href="#" className="hover:text-gray-300">Risk Disclosure</Link>
              <Link href="#" className="hover:text-gray-300">Contact</Link>
            </div>
            <div>© 2024 STERLING MIDNIGHT. ALL RIGHTS RESERVED.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}