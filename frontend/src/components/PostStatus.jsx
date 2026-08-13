export default function PostStatus({ value, onChange }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <label className="text-sm font-medium text-slate-900">Progress Status</label>
      <div className="mt-3 flex items-center gap-3">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={onChange}
          className="h-2 w-full cursor-pointer accent-indigo-600"
        />
        <span className="min-w-[42px] text-right text-sm font-semibold text-slate-900">{value}%</span>
      </div>
    </div>
  );
}
