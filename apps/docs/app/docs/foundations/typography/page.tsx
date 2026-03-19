import { typographyScale } from '@/lib/tokens';

export const metadata = { title: 'Typography' };

export default function TypographyPage() {
  return (
    <article>
      <h1 id="typography" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Typography</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        11단계 타입 스케일로 일관된 타이포그래피를 제공합니다.
      </p>

      <h2 id="scale" className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Type Scale
      </h2>
      <div className="space-y-6 mb-8">
        {typographyScale.map((t) => (
          <div key={t.token} className="flex items-baseline gap-6 py-2 border-b border-gray-100 dark:border-gray-800">
            <div className="w-32 shrink-0">
              <p className="text-xs font-mono text-gray-500 dark:text-gray-400">{t.token}</p>
            </div>
            <p
              style={{ fontSize: t.fontSize, lineHeight: `${t.lineHeight}px`, fontWeight: t.weight as any }}
              className="text-gray-900 dark:text-white"
            >
              {t.name}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 ml-auto whitespace-nowrap">
              {t.fontSize}px / {t.lineHeight}px / {t.weight}
            </p>
          </div>
        ))}
      </div>

      <h2 id="usage" className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Usage
      </h2>
      <div className="bg-gray-950 text-gray-100 rounded-lg p-4 mb-4 overflow-x-auto text-sm font-mono">
        {`<Text variant="heading-lg">Title</Text>\n<Text variant="body-md">Body text</Text>\n<Text variant="caption">Small text</Text>`}
      </div>
    </article>
  );
}
