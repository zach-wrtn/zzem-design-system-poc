export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8 px-6">
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} ZZEM Design System</p>
        <div className="flex items-center gap-6">
          <a href="https://github.com" className="hover:text-gray-900 dark:hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://figma.com" className="hover:text-gray-900 dark:hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
            Figma
          </a>
        </div>
      </div>
    </footer>
  );
}
