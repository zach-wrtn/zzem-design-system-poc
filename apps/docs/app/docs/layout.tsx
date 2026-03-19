import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { TableOfContents } from '@/components/layout/TableOfContents';
import { Footer } from '@/components/layout/Footer';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="max-w-[1600px] mx-auto flex">
        <Sidebar />
        <main className="flex-1 min-w-0 px-6 lg:px-12 py-8">
          <div className="max-w-3xl">
            {children}
          </div>
        </main>
        <TableOfContents />
      </div>
      <Footer />
    </>
  );
}
