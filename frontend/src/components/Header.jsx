export default function Header() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="px-6 py-4 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">⚡</span>
          </div>
          <h1 className="text-xl font-bold">MerchantAI</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
            Overview
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
            Prompts
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
            Analytics
          </a>
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
            Settings
          </button>
        </nav>
      </div>
    </header>
  );
}
