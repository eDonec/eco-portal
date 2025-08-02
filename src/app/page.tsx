import ThemeToggle from "@/components/layout/ThemeToggle";
import FormExample from "@/containers/forms/FormExample";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
            XState Examples with Next.js
          </h1>
          <ThemeToggle />
        </div>

        {/* Multi-Step Form Machine Example */}
        <FormExample />
      </div>
    </div>
  );
}
