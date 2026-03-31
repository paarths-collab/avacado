import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, TrendingUp, ShoppingCart, Newspaper, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { href: '/prices', label: 'Prices', icon: TrendingUp },
  { href: '/marketplace', label: 'Marketplace', icon: ShoppingCart },
  { href: '/news', label: 'News', icon: Newspaper },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled
          ? 'bg-background/80 backdrop-blur-3xl border-b border-primary/10 shadow-premium'
          : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Logo size={40} className="group-hover:scale-105 transition-all duration-300" />
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] bg-clip-text text-transparent">
                AvoPrice
              </span>
              <span className="text-[10px] text-muted-foreground -mt-1 tracking-wider uppercase">
                Global Markets
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.href)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
              >
                <span className="flex items-center gap-2">
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <div className="w-px h-6 bg-border mx-1" />
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] px-6">
              <div className="flex flex-col gap-6 mt-6 h-full pb-8">
                {/* Mobile Logo */}
                <Link to="/" className="flex items-center gap-2">
                  <Logo size={32} />
                  <span className="text-lg font-bold text-primary">AvoPrice</span>
                </Link>

                {/* Mobile Navigation */}
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        to={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(link.href)
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`}
                      >
                        <link.icon className="w-5 h-5" />
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                {/* Mobile Actions */}
                <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between px-2 mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Appearance</span>
                    <ThemeToggle />
                  </div>
                  <Button variant="outline" className="w-full justify-center">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button className="w-full justify-center bg-primary hover:bg-primary/90 text-white">
                    Sign Up
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
