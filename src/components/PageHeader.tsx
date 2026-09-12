export function PageHeader({ title, kicker, action }: { title: string; kicker: string; action?: React.ReactNode }) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-1 text-sm font-semibold uppercase tracking-[0.18em] text-teal">{kicker}</p>
        <h1 className="font-display text-4xl font-bold text-ink md:text-5xl">{title}</h1>
      </div>
      {action}
    </header>
  );
}
