import Link from 'next/link';

interface ComponentCardProps {
  name: string;
  description: string;
  href: string;
  category: string;
}

export function ComponentCard({ name, description, href, category }: ComponentCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-md"
    >
      <div className="h-32 bg-gray-50 dark:bg-gray-800/50 rounded-t-xl flex items-center justify-center">
        <div className="w-24 h-10 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <span className="text-xs font-mono text-blue-600 dark:text-blue-400">&lt;{name} /&gt;</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {name}
          </h3>
          <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium">
            {category}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}
