import { ComponentCard } from '@/components/docs/ComponentCard';
import { componentsList } from '@/lib/tokens';

export const metadata = { title: 'Components' };

function getHref(comp: { name: string; category: string }) {
  const slug = comp.name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
  return `/docs/components/${comp.category}/${slug}`;
}

export default function ComponentsOverviewPage() {
  const categories = [...new Set(componentsList.map((c) => c.category))];

  return (
    <article>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Components</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
        24개의 React Native 컴포넌트. Design Tokens 기반으로 일관된 UI를 제공합니다.
      </p>

      {categories.map((cat) => (
        <section key={cat} className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 capitalize">{cat}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {componentsList
              .filter((c) => c.category === cat)
              .map((comp) => (
                <ComponentCard
                  key={comp.name}
                  name={comp.name}
                  description={comp.description}
                  href={getHref(comp)}
                  category={comp.category}
                />
              ))}
          </div>
        </section>
      ))}
    </article>
  );
}
