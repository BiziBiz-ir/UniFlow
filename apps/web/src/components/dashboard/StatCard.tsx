import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">

      <div className="flex justify-between items-center mb-5">

        <p className="text-slate-400 text-sm">
          {title}
        </p>

        <Icon className="text-indigo-400" size={21} />

      </div>

      <h3 className="text-3xl font-bold text-white mb-2">
        {value}
      </h3>

      <p className="text-xs text-slate-400">
        {description}
      </p>

    </div>
  );
}