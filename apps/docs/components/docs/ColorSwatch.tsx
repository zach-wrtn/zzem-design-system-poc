interface ColorSwatchProps {
  name: string;
  value: string;
  token: string;
}

export function ColorSwatch({ name, value, token }: ColorSwatchProps) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="h-16 w-full" style={{ backgroundColor: value }} />
      <div className="p-3 space-y-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{name}</p>
        <p className="text-xs font-mono text-gray-500 dark:text-gray-400">{value}</p>
        <p className="text-xs font-mono text-gray-400 dark:text-gray-500">{token}</p>
      </div>
    </div>
  );
}
