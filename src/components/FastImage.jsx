import { useState } from "react";

export default function FastImage({
  src,
  alt = "",
  className = "",
  eager = false,
  onLoad,
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`overflow-hidden ${className}`}>
      {/* Skeleton */}
      <div
        className={[
          "absolute inset-0 transition",
          loaded ? "opacity-0" : "opacity-100",
          "bg-black/25 animate-pulse",
        ].join(" ")}
      />

      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchpriority={eager ? "high" : "auto"}
          onLoad={(e) => {
            setLoaded(true);
            onLoad?.(e);
          }}
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white/80 text-sm">
          Failed to load image
        </div>
      )}
    </div>
  );
}