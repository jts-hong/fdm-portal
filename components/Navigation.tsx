'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: 'All Reports', path: '/' },
    { name: 'Access Instructions', path: '/access-instructions' },
    { name: 'Contacts', path: '/contacts' },
  ];

  return (
    <nav className="relative z-50 bg-transparent text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative h-12 w-32 transition-transform group-hover:-translate-y-0.5">
              <Image
                src="/fdm-logo.png"
                alt="FDM Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-semibold leading-tight tracking-tight">
                Data Solution Portal
              </span>
              <span className="text-sm text-white text-opacity-80">
                Financial Data Management Platform
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-1 rounded-full px-2 py-1 bg-white/10 border border-white/15">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-white text-[#1f3a68] shadow-sm'
                        : 'text-white/90 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <a
              href="mailto:fdm-team@company.com"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#1f3a68] font-semibold text-sm shadow-lg shadow-[#1f3a68]/30 hover:shadow-xl transition-shadow"
            >
              <span>Contact FDM Team</span>
            </a>

            <button
              type="button"
              className="inline-flex lg:hidden items-center justify-center w-11 h-11 rounded-full border border-white/40 text-white hover:bg-white/15 transition-colors"
            >
              <span className="sr-only">Open navigation</span>
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

