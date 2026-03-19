import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Layers, Cpu, Puzzle } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-24 px-6 text-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium mb-6">
              v0.1.0
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              ZZEM Design System
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              AI Agent와 사람이 함께 운용하는 React Native 디자인 시스템.<br />
              24개 컴포넌트, Design Tokens, MCP Server 내장.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/docs/getting-started"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/docs/components"
                className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 transition-colors"
              >
                Components
              </Link>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Design Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Cpu size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Machine-Readable</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  MCP Server를 통해 AI Agent가 컴포넌트와 토큰을 직접 조회하고 검증합니다.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Layers size={24} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Single Source of Truth</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Design Tokens이 유일한 진실의 원천. 하드코딩 없이 일관된 디자인을 보장합니다.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Puzzle size={24} className="text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Composable</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Primitive → Input → Display → Feedback 레이어로 조합하여 복잡한 UI를 구성합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick install */}
        <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Install</h2>
            <div className="bg-gray-950 text-gray-100 rounded-lg p-4 text-left font-mono text-sm">
              <span className="text-gray-500">$</span> pnpm add @zzem-design-system/components @zzem-design-system/engine @zzem-design-system/tokens
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
