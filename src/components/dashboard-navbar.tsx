'use client'

import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '../../supabase/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { UserCircle, Home, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardNavbar() {
  const supabase = createClient()
  const router = useRouter()

  return (
    <nav className="w-full border-b border-[#E4E7EB] bg-white py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/" prefetch>
            <Image
              src="/logo.png"
              alt="Global Film Institute"
              width={140}
              height={50}
              className="h-12 w-auto"
            />
          </Link>
          <div className="hidden sm:flex items-center gap-1 text-sm text-[#5F6B7A]">
            <span>/</span>
            <span className="text-navy font-medium">Admin Dashboard</span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/">
            <Button variant="outline" size="sm" className="border-navy text-navy hover:bg-navy hover:text-white">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-navy" suppressHydrationWarning>
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={async () => {
                await supabase.auth.signOut()
                router.push('/')
                router.refresh()
              }} className="cursor-pointer">
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
