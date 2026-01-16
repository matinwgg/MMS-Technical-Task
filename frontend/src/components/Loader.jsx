export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="text-blue-600 font-medium animate-pulse">
        {text}
      </div>
    </div>
  );
}
