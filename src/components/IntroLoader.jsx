import { useEffect, useState } from "react";

export default function IntroLoader({ ready }) {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Safety: لو ما صار ready خلال 6 ثواني، اختفي
    const safety = setTimeout(() => {
      setFade(true);
      setTimeout(() => setVisible(false), 600);
    }, 6000);

    if (ready) {
      clearTimeout(safety);
      setFade(true);
      const t = setTimeout(() => setVisible(false), 600);
      return () => clearTimeout(t);
    }

    return () => clearTimeout(safety);
  }, [ready]);

  if (!visible) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[9999] bg-[#202C28] flex items-center justify-center",
        "transition-opacity duration-600",
        fade ? "opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div className="text-center font-Vazirmatn text-[#E7F2E2]">
        <div className="text-xl md:text-2xl tracking-wide">حياكم الله</div>
      </div>
    </div>
  );
}