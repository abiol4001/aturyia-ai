import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "AI-agent",
	description: "Let AI do it all",
};

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<div className={inter.className}>
				<Navbar />
				{children}
				<Footer />
			</div>
		</main>
	);
}
