import { ColorSwatch } from '@/components/docs/ColorSwatch';
import { TabGroup } from '@/components/docs/TabGroup';
import { primitiveColors, semanticColors } from '@/lib/tokens';

export const metadata = { title: 'Color' };

export default function ColorPage() {
  const semanticTab = (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
      {semanticColors.map((color) => (
        <ColorSwatch
          key={color.token}
          name={color.name}
          value={color.value}
          token={color.token}
        />
      ))}
    </div>
  );

  const primitiveTab = (
    <div className="space-y-8 mt-4">
      {Object.entries(primitiveColors).map(([name, scales]) => (
        <div key={name}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 capitalize">{name}</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1">
            {scales.map((s) => (
              <div key={s.scale} className="text-center">
                <div className="h-10 rounded-md mb-1" style={{ backgroundColor: s.value }} />
                <p className="text-[10px] text-gray-500 dark:text-gray-400">{s.scale}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <article>
      <h1 id="color" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Color</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        ZZEM Design System의 색상 체계. Semantic 토큰과 Primitive 토큰의 2-tier 구조로 관리됩니다.
      </p>
      <TabGroup
        tabs={[
          { label: 'Semantic', content: semanticTab },
          { label: 'Primitive', content: primitiveTab },
        ]}
      />
    </article>
  );
}
