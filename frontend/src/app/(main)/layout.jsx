'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import RightPanel from '../../components/RightPanel';

function ProtectedGate({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace('/login');
  }, [user, router]);

  if (!user) return null;
  return children;
}

export default function MainLayout({ children }) {
  const [focusMode, setFocusMode] = useState(false);

  return (
    <ProtectedGate>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar focusMode={focusMode} onToggleFocus={() => setFocusMode((prev) => !prev)} />
        <main
          className={`mx-auto w-full max-w-[1400px] px-4 py-6 ${focusMode ? 'grid' : 'grid gap-6 lg:grid-cols-[240px_1fr_320px]'}`}
        >
          {!focusMode && <Sidebar />}
          <div className="flex-1">{children}</div>
          {!focusMode && <RightPanel />}
        </main>
      </div>
    </ProtectedGate>
  );
}
