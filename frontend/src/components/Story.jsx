export default function Story({ title }) {
  return (
    <div className="flex h-36 w-24 flex-col items-center justify-end gap-2 rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-slate-900 p-3 text-white shadow-lg">
      <div className="h-12 w-full rounded-2xl bg-slate-900/40" />
      <p className="text-sm font-semibold">{title}</p>
    </div>
  );
}
