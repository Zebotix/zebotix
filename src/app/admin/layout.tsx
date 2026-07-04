

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {children}
    </div>
  );
}
