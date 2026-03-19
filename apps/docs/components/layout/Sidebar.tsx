'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { navigation, type NavSection } from '@/lib/navigation';

function SidebarSection({ section }: { section: NavSection }) {
  const pathname = usePathname();
  const isAnyActive = section.items.some((item) => pathname === item.href);
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="mb-2">
      <button
        className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        onClick={() => setOpen(!open)}
      >
        {section.title}
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? 'rotate-0' : '-rotate-90'}`}
        />
      </button>
      {open && (
        <ul className="mt-0.5 space-y-0.5">
          {section.items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                    isActive
                      ? 'sidebar-link-active'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden md:block w-60 shrink-0 border-r border-gray-200 dark:border-gray-800 overflow-y-auto h-[calc(100vh-4rem)] sticky top-16 py-4 px-2">
      {navigation.map((section) => (
        <SidebarSection key={section.title} section={section} />
      ))}
    </aside>
  );
}
