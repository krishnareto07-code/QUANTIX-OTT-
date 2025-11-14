import { Search, Bell, User, Menu, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import SearchModal from "./SearchModal";
import { useState, useEffect } from "react";
import { NavLink } from "./NavLink";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass border-b border-border/50 shadow-lg' 
          : 'bg-background/40 backdrop-blur-sm border-b border-transparent'
      }`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center group">
              <h1 className="text-2xl font-bold gradient-text transition-all duration-300 group-hover:scale-110 group-hover:tracking-wider">
                Quantix
              </h1>
              <div className="ml-2 w-0 h-0.5 bg-gradient-to-r from-primary to-transparent transition-all duration-300 group-hover:w-8" />
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              <NavLink 
                to="/" 
                className="relative px-4 py-2 text-sm text-foreground/70 transition-all duration-300 hover:text-foreground group"
                activeClassName="text-foreground font-medium"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-glow transition-all duration-300 group-hover:w-full" />
              </NavLink>
              <NavLink 
                to="/browse" 
                className="relative px-4 py-2 text-sm text-foreground/70 transition-all duration-300 hover:text-foreground group"
                activeClassName="text-foreground font-medium"
              >
                Browse
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-glow transition-all duration-300 group-hover:w-full" />
              </NavLink>
              <NavLink 
                to="/mood-search" 
                className="relative px-4 py-2 text-sm text-foreground/70 transition-all duration-300 hover:text-foreground group"
                activeClassName="text-foreground font-medium"
              >
                Mood Search
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-glow transition-all duration-300 group-hover:w-full" />
              </NavLink>
              <NavLink 
                to="/my-list" 
                className="relative px-4 py-2 text-sm text-foreground/70 transition-all duration-300 hover:text-foreground group"
                activeClassName="text-foreground font-medium"
              >
                My List
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-glow transition-all duration-300 group-hover:w-full" />
              </NavLink>
              <NavLink 
                to="/subscription" 
                className="relative px-4 py-2 text-sm text-foreground/70 transition-all duration-300 hover:text-foreground group"
                activeClassName="text-foreground font-medium"
              >
                Plans
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary-glow transition-all duration-300 group-hover:w-full" />
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full transition-all duration-300 hover:bg-primary/10 hover:scale-110 hover:shadow-glow-primary"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5 transition-transform duration-300 hover:rotate-90" />
            </Button>
            {user && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full transition-all duration-300 hover:bg-primary/10 hover:scale-110 hover:shadow-glow-primary relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                </Button>
                <Link to="/profiles">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full transition-all duration-300 hover:bg-primary/10 hover:scale-110 hover:shadow-glow-primary"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full transition-all duration-300 hover:bg-primary/10 hover:scale-110 hover:shadow-glow-primary"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            )}
            {!user && (
              <Link to="/auth">
                <Button 
                  variant="default"
                  size="sm"
                  className="transition-all duration-300 hover:scale-105"
                >
                  Sign In
                </Button>
              </Link>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full transition-all duration-300 hover:bg-primary/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2 border-t border-border/50">
            <NavLink 
              to="/" 
              className="px-4 py-3 text-sm text-foreground/70 hover:text-foreground hover:bg-primary/5 rounded-lg transition-all duration-300"
              activeClassName="text-foreground bg-primary/10 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/browse" 
              className="px-4 py-3 text-sm text-foreground/70 hover:text-foreground hover:bg-primary/5 rounded-lg transition-all duration-300"
              activeClassName="text-foreground bg-primary/10 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse
            </NavLink>
            <NavLink 
              to="/mood-search" 
              className="px-4 py-3 text-sm text-foreground/70 hover:text-foreground hover:bg-primary/5 rounded-lg transition-all duration-300"
              activeClassName="text-foreground bg-primary/10 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Mood Search
            </NavLink>
            <NavLink 
              to="/my-list" 
              className="px-4 py-3 text-sm text-foreground/70 hover:text-foreground hover:bg-primary/5 rounded-lg transition-all duration-300"
              activeClassName="text-foreground bg-primary/10 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              My List
            </NavLink>
            <NavLink 
              to="/subscription" 
              className="px-4 py-3 text-sm text-foreground/70 hover:text-foreground hover:bg-primary/5 rounded-lg transition-all duration-300"
              activeClassName="text-foreground bg-primary/10 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Plans
            </NavLink>
          </nav>
        </div>
      </header>
      
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default Header;
