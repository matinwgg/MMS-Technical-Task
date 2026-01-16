export default function DashboardCard({ title, children, right }) {
  return (
    <div className="bg-white rounded-xl border p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        {right}
      </div>
      {children}
    </div>
  );
}
