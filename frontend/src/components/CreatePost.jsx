import PostStatus from './PostStatus';

export default function CreatePost({ content, onContentChange, type, onTypeChange, progress, onProgressChange, onSubmit }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-3xl bg-indigo-600 text-white flex items-center justify-center text-xl">U</div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900">Bạn đang nghĩ gì?</p>
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Viết một bài đăng, chia sẻ cảm xúc hoặc hỏi một câu hỏi..."
            className="mt-3 w-full min-h-[120px] rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          <button type="button" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">
            📷 Ảnh
          </button>
          <button type="button" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">
            🎥 Video
          </button>
          <button type="button" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">
            😀 Emoji
          </button>
          <button type="button" className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">
            📍 Địa điểm
          </button>
        </div>
        <button type="button" onClick={onSubmit} className="rounded-3xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
          Đăng bài
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2">#Hashtag</span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2">Quyền riêng tư</span>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span>Chọn quyền riêng tư:</span>
          <span className="rounded-full bg-slate-100 px-3 py-2">Công khai</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onTypeChange('text')}
            className={`rounded-3xl px-4 py-3 text-sm font-medium ${
              type === 'text' ? 'bg-indigo-600 text-white' : 'border border-slate-200 bg-slate-50 text-slate-700'
            }`}
          >
            Bài viết
          </button>
          <button
            type="button"
            onClick={() => onTypeChange('progress')}
            className={`rounded-3xl px-4 py-3 text-sm font-medium ${
              type === 'progress' ? 'bg-indigo-600 text-white' : 'border border-slate-200 bg-slate-50 text-slate-700'
            }`}
          >
            Progress Status
          </button>
        </div>
      </div>

      {type === 'progress' && (
        <div className="mt-4">
          <PostStatus value={progress} onChange={(e) => onProgressChange(Number(e.target.value))} />
        </div>
      )}
    </div>
  );
}
