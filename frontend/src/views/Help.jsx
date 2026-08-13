export default function Help() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Trợ giúp</h1>
        <p className="mt-2 text-sm text-slate-500">Các hướng dẫn nhanh để sử dụng MXHKNCD.</p>
      </div>
      <div className="grid gap-4">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <h2 className="font-semibold text-slate-900">Bình luận & Trả lời</h2>
          <p className="mt-2 text-sm text-slate-600">Nhấp vào Bình luận để mở khung bình luận. Bạn có thể trả lời hoặc sửa bình luận trực tiếp.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <h2 className="font-semibold text-slate-900">Chia sẻ bài viết</h2>
          <p className="mt-2 text-sm text-slate-600">Sử dụng nút Chia sẻ và chọn cách chia sẻ: Trang cá nhân, cộng đồng, tin nhắn hoặc sao chép liên kết.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <h2 className="font-semibold text-slate-900">Lưu bài viết</h2>
          <p className="mt-2 text-sm text-slate-600">Nhấn Lưu trên bài viết để lưu vào trang Đã lưu, xem lại sau.</p>
        </div>
      </div>
    </div>
  );
}
