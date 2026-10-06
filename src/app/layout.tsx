import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Marquee from "../components/Marquee";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

// হেডলাইনের জন্য সেরিফ
const notoSerif = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
  variable: "--font-noto-serif",
  display: "swap",
});

// বডি টেক্সটের জন্য সহজপাঠ্য সান্স
const hind = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bangla News 24 | সর্বশেষ খবর",
    template: "%s | Bangla News 24",
  },
  description:
    "দেশ-বিদেশের সর্বশেষ খবর, রাজনীতি, খেলা, বিনোদন ও আরও অনেক কিছু এক জায়গায়।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerif.variable} ${hind.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />

        {/* Marquee stays visible while scrolling */}
        <div className="sticky top-0 z-50">
          <Marquee />
        </div>

        <main className="container mx-auto flex-1">{children}</main>

        <Footer />

        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
