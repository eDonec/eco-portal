export default function Loader({ label = "Chargement…" }: { label?: string }) {
  return (
    <div className="w-full py-12 flex items-center justify-center">
      <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
        <svg
          className="animate-spin h-5 w-5 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
  <span className="text-base font-medium">{label}</span>
      </div>
    </div>
  );
}
