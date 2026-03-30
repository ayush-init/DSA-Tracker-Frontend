"use client";

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Check if current page is a login page
  const isLoginPage = pathname.includes('/login') || pathname.includes('/signin');
  
  // Don't show footer on login pages
  if (isLoginPage) {
    return null;
  }
  
  return <Footer />;
}
