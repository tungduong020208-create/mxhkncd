import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <Link href="/" className="flex items-center gap-3 text-xl font-semibold text-slate-900">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500 text-white">M</span>
            <span className="hidden sm:inline">MXHKNCD</span>
          </Link>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="🔍 Tìm kiếm..."
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-50 text-lg text-slate-700 hover:bg-slate-100"
            title="Trang chủ"
          >
            🏠
          </Link>
          <Link
            href="/messages"
            className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-50 text-lg text-slate-700 hover:bg-slate-100"
            title="Tin nhắn"
          >
            💬
          </Link>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-50 text-lg text-slate-700 hover:bg-slate-100"
            title="Thông báo"
          >
            🔔
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-600 text-lg text-white shadow-sm"
              title="Menu tài khoản"
            >
              👤
            </button>
            {menuOpen ? (
              <div className="absolute right-0 mt-2 w-56 rounded-3xl border border-slate-200 bg-white p-3 shadow-lg">
                <Link href="/profile" className="block rounded-2xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">Trang cá nhân</Link>
                <Link href="/saved" className="block rounded-2xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">Đã lưu</Link>
                <Link href="/settings" className="block rounded-2xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">Cài đặt</Link>
                <Link href="/help" className="block rounded-2xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">Trợ giúp</Link>
                <button onClick={logout} className="mt-2 w-full rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200">
                  Đăng xuất
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
