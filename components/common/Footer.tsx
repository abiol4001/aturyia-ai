"use client"

import { Github, Linkedin, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


export default function Footer() {
  return (
    <footer className="pt-24 pb-6 bg-orange-950 backdrop-blur-sm shadow-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          {/* Column 1: Logo + Company */}
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-1">
              <Image src="/assets/logo.png" alt="Aturiya" width={32} height={32} />
              <h2 className="text-2xl text-white font-bold">Aturiya</h2>
            </div>
            <p className="text-white text-sm">
              Empowering businesses with intelligent AI solutions <br className="hidden md:block" /> for the future of work.
            </p>
            <div className="flex space-x-4 mt-2">
              <Link href="#" className="text-white h-10 w-10 bg-white/20 hover:bg-white/30 flex justify-center items-center rounded-xl hover:scale-105 transition-all duration-200">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-white h-10 w-10 bg-white/20 hover:bg-white/30 flex justify-center items-center rounded-xl hover:scale-105 transition-all duration-200">
                <X size={20} />
              </Link>
              <Link href="#" className="text-white h-10 w-10 bg-white/20 hover:bg-white/30 flex justify-center items-center rounded-xl hover:scale-105 transition-all duration-200">
                <Github size={20} />
              </Link>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Product</h3>
            <ul className="space-y-3.5 text-white text-sm">
              <li><Link href="#ai-agents" className="hover:text-orange-200 transition-colors">AI Agents</Link></li>
              <li><a href="#integrations" className="hover:text-orange-200 transition-colors">Integrations</a></li>
              <li><a href="#pricing" className="hover:text-orange-200 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Company</h3>
            <ul className="space-y-3.5 text-white text-sm">
              <li><Link href="#" className="hover:text-orange-200 transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-orange-200 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-orange-200 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Support</h3>
            <ul className="space-y-3.5 text-white text-sm">
              {/* <li><Link href="#" className="hover:text-orange-200 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-orange-200 transition-colors">Documentation</Link></li> */}
              <li><Link href="#" className="hover:text-orange-200 transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-orange-200 transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center text-white text-xs">
          <span>© 2025 Aturiya AI. All rights reserved.</span>
          <div className="flex space-x-4 mt-2 md:mt-0 text-xs">
            <Link href="#" className="hover:text-orange-200 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-orange-200 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-orange-200 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
