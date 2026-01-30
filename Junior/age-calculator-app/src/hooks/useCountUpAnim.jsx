import { useEffect, useRef, useState } from "react";

export function useCountUpAnim(target, durationMs = 450) {
   const [value, setValue] = useState(target ?? null);
   const rafId = useRef(null);

   useEffect(() => {
      if (target === null || target === undefined || !Number.isFinite(target)) {
         setValue(null);
         return;
      }

      const startValue = 0;
      const endValue = target;

      const startTime = performance.now();

      function tick(now) {
         const elapsed = now - startTime;
         const t = Math.min(elapsed / durationMs, 1); // normalized time [0,1]

         // Linear interpolation, then round to int
         const next = Math.round(startValue + (endValue - startValue) * t);
         setValue(next);

         if (t < 1) {
            rafId.current = requestAnimationFrame(tick);
         }
      }

      // Start the animation
      rafId.current = requestAnimationFrame(tick);

      // Cleanup if component unmounts or target changes mid-animation
      return () => {
         if (rafId.current) cancelAnimationFrame(rafId.current);
      };
   }, [target, durationMs]);

   return value;
}
