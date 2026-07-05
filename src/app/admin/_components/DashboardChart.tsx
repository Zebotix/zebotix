"use client";

import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/Chart";

interface DashboardChartProps {
  readonly stats: {
    readonly blogs: number;
    readonly services: number;
    readonly products: number;
    readonly caseStudies: number;
    readonly testimonials: number;
    readonly media: number;
  };
}

export function DashboardChart({ stats }: DashboardChartProps) {
  const chartData = [
    { name: "Blogs", count: stats.blogs, fill: "var(--color-blogs)" },
    { name: "Services", count: stats.services, fill: "var(--color-services)" },
    { name: "Products", count: stats.products, fill: "var(--color-products)" },
    { name: "Case Studies", count: stats.caseStudies, fill: "var(--color-caseStudies)" },
    { name: "Testimonials", count: stats.testimonials, fill: "var(--color-testimonials)" },
    { name: "Media", count: stats.media, fill: "var(--color-media)" },
  ];

  const chartConfig = {
    count: {
      label: "Total Items",
    },
    blogs: {
      label: "Blogs",
      color: "hsl(var(--primary))",
    },
    services: {
      label: "Services",
      color: "oklch(0.627 0.265 150.369)", // nice fintech emerald
    },
    products: {
      label: "Products",
      color: "oklch(0.589 0.207 289.497)", // nice purple
    },
    caseStudies: {
      label: "Case Studies",
      color: "oklch(0.608 0.194 223.36)", // nice sky blue
    },
    testimonials: {
      label: "Testimonials",
      color: "oklch(0.769 0.188 70.08)", // nice amber
    },
    media: {
      label: "Media",
      color: "oklch(0.643 0.207 5.56)", // nice rose
    },
  };

  return (
    <Card className="glassmorphism border-border bg-card/65 dark:bg-card/45 backdrop-blur-md shadow-md h-full flex flex-col justify-between">
      <CardHeader className="py-5 px-6 border-b border-border">
        <CardTitle className="text-xl font-bold text-foreground">Content Distribution</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Visual overview of your active content database
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-8 flex-1 flex items-center justify-center">
        <ChartContainer config={chartConfig} className="w-full aspect-4/3 max-h-70">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <XAxis
              dataKey="name"
              stroke="currentColor"
              fontSize={11}
              axisLine={false}
              tickLine={false}
              className="text-muted-foreground/75 font-semibold"
            />
            <YAxis
              stroke="currentColor"
              fontSize={11}
              axisLine={false}
              tickLine={false}
              className="text-muted-foreground/75 font-semibold"
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: "var(--color-muted)", opacity: 0.15 }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={32} animationDuration={1000} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
