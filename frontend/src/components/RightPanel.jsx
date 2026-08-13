import CommunityCard from './CommunityCard';
import OnlineUsers from './OnlineUsers';

const events = [
  { id: 1, title: 'Workshop React', date: '20/08/2026', time: '19:00' },
  { id: 2, title: 'AI Talk', date: '25/08/2026', time: '14:00' },
];

const notifications = [
  { id: 1, text: '❤️ Nguyễn A thích bài viết của bạn.' },
  { id: 2, text: '💬 Trần B đã bình luận.' },
  { id: 3, text: '👥 Lê C muốn kết nối.' },
  { id: 4, text: '🏆 Bạn nhận được huy hiệu mới.' },
];

const trendingTags = ['#AI', '#React', '#JavaScript', '#Gaming', '#UIUX'];

export default function RightPanel() {
  return (
    <aside className="hidden lg:block w-[320px] shrink-0">
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Thông báo nhanh</p>
              <p className="mt-1 text-sm text-slate-500">Cập nhật mới nhất từ MXHKNCD.</p>
            </div>
            <span className="text-xs text-slate-500">Mới</span>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            {notifications.map((item) => (
              <div key={item.id} className="rounded-3xl bg-slate-50 px-4 py-3">
                {item.text}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Sự kiện sắp diễn ra</p>
              <p className="mt-1 text-sm text-slate-500">Tham gia sự kiện phù hợp với bạn.</p>
            </div>
            <button className="rounded-full bg-slate-100 px-3 py-2 text-xs text-slate-700 hover:bg-slate-200">Xem tất cả</button>
          </div>
          <div className="mt-4 space-y-3">
            {events.map((event) => (
              <div key={event.id} className="rounded-3xl bg-slate-50 px-4 py-3">
                <h4 className="font-semibold text-slate-900">{event.title}</h4>
                <p className="mt-2 text-sm text-slate-500">{event.date} · {event.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Đang được quan tâm</p>
              <p className="mt-1 text-sm text-slate-500">Chủ đề nổi bật hiện tại.</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
              <button key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Bạn bè online</p>
              <p className="mt-1 text-sm text-slate-500">Những người đang hoạt động gần đây.</p>
            </div>
            <span className="text-xs text-slate-500">Online</span>
          </div>
          <div className="mt-5">
            <OnlineUsers />
          </div>
        </div>
      </div>
    </aside>
  );
}
