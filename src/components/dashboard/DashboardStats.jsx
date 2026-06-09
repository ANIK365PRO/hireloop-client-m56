import StatCard from "./StatCard";


export default function DashboardStats({ recruiterStats }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {recruiterStats.map((item) => (
        <StatCard
          key={item.title}
          title={item?.title}
          value={item?.value}
          icon={item?.icon}
          description={item?.description}
        />
      ))}
    </div>
  );
}