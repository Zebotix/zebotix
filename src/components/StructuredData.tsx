import { ScriptHTMLAttributes } from 'react';

interface StructuredDataProps extends ScriptHTMLAttributes<HTMLScriptElement> {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function StructuredData({ data, ...props }: StructuredDataProps) {
  return (
    <script
      {...props}
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
