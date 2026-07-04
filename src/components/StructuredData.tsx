import { type ScriptHTMLAttributes } from 'react';

type StructuredDataProps = Readonly<
  ScriptHTMLAttributes<HTMLScriptElement> & {
    data: Record<string, unknown> | Record<string, unknown>[];
  }
>;

export default function StructuredData({ data, ...props }: StructuredDataProps) {
  const json = JSON.stringify(data).replaceAll('<', String.raw`\u003c`);

  return (
    <script {...props} type='application/ld+json' dangerouslySetInnerHTML={{ __html: json }} />
  );
}
