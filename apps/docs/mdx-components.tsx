import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900 dark:text-white">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-base leading-7 text-gray-600 dark:text-gray-300 mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-600 dark:text-gray-300">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1 text-gray-600 dark:text-gray-300">{children}</ol>
    ),
    code: ({ children, ...props }) => (
      <code className="bg-gray-100 dark:bg-gray-800 text-sm px-1.5 py-0.5 rounded font-mono text-pink-600 dark:text-pink-400" {...props}>{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-950 text-gray-100 rounded-lg p-4 mb-4 overflow-x-auto text-sm">{children}</pre>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800">{children}</td>
    ),
    ...components,
  };
}
