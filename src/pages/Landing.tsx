import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const features = [
  { icon: "fa-eye", title: "Real-time Detection", desc: "Instant face detection with live camera feed and bounding box overlay" },
  { icon: "fa-bullseye", title: "High Accuracy", desc: "Advanced AI matching with confidence scoring up to 99.2% accuracy" },
  { icon: "fa-chart-pie", title: "Smart Dashboard", desc: "Comprehensive analytics with filters, search, and CSV export" },
  { icon: "fa-user-plus", title: "Easy Registration", desc: "Capture face samples in seconds with guided multi-frame enrollment" },
];

export default function Landing() {
  const [typed, setTyped] = useState("");
  const fullText = "AI Face Recognition Attendance System";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, ++i));
      if (i >= fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Floating dots */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="animate-float absolute h-1 w-1 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center pt-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
          <i className="fa-solid fa-sparkles" /> Powered by AI
        </div>

        <h1 className="typing-cursor mb-4 font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          {typed}
        </h1>

        <p className="mb-8 max-w-xl text-muted-foreground">
          Mark attendance instantly using advanced facial recognition technology. Fast, accurate, and completely automated.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
          >
            <i className="fa-solid fa-user-plus" /> Register Face
          </Link>
          <Link
            to="/attendance"
            className="pulse-glow inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-6 py-3 font-semibold text-primary transition-all hover:scale-105"
          >
            <i className="fa-solid fa-camera" /> Mark Attendance
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-6 py-3 font-semibold text-foreground transition-all hover:scale-105 hover:bg-muted"
          >
            <i className="fa-solid fa-chart-line" /> Dashboard
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 mt-24 grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="glass animate-fade-in rounded-xl p-6 transition-transform hover:scale-[1.02]"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <i className={`fa-solid ${f.icon} text-lg`} />
            </div>
            <h3 className="mb-1 font-display text-lg font-semibold">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats banner */}
      <div className="relative z-10 mt-16 mb-8 flex flex-wrap justify-center gap-12">
        {[
          { val: "99.2%", label: "Accuracy" },
          { val: "<1s", label: "Detection Speed" },
          { val: "500+", label: "Faces Supported" },
          { val: "24/7", label: "Availability" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-3xl font-bold text-primary">{s.val}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
