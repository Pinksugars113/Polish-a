import { Link, useLocation } from "wouter";
import { Home, Plus, Sparkles, Menu, X, Settings, Calendar } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "My Collection", icon: Home },
    { href: "/add", label: "Add Polish", icon: Plus },
    { href: "/match", label: "Match Inspo", icon: Sparkles },
    { href: "/history", label: "Mani History", icon: Calendar },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-border sticky top-0 z-30">
        <h1 className="font-display text-2xl font-bold text-foreground">Lacquer<span className="text-primary">Lab</span></h1>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-border z-20 p-4 shadow-xl"
          >
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <div 
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                        isActive 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col bg-white border-r border-border h-screen sticky top-0 p-8">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold text-foreground">
            Lacquer<span className="text-primary">Lab</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">Curate your perfect palette</p>
        </div>

        <nav className="space-y-3 flex-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href} className="block">
                <div className={`flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:translate-x-1"
                }`}>
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 border-t border-border">
          <div className="bg-secondary/50 rounded-2xl p-4">
            <p className="text-xs text-muted-foreground text-center font-medium">
              Made with ✨ for polish lovers
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
