import ThemeToggle from "@/components/layout/ThemeToggle";
import DecisionTreeExample from "@/containers/forms/DecisionTreeExample";
import FormExample from "@/containers/forms/FormExample";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
            XState Examples with Next.js
          </h1>
          <ThemeToggle />
        </div>

        <div className="space-y-12">
          {/* Multi-Step Form Machine Example */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Multi-Step Form State Machine
            </h2>
            <FormExample />
          </section>

          {/* Decision Tree State Machine Example */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Decision Tree State Machine
            </h2>
            <DecisionTreeExample />
          </section>
        </div>
      </div>
    </div>
  );
}
