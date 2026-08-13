export default function FocusModeToggle({ enabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${enabled ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
    >
      {enabled ? 'Focus Mode: ON' : 'Focus Mode: OFF'}
    </button>
  );
}
