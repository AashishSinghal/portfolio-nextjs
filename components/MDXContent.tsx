"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

interface MDXContentProps {
  code: string;
}

export default function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return (
    <div
      className="mdx-content max-w-none text-[var(--foreground-muted)] leading-relaxed [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-[var(--foreground)] [&_h1]:first:mt-0 [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[var(--foreground)] [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[var(--foreground)] [&_p]:mb-4 [&_a]:text-[var(--primary)] [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-[var(--primary-hover)] [&_strong]:text-[var(--foreground)] [&_code]:rounded [&_code]:bg-[var(--card)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-[var(--primary)] [&_hr]:my-8 [&_hr]:border-[var(--border-subtle)]"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* eslint-disable-next-line react-hooks/static-components -- MDX component from useMDXComponent(code) is intentional */}
      <Component />
    </div>
  );
}
