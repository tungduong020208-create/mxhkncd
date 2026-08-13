import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Trang chủ', path: '/', icon: '🏠' },
  { label: 'Khám phá', path: '/explore', icon: '🔍' },
  { label: 'Cộng đồng', path: '/community', icon: '🏘️' },
  { label: 'Tin nhắn', path: '/messages', icon: '💬' },
  { label: 'Thông báo', path: '/notifications', icon: '🔔' },
  { label: 'Đã lưu', path: '/saved', icon: '🔖' },
  { label: 'Cài đặt', path: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="hidden md:block md:w-24 lg:w-80 shrink-0">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
        <div className="rounded-3xl bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-3xl bg-indigo-600 text-xl text-white flex items-center justify-center">{user?.name?.[0] || 'U'}</div>
            <div>
              <p className="font-semibold text-slate-900">{user?.name || 'Người dùng'}</p>
              <p className="text-sm text-slate-500">@{user?.name?.toLowerCase().replace(/\s+/g, '') || 'user'}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600">
            <p>⭐ 125 điểm</p>
            <p>👥 248 kết nối</p>
          </div>
          <button className="mt-4 w-full rounded-3xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
            Xem trang cá nhân
          </button>
        </div>

        <div className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
}
