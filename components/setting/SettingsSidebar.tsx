"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Mail, Bell, Monitor, Settings } from "lucide-react";

const menu = [
  { label: "My Profile", href: "/pofile", icon: User },
  { label: "Emails & Auth", href: "/settings/emails-auth", icon: Mail },
  { label: "Notifications", href: "/setting/notifications", icon: Bell },
  { label: "Active Sessions", href: "/setting/sessions", icon: Monitor },
  { label: "Settings", href: "/setting/preferences", icon: Settings },
];

export default function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white rounded-lg border p-4">
      <h2 className="text-sm font-semibold text-gray-500 mb-4">
        Account Settings
      </h2>

      <ul className="space-y-1">
        {menu.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                  isActive
                    ? "bg-gray-100 text-black font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
