export default function OnlineUsers() {
  const users = ['Trần Minh Hoàng', 'Lê Thị Bích Ngọc', 'Phạm Văn Nam', 'Nguyễn Hoàng Anh', 'Đỗ Thùy Linh'];
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Online</h3>
        <span className="text-sm text-slate-500">{users.length} online</span>
      </div>
      <div className="mt-4 space-y-3">
        {users.map((user) => (
          <div key={user} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-3">
            <div className="h-10 w-10 rounded-full bg-slate-200" />
            <div>
              <p className="text-sm font-medium text-slate-900">{user}</p>
              <p className="text-xs text-emerald-600">Online</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
