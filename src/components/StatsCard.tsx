interface StatsCardProps {
  icon: string;
  label: string;
  value: string | number;
  color?: string;
  delay?: number;
}

export default function StatsCard({ icon, label, value, color = "text-primary", delay = 0 }: StatsCardProps) {
  return (
    <div
      className="glass animate-fade-in rounded-xl p-5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-lg bg-muted ${color}`}>
          <i className={`fa-solid ${icon} text-lg`} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="font-display text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}
