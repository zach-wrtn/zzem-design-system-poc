import { CodeBlock } from '@/components/docs/CodeBlock';

export const metadata = { title: 'Getting Started' };

export default async function GettingStartedPage() {
  return (
    <article>
      <h1 id="introduction" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Getting Started
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        ZZEM Design System은 AI Agent와 사람이 함께 운용하는 React Native 디자인 시스템입니다.
        Design Tokens 기반의 일관된 UI를 빠르게 구축할 수 있습니다.
      </p>

      <h2 id="installation" className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Installation
      </h2>
      <await CodeBlock
        code="pnpm add @zzem-design-system/components @zzem-design-system/engine @zzem-design-system/tokens"
        language="bash"
        title="Terminal"
      />

      <h2 id="setup" className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Provider Setup
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        앱의 루트에 <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400">ZDSProvider</code>를 감싸세요.
      </p>
      <await CodeBlock
        code={`import { ZDSProvider } from '@zzem-design-system/engine';

export default function App() {
  return (
    <ZDSProvider mode="light">
      <YourApp />
    </ZDSProvider>
  );
}`}
        language="tsx"
        title="App.tsx"
      />

      <h2 id="first-component" className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        First Component
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        이제 컴포넌트를 사용할 준비가 되었습니다.
      </p>
      <await CodeBlock
        code={`import { Button, Text, VStack } from '@zzem-design-system/components';

function WelcomeScreen() {
  return (
    <VStack gap={16} align="center">
      <Text variant="heading-lg">Welcome to ZZEM</Text>
      <Button onPress={() => console.log('pressed')}>
        Get Started
      </Button>
    </VStack>
  );
}`}
        language="tsx"
        title="WelcomeScreen.tsx"
      />

      <h2 id="principles" className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Design Principles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Machine-Readable</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">MCP Server를 통해 AI Agent가 컴포넌트와 토큰을 직접 조회하고 검증합니다.</p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Single Source of Truth</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Design Tokens이 유일한 진실의 원천. 하드코딩 없이 일관된 디자인을 보장합니다.</p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Composable</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">레이어 구조로 조합하여 복잡한 UI를 구성합니다.</p>
        </div>
      </div>

      <h2 id="packages" className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        Packages
      </h2>
      <div className="overflow-x-auto mb-8 rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <th className="text-left px-4 py-2.5 font-semibold text-gray-900 dark:text-white">Package</th>
              <th className="text-left px-4 py-2.5 font-semibold text-gray-900 dark:text-white">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            <tr>
              <td className="px-4 py-2.5 font-mono text-blue-600 dark:text-blue-400">@zzem-design-system/tokens</td>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">Design Tokens (SSOT)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-blue-600 dark:text-blue-400">@zzem-design-system/engine</td>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">Styling engine, ThemeProvider</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-blue-600 dark:text-blue-400">@zzem-design-system/components</td>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">24 UI Components</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-blue-600 dark:text-blue-400">@zzem-design-system/mcp-server</td>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">MCP server for AI Agents</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  );
}
