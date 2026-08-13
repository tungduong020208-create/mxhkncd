export default function CommunityCard({ title, members, subtitle, actionLabel = 'Tham gia', onAction }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : <p className="text-sm text-slate-500">Cộng đồng gợi ý</p>}
          <h3 className="mt-2 text-base font-semibold text-slate-900">{title}</h3>
        </div>
        <button
          type="button"
          onClick={onAction}
          className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          {actionLabel}
        </button>
      </div>
      <p className="mt-4 text-sm text-slate-500">{members.toLocaleString()} thành viên</p>
    </div>
  );
}
