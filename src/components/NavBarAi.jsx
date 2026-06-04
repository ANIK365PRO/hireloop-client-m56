"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars, Xmark } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";

export default function NavBarAi() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      label: "Browse Jobs",
      href: "/jobs",
    },
    {
      label: "Companies",
      href: "/companies",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
  ];

  // for get seeker(user)
  const { data: session } = authClient.useSession()
  const user = (session?.user)

  const handleLogOut = async() =>{
    await authClient.signOut();
  }


  return (
    <nav className="sticky top-0 z-50 border-white/10 bg-zinc-900/90">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-2xl px-6 py-4 shadow-2xl backdrop-blur">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-white">
              Hire
              <span className="text-violet-500">Loop</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-10 lg:flex">
            <ul className="flex items-center gap-8">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-300 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="h-5 w-px bg-zinc-500" />

              {
                
                user? 
                <>
                
                  <div className="flex items-center gap-4">
                    <Avatar size="sm">
                        <Avatar.Image alt="John Doe" src={user?.name} />
                          <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                        </Avatar>
                        
                        <Button size="sm" variant="ghost" className='text-red-500 hover:border-red-500' onClick={handleLogOut}>Logout</Button>
                        
                  </div>

                </> : 
                
                <>
                  
                    <div className="flex items-center gap-4">
                      <Link
                        href="/signin"
                        className="text-sm font-medium text-violet-400 hover:text-violet-300"
                      >
                        Sign In
                      </Link>

                      <Link
                        href="/register"
                        className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
                      >
                        Get Started
                      </Link>
                    </div>

                </>
              }

          </div>

          {/* Mobile Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <Xmark width={24} height={24} />
            ) : (
              <Bars width={24} height={24} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-2 rounded-2xl border border-white/10 bg-zinc-900 p-4 lg:hidden">
            <ul className="space-y-4">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-zinc-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/signin"
                className="text-center text-violet-400"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-violet-600 py-3 text-center text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}