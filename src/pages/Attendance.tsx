import { useState, useCallback } from "react";
import WebcamFeed from "@/components/WebcamFeed";
import { Button } from "@/components/ui/button";
import { getRandomUser, isAlreadyMarkedToday, addAttendance } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

type RecognitionState = "idle" | "scanning" | "recognized" | "unknown" | "duplicate";

export default function Attendance() {
  const [state, setState] = useState<RecognitionState>("idle");
  const [result, setResult] = useState<{ name: string; studentId: string; confidence: number } | null>(null);

  const startScan = useCallback(() => {
    setState("scanning");
    setResult(null);

    setTimeout(() => {
      const user = getRandomUser();

      // 15% chance of "unknown"
      if (!user || Math.random() < 0.15) {
        setState("unknown");
        return;
      }

      const confidence = Math.round((88 + Math.random() * 11) * 10) / 10;

      if (isAlreadyMarkedToday(user.id)) {
        setResult({ name: user.name, studentId: user.studentId, confidence });
        setState("duplicate");
        toast({ title: "Already Marked", description: `${user.name}'s attendance was already recorded today.`, variant: "destructive" });
        return;
      }

      // Mark attendance
      const now = new Date();
      addAttendance({
        id: `a_${Date.now()}`,
        userId: user.id,
        name: user.name,
        studentId: user.studentId,
        date: now.toISOString().split("T")[0],
        time: now.toTimeString().slice(0, 5),
        confidence,
        status: "recognized",
      });

      setResult({ name: user.name, studentId: user.studentId, confidence });
      setState("recognized");
      toast({ title: "Attendance Marked!", description: `${user.name} — ${confidence}% confidence` });
    }, 2500);
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="animate-fade-in text-center">
        <h1 className="font-display text-3xl font-bold">
          <i className="fa-solid fa-camera mr-2 text-primary" />
          Mark Attendance
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Position your face in the camera to mark attendance</p>
      </div>

      <div className="glass animate-fade-in space-y-5 rounded-xl p-6">
        <WebcamFeed
          scanning={state === "scanning"}
          detected={state === "recognized" || state === "duplicate" || state === "scanning"}
          label={
            state === "scanning" ? "Analyzing..." :
            state === "recognized" && result ? `${result.name} — ${result.confidence}%` :
            state === "duplicate" && result ? `${result.name} (Already Marked)` :
            undefined
          }
        />

        {/* Result cards */}
        {state === "recognized" && result && (
          <div className="animate-scale-in flex items-center gap-4 rounded-xl border border-success/30 bg-success/10 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
              <i className="fa-solid fa-circle-check text-xl text-success" />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold">{result.name}</p>
              <p className="text-xs text-muted-foreground">ID: {result.studentId}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-2xl font-bold text-success">{result.confidence}%</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Confidence</p>
            </div>
          </div>
        )}

        {state === "duplicate" && result && (
          <div className="animate-scale-in flex items-center gap-4 rounded-xl border border-warning/30 bg-warning/10 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/20">
              <i className="fa-solid fa-triangle-exclamation text-xl text-warning" />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold">{result.name}</p>
              <p className="text-xs text-warning">Attendance already recorded today</p>
            </div>
            <div className="text-right">
              <p className="font-display text-2xl font-bold text-warning">{result.confidence}%</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Match</p>
            </div>
          </div>
        )}

        {state === "unknown" && (
          <div className="animate-scale-in flex items-center gap-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20">
              <i className="fa-solid fa-user-xmark text-xl text-destructive" />
            </div>
            <div className="flex-1">
              <p className="font-display font-bold text-destructive">Unknown Person</p>
              <p className="text-xs text-muted-foreground">Face not found in database</p>
            </div>
            <Link to="/register">
              <Button variant="outline" size="sm">
                <i className="fa-solid fa-user-plus mr-1.5" /> Register
              </Button>
            </Link>
          </div>
        )}

        <Button
          onClick={startScan}
          disabled={state === "scanning"}
          className="w-full py-5 text-base"
          size="lg"
        >
          {state === "scanning" ? (
            <><i className="fa-solid fa-spinner fa-spin mr-2" /> Scanning Face...</>
          ) : state === "idle" ? (
            <><i className="fa-solid fa-play mr-2" /> Start Recognition</>
          ) : (
            <><i className="fa-solid fa-rotate mr-2" /> Scan Again</>
          )}
        </Button>
      </div>
    </div>
  );
}
