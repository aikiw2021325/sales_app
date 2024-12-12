// app/nav-bar.tsx
'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`
        text-sm font-medium transition-colors
        ${isActive 
          ? "text-primary"
          : "text-muted-foreground hover:text-primary"
        }
      `}
    >
      {children}
    </Link>
  )
}

export function NavBar() {
  return (
    <div className="border-b">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold hover:opacity-90">
            SmartSales
          </Link>
          <nav className="flex items-center space-x-6">
            <NavLink href="/">ホーム</NavLink>
            <NavLink href="/reports">レポート一覧</NavLink>
            <NavLink href="/reports/create">レポート作成</NavLink>
          </nav>
        </div>
      </div>
    </div>
  )
}