interface PropDef {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  props: PropDef[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-x-auto mb-8 rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/50">
            <th className="text-left px-4 py-2.5 font-semibold text-gray-900 dark:text-white">Prop</th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-900 dark:text-white">Type</th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-900 dark:text-white">Default</th>
            <th className="text-left px-4 py-2.5 font-semibold text-gray-900 dark:text-white">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {props.map((prop) => (
            <tr key={prop.name}>
              <td className="px-4 py-2.5 font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap">
                {prop.name}
                {prop.required && <span className="text-red-500 ml-0.5">*</span>}
              </td>
              <td className="px-4 py-2.5 font-mono text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {prop.type}
              </td>
              <td className="px-4 py-2.5 font-mono text-xs text-gray-500 dark:text-gray-500">
                {prop.default ?? '-'}
              </td>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
