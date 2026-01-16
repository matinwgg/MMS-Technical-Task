export default function RecentActivity({ activities }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Recent Activity</h3>

      <ul className="space-y-2 text-sm">
        {activities.map((a, i) => (
          <li key={i} className="text-gray-600 dark:text-gray-300">
            • {a}
          </li>
        ))}
      </ul>
    </div>
  );
}
