import { notFound } from 'next/navigation';
import { getComponentData, getAllComponentSlugs } from '@/lib/component-data';
import { PropsTable } from '@/components/docs/PropsTable';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { DosDonts } from '@/components/docs/DosDonts';
import { TabGroup } from '@/components/docs/TabGroup';

interface PageProps {
  params: Promise<{ category: string; component: string }>;
}

export async function generateStaticParams() {
  return getAllComponentSlugs();
}

export async function generateMetadata({ params }: PageProps) {
  const { component } = await params;
  const data = getComponentData(component);
  return { title: data?.name ?? component };
}

export default async function ComponentPage({ params }: PageProps) {
  const { component } = await params;
  const data = getComponentData(component);

  if (!data) notFound();

  const designTab = (
    <div>
      <h2 id="overview" className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Overview
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{data.description}</p>

      <h2 id="guidelines" className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Guidelines
      </h2>
      <DosDonts dos={data.dos} donts={data.donts} />
    </div>
  );

  const rnTab = (
    <div>
      <h2 id="import" className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Import
      </h2>
      <await CodeBlock code={data.importPath} language="tsx" />

      <h2 id="props" className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Props
      </h2>
      <PropsTable props={data.props} />

      <h2 id="usage" className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Usage
      </h2>
      <await CodeBlock code={data.usage} language="tsx" title="Example" />
    </div>
  );

  return (
    <article>
      <div className="mb-2">
        <span className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium">
          {data.category}
        </span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{data.name}</h1>

      <TabGroup
        tabs={[
          { label: 'Design', content: designTab },
          { label: 'React Native', content: rnTab },
        ]}
      />
    </article>
  );
}
