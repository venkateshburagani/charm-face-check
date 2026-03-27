import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import WebcamFeed from "@/components/WebcamFeed";
import { addUser } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [capturing, setCapturing] = useState(false);
  const [captured, setCaptured] = useState(0);
  const [done, setDone] = useState(false);
  const total = 20;

  function startCapture() {
    if (!name.trim() || !studentId.trim()) {
      toast({ title: "Missing fields", description: "Please enter name and student ID", variant: "destructive" });
      return;
    }
    setCapturing(true);
    setCaptured(0);
    setDone(false);

    let count = 0;
    const interval = setInterval(() => {
      count++;
      setCaptured(count);
      if (count >= total) {
        clearInterval(interval);
        // Save user
        addUser({
          id: `u_${Date.now()}`,
          name: name.trim(),
          studentId: studentId.trim(),
          registeredAt: new Date().toISOString(),
          imageCount: total,
        });
        setCapturing(false);
        setDone(true);
        toast({ title: "Registration Complete!", description: `${name} has been registered successfully.` });
      }
    }, 200);
  }

  function reset() {
    setName("");
    setStudentId("");
    setCaptured(0);
    setDone(false);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="animate-fade-in text-center">
        <h1 className="font-display text-3xl font-bold">
          <i className="fa-solid fa-user-plus mr-2 text-primary" />
          Register New User
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Capture face samples for recognition enrollment</p>
      </div>

      {done ? (
        <div className="glass animate-scale-in flex flex-col items-center gap-4 rounded-xl p-10 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/15">
            <i className="fa-solid fa-circle-check text-4xl text-success" />
          </div>
          <h2 className="font-display text-2xl font-bold">Registration Successful!</h2>
          <p className="text-muted-foreground">
            <strong>{name}</strong> ({studentId}) has been enrolled with {total} face samples.
          </p>
          <Button onClick={reset} className="mt-2">
            <i className="fa-solid fa-plus mr-1.5" /> Register Another
          </Button>
        </div>
      ) : (
        <div className="glass animate-fade-in space-y-5 rounded-xl p-6">
          {/* Form fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Full Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Aarav Sharma" disabled={capturing} className="bg-muted/50" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Student ID</label>
              <Input value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="e.g. STU009" disabled={capturing} className="bg-muted/50" />
            </div>
          </div>

          {/* Webcam */}
          <WebcamFeed showOverlay detected={capturing} scanning={capturing} label={capturing ? `Capturing ${captured}/${total}` : undefined} />

          {/* Progress */}
          {capturing && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Capturing face samples...</span>
                <span>{captured}/{total}</span>
              </div>
              <Progress value={(captured / total) * 100} className="h-2" />
            </div>
          )}

          {/* Capture button */}
          <Button onClick={startCapture} disabled={capturing} className="w-full py-5 text-base" size="lg">
            {capturing ? (
              <><i className="fa-solid fa-spinner fa-spin mr-2" /> Capturing...</>
            ) : (
              <><i className="fa-solid fa-camera mr-2" /> Start Face Capture</>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
