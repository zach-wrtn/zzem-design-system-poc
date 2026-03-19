import { spacingScale } from '@/lib/tokens';

export const metadata = { title: 'Spacing' };

export default function SpacingPage() {
  return (
    <article>
      <h1 id="spacing" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Spacing</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        일관된 간격을 위한 스페이싱 토큰 스케일입니다.
      </p>

      <h2 id="scale" className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Spacing Scale
      </h2>
      <div className="space-y-3 mb-8">
        {spacingScale.map((s) => (
          <div key={s.token} className="flex items-center gap-4">
            <span className="w-24 text-sm font-mono text-gray-500 dark:text-gray-400 shrink-0">{s.token}</span>
            <span className="w-12 text-sm text-gray-600 dark:text-gray-300 text-right shrink-0">{s.value}px</span>
            <div className="flex-1">
              <div
                className="h-4 bg-blue-500/20 dark:bg-blue-400/20 rounded"
                style={{ width: `${Math.max(s.value * 2, 2)}px` }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
