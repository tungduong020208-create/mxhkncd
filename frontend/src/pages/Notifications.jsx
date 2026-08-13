const notifications = [
  { id: 1, title: 'Nguyễn A thích bài viết của bạn.', time: '2 phút trước' },
  { id: 2, title: 'Trần B đã bình luận.', time: '10 phút trước' },
  { id: 3, title: 'Lê C muốn kết nối.', time: '30 phút trước' },
  { id: 4, title: 'Bạn nhận được huy hiệu mới.', time: '1 giờ trước' },
];

export default function Notifications() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Thông báo</h1>
        <p className="mt-2 text-sm text-slate-500">Các hoạt động mới nhất liên quan đến bạn.</p>
      </div>

      <div className="grid gap-4">
        {notifications.map((item) => (
          <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-900">{item.title}</p>
              <span className="text-xs text-slate-500">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
