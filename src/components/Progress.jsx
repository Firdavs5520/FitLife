export function Progress({ value }) {
  return (
    <div className="w-full bg-gray-300 rounded-full h-2 dark:bg-gray-700">
      <div
        className="bg-gradient-to-r from-gray-900 to-gray-600 h-2 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
