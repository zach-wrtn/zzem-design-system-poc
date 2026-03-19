export const metadata = { title: 'Elevation' };

const elevations = [
  { level: 0, shadow: 'none', description: 'Flat surface' },
  { level: 1, shadow: '0 1px 3px rgba(0,0,0,0.1)', description: 'Card, subtle raised element' },
  { level: 2, shadow: '0 4px 6px rgba(0,0,0,0.1)', description: 'Dropdown, popover' },
  { level: 3, shadow: '0 10px 15px rgba(0,0,0,0.1)', description: 'Dialog, bottom sheet' },
  { level: 4, shadow: '0 20px 25px rgba(0,0,0,0.15)', description: 'Modal overlay' },
];

export default function ElevationPage() {
  return (
    <article>
      <h1 id="elevation" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Elevation</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        깊이와 계층을 표현하는 그림자 레벨입니다.
      </p>

      <h2 id="levels" className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Shadow Levels
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {elevations.map((e) => (
          <div
            key={e.level}
            className="rounded-xl bg-white dark:bg-gray-900 p-6 border border-gray-100 dark:border-gray-800"
            style={{ boxShadow: e.shadow }}
          >
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Level {e.level}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{e.description}</p>
            <p className="text-xs font-mono text-gray-400 dark:text-gray-500">{e.shadow}</p>
          </div>
        ))}
      </div>

      <h2 id="platform" className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Platform Notes
      </h2>
      <div className="overflow-x-auto mb-8 rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <th className="text-left px-4 py-2.5 font-semibold text-gray-900 dark:text-white">Platform</th>
              <th className="text-left px-4 py-2.5 font-semibold text-gray-900 dark:text-white">Implementation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">iOS</td>
              <td className="px-4 py-2.5 font-mono text-xs text-gray-600 dark:text-gray-400">shadowColor, shadowOffset, shadowOpacity, shadowRadius</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">Android</td>
              <td className="px-4 py-2.5 font-mono text-xs text-gray-600 dark:text-gray-400">elevation (number)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  );
}
