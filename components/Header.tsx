"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useData } from "@/service/data";

export const NAV_ITEMS = [
  { name: "Beranda", href: "#hero" },
  { name: "Tentang Kami", href: "#about" },
  { name: "Properti Kami", href: "#listings" },
  { name: "Testimoni", href: "#testimonials" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, isLoading } = useData();
  const pathname = usePathname();

  const onClick = (href: string) => {
    setIsMenuOpen(false);
    if (pathname !== "/") window.location.href = "/#hero";
    else {
      const querySelector = document.querySelector(href);
      if (querySelector) {
        querySelector.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (isLoading || !data) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={data?.logo?.logo || "/img/logo.png"}
              alt={data?.logo?.alt || "Logo"}
              width={48}
              height={48}
              className="h-10 w-10 lg:h-10 lg:w-24 object-contain object-center"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) =>
              pathname !== "/" ? (
                <Link href={`/${item.href}`} key={item.name}>
                  <button className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 focus-visible:focus cursor-pointer">
                    {item.name}
                  </button>
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => onClick(item.href)}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 focus-visible:focus cursor-pointer"
                >
                  {item.name}
                </button>
              )
            )}
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button
                variant="outline"
                className="border-primary-600 text-primary-600 hover:bg-primary-50 hover:border-primary-700 hover:text-primary-700 font-medium px-4 lg:px-6 focus-visible:focus"
                size="sm"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>

            <Link href={`https://wa.me/${data?.contact?.phone.replace(
              /-/g,
              ""
            )}`} target="_blank" prefetch={false}>
              <Button
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 lg:px-6 focus-visible:focus"
                size="sm"
              >
                Contact Us
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus-visible:focus"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <nav className="max-w-screen-xl mx-auto px-4 py-4 space-y-3">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {pathname !== "/" ? (
                    <Link href={`/${item.href}`}>
                      <button className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 focus-visible:focus cursor-pointer">
                        {item.name}
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => onClick(item.href)}
                      className="block py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 focus-visible:focus cursor-pointer"
                    >
                      {item.name}
                    </button>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.1 }}
              >
                <Link
                  href="/admin"
                  className="block py-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 focus-visible:focus"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4 inline mr-2" />
                  Login
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
