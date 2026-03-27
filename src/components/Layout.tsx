import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "Home", icon: "fa-house" },
  { path: "/register", label: "Register", icon: "fa-user-plus" },
  { path: "/attendance", label: "Attendance", icon: "fa-camera" },
  { path: "/dashboard", label: "Dashboard", icon: "fa-chart-line" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [light, setLight] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  return (
    <div className="gradient-bg min-h-screen">
      {/* Navbar */}
      <nav className="glass sticky top-0 z-50 border-b border-border/40">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-primary">
            <i className="fa-solid fa-brain" />
            FaceRecog AI
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  location.pathname === item.path
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <i className={`fa-solid ${item.icon} mr-1.5`} />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}

            <button
              onClick={() => setLight(!light)}
              className="ml-2 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <i className={`fa-solid ${light ? "fa-moon" : "fa-sun"}`} />
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
