import { BarChart3 } from 'lucide-react';

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md border border-dashed border-ink/20 bg-white/60 p-8 text-center">
      <BarChart3 className="mx-auto mb-3 text-teal" />
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate">{body}</p>
    </div>
  );
}
