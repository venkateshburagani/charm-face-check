import { useRef, useEffect, useState } from "react";

interface WebcamFeedProps {
  onStream?: (stream: MediaStream) => void;
  showOverlay?: boolean;
  scanning?: boolean;
  detected?: boolean;
  label?: string;
}

export default function WebcamFeed({ showOverlay = true, scanning = false, detected = false, label }: WebcamFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    navigator.mediaDevices
      .getUserMedia({ video: { width: 640, height: 480, facingMode: "user" } })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          setActive(true);
        }
      })
      .catch(() => setError("Camera access denied or unavailable"));

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  if (error) {
    return (
      <div className="flex h-[360px] items-center justify-center rounded-xl border border-destructive/30 bg-destructive/5">
        <div className="text-center">
          <i className="fa-solid fa-video-slash mb-3 text-3xl text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-black">
      <video ref={videoRef} autoPlay playsInline muted className="h-[360px] w-full object-cover" />

      {active && showOverlay && (
        <>
          {/* Scanning line */}
          {scanning && (
            <div className="scan-line absolute left-0 right-0 h-0.5 bg-primary/70" style={{ position: "absolute" }} />
          )}

          {/* Face detection box */}
          {detected && (
            <div className="face-box absolute left-1/2 top-1/2 h-44 w-36 -translate-x-1/2 -translate-y-1/2 rounded-lg border-2">
              {/* Corner accents */}
              <div className="absolute -left-0.5 -top-0.5 h-4 w-4 border-l-2 border-t-2 border-primary" />
              <div className="absolute -right-0.5 -top-0.5 h-4 w-4 border-r-2 border-t-2 border-primary" />
              <div className="absolute -bottom-0.5 -left-0.5 h-4 w-4 border-b-2 border-l-2 border-primary" />
              <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 border-b-2 border-r-2 border-primary" />

              {label && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {label}
                </div>
              )}
            </div>
          )}

          {/* Status indicator */}
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1">
            <div className={`h-2 w-2 rounded-full ${scanning ? "animate-pulse bg-primary" : "bg-success"}`} />
            <span className="text-[10px] font-medium text-white">{scanning ? "SCANNING" : "LIVE"}</span>
          </div>
        </>
      )}
    </div>
  );
}
