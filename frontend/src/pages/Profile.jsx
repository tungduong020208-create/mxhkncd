import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-600 text-3xl font-semibold text-white">
              {user?.name?.[0] || 'U'}
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-900">{user?.name || 'Người dùng'}</p>
              <p className="mt-1 text-sm text-slate-500">@{user?.name?.toLowerCase().replace(/\s+/g, '') || 'user'}</p>
            </div>
          </div>
          <button className="rounded-3xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
            Chỉnh sửa hồ sơ
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">Thông tin nhanh</p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>⭐ 1.250 điểm</p>
            <p>👥 248 kết nối</p>
            <p>🏘️ 12 cộng đồng đã tham gia</p>
            <p>📝 34 bài viết đã đăng</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">Vai trò</p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>👑 Owner</p>
            <p>🛡️ Admin</p>
            <p>🔨 Moderator</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">Sở thích</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['React', 'AI', 'Web Development', 'UI/UX'].map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
