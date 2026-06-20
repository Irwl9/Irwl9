"use client";
import { useEffect, useRef, useState } from "react";
import AnimateIn from "@/components/ui/AnimateIn";

const stats = [
  { value: 3400, suffix: "+", label: "فريق يستخدم FlowSaaS", color: "text-clay-primary" },
  { value: 98, suffix: "%", label: "رضا المستخدمين", color: "text-[#34D8A6]" },
  { value: 12, suffix: "×", label: "تسريع وقت التخطيط", color: "text-[#E0A82E]" },
  { value: 4.9, suffix: "/5", label: "متوسط التقييم", color: "text-[#FFBF69]", decimal: true },
];

function Counter({ target, suffix, color, decimal }: { target: number; suffix: string; color: string; decimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            setCount(current);
            if (current >= target) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const display = decimal ? count.toFixed(1) : Math.floor(count).toLocaleString("ar-SA");

  return (
    <div ref={ref} className={`text-5xl md:text-6xl font-black ${color} tabular-nums`}>
      {display}
      <span className="text-3xl">{suffix}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-20 px-5 bg-white" aria-label="إحصاءات FlowSaaS">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s, i) => (
            <AnimateIn key={s.label} delay={i * 80} className="text-center">
              <Counter target={s.value} suffix={s.suffix} color={s.color} decimal={s.decimal} />
              <p className="mt-2 text-clay-muted font-semibold text-sm">{s.label}</p>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
