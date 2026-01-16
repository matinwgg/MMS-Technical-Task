export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="mb-4 text-sm text-red-700 bg-red-100 border border-red-300 p-3 rounded">
      {message}
    </div>
  );
}
