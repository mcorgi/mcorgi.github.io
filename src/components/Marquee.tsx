type Props = {
  items: string[];
  className?: string;
};

export default function Marquee({ items, className = "" }: Props) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`border-y border-line overflow-hidden bg-cream-2 ${className}`}
    >
      <div className="marquee-track py-2.5 font-display text-sm uppercase tracking-widest">
        {doubled.map((it, i) => (
          <span key={i} className="px-6 flex items-center gap-6 shrink-0">
            <span>{it}</span>
            <span aria-hidden className={i % 2 ? "text-pink" : "text-accent"}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
