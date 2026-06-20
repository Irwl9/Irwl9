export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-clay-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <a
          href="/"
          className="flex items-center gap-2 font-black text-xl text-clay-primary mb-8 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary rounded-md"
          aria-label="FlowSaaS home"
        >
          <span className="w-8 h-8 rounded-xl bg-clay-primary flex items-center justify-center text-white text-sm font-black shadow-clay-sm border-2 border-[#075438]">
            F
          </span>
          FlowSaaS
        </a>
        {children}
      </div>
    </div>
  );
}
