"use client";

export default function StatCard({
  title,
  value,
  icon: Icon,
  description,
}) {
  return (
    <div className="rounded-xl border border-default bg-content1 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-default-100">
        {Icon && <Icon className="h-5 w-5" />}
      </div>

      <div className="space-y-1">
        <p className="text-sm text-default-500">
          {title}
        </p>

        <h3 className="text-3xl font-semibold">
          {value}
        </h3>

        {description && (
          <p className="text-xs text-default-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}