import Footer from '@/components/footer';
import Header from '@/components/header';
import AuthLayout from '@/layout/auth-layout';
import React from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthLayout>
      <div className="h-screen w-full grid grid-rows-[auto_auto_auto] grid-cols-1">
        <Header />
        <main className="flex flex-col items-center justify-center px-6 py-4 md:py-10 md:px-screen size-full">
          {children}
        </main>
        <Footer />
      </div>
    </AuthLayout>
  )
}