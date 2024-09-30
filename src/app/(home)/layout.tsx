import AuthLayout from '@/layout/auth-layout';
import React from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthLayout>
        <h1>Main Layout</h1>
        {children}
      </AuthLayout>
    </div>
  )
}