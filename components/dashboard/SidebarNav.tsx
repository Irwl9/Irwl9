"use client";

import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "لوحة التحكم",
    href: "/dashboard",
    exact: true,
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    label: "المشاريع",
    href: "/dashboard/projects",
    exact: false,
    icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
  },
  {
    label: "المهام",
    href: "/dashboard/tasks",
    exact: false,
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
];

export default function SidebarNav() {
  const pathname = usePathname();

  function isActive(item: (typeof navItems)[0]) {
    if (item.exact) return pathname === item.href;
    return pathname === item.href || pathname.startsWith(item.href + "/");
  }

  return (
    <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="التنقل الجانبي">
      {navItems.map((item) => {
        const active = isActive(item);
        return (
          <a
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-clay font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary ${
              active
                ? "bg-[#D6EFE4] text-clay-primary"
                : "text-clay-muted hover:bg-[#EEF7F2] hover:text-clay-text"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d={item.icon} />
            </svg>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
