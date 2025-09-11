"use client"

import { Github, Linkedin, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


export default function Footer() {
  return (
    <footer className=" pt-24 pb-6 bg-orange-200/80 backdrop-blur-sm shadow-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          {/* Column 1: Logo + Company */}
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-1">
              <Image src="/assets/logo.png" alt="Aturiya" width={32} height={32} />
              <h2 className="text-2xl text-gray-400 font-bold">Aturiya</h2>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering businesses with intelligent AI solutions <br className="hidden md:block" /> for the future of work.
            </p>
            <div className="flex space-x-4 mt-2">
              <Link href="#" className="text-gray-400 h-10 w-10 bg-gray-100 flex justify-center items-center rounded-xl  hover:scale-105 transition-transform duration-200">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-gray-400 h-10 w-10 bg-gray-100 flex justify-center items-center rounded-xl  hover:scale-105 transition-transform duration-200">
                <X size={20} />
              </Link>
              <Link href="#" className="text-gray-400 h-10 w-10 bg-gray-100 flex justify-center items-center rounded-xl hover:scale-105 transition-transform duration-200">
                <Github size={20} />
              </Link>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Product</h3>
            <ul className="space-y-3.5 text-gray-400 text-sm">
              <li><Link href="#ai-agents" className="hover:text-amber-500 transition">AI Agents</Link></li>
              <li><a href="#integrations" className="hover:text-amber-500 transition">Integrations</a></li>
              <li><a href="#pricing" className="hover:text-amber-500 transition">Pricing</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Company</h3>
            <ul className="space-y-3.5 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-amber-500 transition">About</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition">Blog</Link></li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <ul className="space-y-3.5 text-gray-400 text-sm">
              {/* <li><Link href="#" className="hover:text-amber-500 transition">Help Center</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition">Documentation</Link></li> */}
              <li><Link href="#" className="hover:text-amber-500 transition">Contact</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
          <span>© 2025 Aturiya AI. All rights reserved.</span>
          <div className="flex space-x-4 mt-2 md:mt-0 text-xs">
            <Link href="#" className="hover:text-amber-500 transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-amber-500 transition">Terms of Service</Link>
            <Link href="#" className="hover:text-amber-500 transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
