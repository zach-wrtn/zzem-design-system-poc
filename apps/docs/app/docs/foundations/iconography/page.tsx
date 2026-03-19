export const metadata = { title: 'Iconography' };

export default function IconographyPage() {
  return (
    <article>
      <h1 id="iconography" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Iconography</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        ZZEM Design System의 아이콘 가이드라인입니다.
      </p>

      <h2 id="principles" className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Icon Principles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Consistency</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">모든 아이콘은 동일한 그리드(24x24)와 스트로크 두께(1.5px)를 사용합니다.</p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Accessibility</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">아이콘만 사용할 때는 반드시 accessibilityLabel을 제공해야 합니다.</p>
        </div>
      </div>

      <h2 id="sizes" className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Sizes
      </h2>
      <div className="overflow-x-auto mb-8 rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <th className="text-left px-4 py-2.5 font-semibold text-gray-900 dark:text-white">Size</th>
              <th className="text-left px-4 py-2.5 font-semibold text-gray-900 dark:text-white">Pixels</th>
              <th className="text-left px-4 py-2.5 font-semibold text-gray-900 dark:text-white">Usage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            <tr>
              <td className="px-4 py-2.5 font-mono text-blue-600 dark:text-blue-400">sm</td>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">16px</td>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">Inline with small text</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-blue-600 dark:text-blue-400">md</td>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">20px</td>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">Default icon size</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-blue-600 dark:text-blue-400">lg</td>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">24px</td>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">Navigation, headers</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-blue-600 dark:text-blue-400">xl</td>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">32px</td>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">Empty states, illustrations</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="usage" className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Usage with IconButton
      </h2>
      <div className="bg-gray-950 text-gray-100 rounded-lg p-4 mb-4 overflow-x-auto text-sm font-mono">
        {`<IconButton\n  icon={<SearchIcon />}\n  accessibilityLabel="Search"\n  onPress={handleSearch}\n/>`}
      </div>
    </article>
  );
}
