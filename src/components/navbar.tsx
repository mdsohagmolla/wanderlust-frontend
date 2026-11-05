"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUserRound, Menu, X } from "lucide-react";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: '/add-destination', label: "Add destination" },
  { href: "/my-bookings", label: "My Bookings" },

];

const accountLinks = [
  { href: "/profile", label: "Profile" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Sign Up" },
];

export function Navbar() {

  // use session:

  const { data: session } = authClient.useSession()
  const user = session?.user
  

// signout function:

const handleSignOut =()=>{
  authClient.signOut();
  
}


  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-40 border-b border-border bg-background">
      <div className="relative mx-auto flex h-16 max-w-360 items-center justify-between px-4 md:px-6">
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex items-center text-sm font-medium transition-colors hover:text-brand",
                  isActive
                    ? "border-b-2 border-brand text-brand"
                    : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Spacer keeps the mobile menu button on the right; logo is centered absolutely. */}
        <div className="w-9 lg:hidden" aria-hidden="true" />

        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            priority
            className="h-6 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-brand"
          >
            <CircleUserRound className="size-4" aria-hidden="true" />
            Profile
          </Link>

          {/* avatar */}
          {/* <Avatar>
            <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar> */}

          {/* popup */}

          {/* conditional rendering */}
          {
            user?<Popover>
            <PopoverTrigger render={<button type="button">
              <Avatar>
              <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            </button>}>

            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>{user?.name}</PopoverTitle>
                <PopoverDescription>
                  {user?.email}<br></br>
                  <Button className='my-1' onClick={handleSignOut} variant={'destructive'}>SignOut</Button>
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>:<>
           <Link
            href="/login"
            className="text-sm font-medium transition-colors hover:text-brand"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium transition-colors hover:text-brand"
          >
            Sign Up
          </Link>
          </>
          }
          

         
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex size-9 items-center justify-center text-foreground transition-colors hover:text-brand lg:hidden"
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open && (
        <nav className="absolute inset-x-0 top-16 border-b border-border bg-background px-4 py-1 shadow-lg lg:hidden">
          {[...navLinks, ...accountLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center border-b border-border/60 py-3 text-sm font-medium last:border-b-0",
                pathname === link.href ? "text-brand" : "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
