import { Check, X } from 'lucide-react';

interface DosDontsProps {
  dos: string[];
  donts: string[];
}

export function DosDonts({ dos, donts }: DosDontsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="rounded-lg border-2 border-green-200 dark:border-green-800 overflow-hidden">
        <div className="bg-green-50 dark:bg-green-950/50 px-4 py-2 flex items-center gap-2">
          <Check size={16} className="text-green-600 dark:text-green-400" />
          <span className="text-sm font-semibold text-green-700 dark:text-green-300">Do</span>
        </div>
        <ul className="p-4 space-y-2">
          {dos.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Check size={14} className="text-green-500 mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border-2 border-red-200 dark:border-red-800 overflow-hidden">
        <div className="bg-red-50 dark:bg-red-950/50 px-4 py-2 flex items-center gap-2">
          <X size={16} className="text-red-600 dark:text-red-400" />
          <span className="text-sm font-semibold text-red-700 dark:text-red-300">Don&apos;t</span>
        </div>
        <ul className="p-4 space-y-2">
          {donts.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <X size={14} className="text-red-500 mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
