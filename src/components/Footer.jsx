"use client";

import { LogoFacebook, LogoGithub, LogoLinkedin } from "@gravity-ui/icons";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050816] text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_#3b82f6_0,_transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/">
              <h2 className="text-3xl font-black">
                Hire
                <span className="text-violet-500">Loop</span>
              </h2>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-zinc-400">
              The AI-powered hiring platform connecting
              talented professionals with top companies
              around the world.
            </p>

            <div className="flex gap-3">
              <Link
                href="#"
                className="rounded-lg bg-white/5 p-3 transition hover:bg-violet-600"
              >
                <LogoFacebook className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="rounded-lg bg-white/5 p-3 transition hover:bg-violet-600"
              >
                <LogoGithub className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="rounded-lg bg-white/5 p-3 transition hover:bg-violet-600"
              >
                <LogoLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-5 font-semibold text-violet-400">
              Platform
            </h3>

            <ul className="space-y-3 text-zinc-400">
              <li>
                <Link href="/jobs">
                  Browse Jobs
                </Link>
              </li>

              <li>
                <Link href="/companies">
                  Companies
                </Link>
              </li>

              <li>
                <Link href="/recruiters">
                  For Recruiters
                </Link>
              </li>

              <li>
                <Link href="/salary-insights">
                  Salary Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 font-semibold text-violet-400">
              Navigation
            </h3>

            <ul className="space-y-3 text-zinc-400">
              <li>
                <Link href="/about">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/resources">
                  Career Resources
                </Link>
              </li>

              <li>
                <Link href="/contact">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/faq">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 font-semibold text-violet-400">
              Resources
            </h3>

            <ul className="space-y-3 text-zinc-400">
              <li>
                <Link href="/blog">
                  Blog
                </Link>
              </li>

              <li>
                <Link href="/success-stories">
                  Success Stories
                </Link>
              </li>

              <li>
                <Link href="/newsroom">
                  Newsroom
                </Link>
              </li>

              <li>
                <Link href="/help-center">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-zinc-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} HireLoop.
            All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/terms">
              Terms & Conditions
            </Link>

            <Link href="/privacy-policy">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}