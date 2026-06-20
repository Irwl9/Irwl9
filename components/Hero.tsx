"use client";
import { useEffect, useRef, useState } from "react";

const feed = [
  { type: "ai", text: "رتّبت أولويات هذا الأسبوع — 3 مهام تحتاج انتباهك الآن." },
  { type: "task", text: "مهمة \"مراجعة العقد\" أُسندت تلقائياً إلى سارة." },
  { type: "ai", text: "اكتشفت تأخيراً في مشروع التسويق. هل أكتب رسالة متابعة؟" },
  { type: "done", text: "اكتمل السبرينت رقم 12 بنسبة 100٪ قبل الموعد بيومين." },
  { type: "ai", text: "الموجز اليومي جاهز — 4 إنجازات، تحذيرَين، وصفر مفاجآت." },
];

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-0.5 mr-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-clay-primary/60 animate-typing-dot"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </span>
  );
}

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        setActiveIdx((prev) => (prev + 1) % feed.length);
      }, 900);
    }, 3200);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#060618]"
      aria-label="القسم الرئيسي"
    >
      {/* Animated orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-clay-primary/20 blur-[100px] animate-orb-drift" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-clay-secondary/15 blur-[100px] animate-orb-drift-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-clay-accent/10 blur-[80px]" />
      </div>

      {/* Grid lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,111,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,111,247,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-clay-primary/30 bg-clay-primary/10 text-clay-primary text-sm font-bold mb-7 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-clay-primary animate-pulse" />
              رئيس الأعمال المدعوم بالذكاء الاصطناعي
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 text-white">
              فريقك يعمل.{" "}
              <br />
              <span className="gradient-text">الذكاء يُخطّط.</span>
            </h1>

            <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-lg">
              FlowSaaS ليس مجرد أداة مهام — إنه رئيس أعمال لا ينام. يرتّب الأولويات، يكتب التقارير، يتابع الفريق، ويحذّرك قبل أن تشتعل المشاكل.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="/signup"
                className="dark-btn-primary text-base px-8 py-4 text-center"
              >
                ابدأ مجاناً — بدون بطاقة
              </a>
              <a
                href="#how"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-clay border border-white/15 text-white/70 font-bold text-base hover:border-white/30 hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                شاهد كيف يعمل
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 space-x-reverse">
                {["#7C6FF7","#FF8FAB","#5ECFB1","#FFBF69"].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#060618] flex items-center justify-center text-white text-xs font-black"
                    style={{ backgroundColor: c }}
                    aria-hidden="true"
                  >
                    {["س","م","أ","ب"][i]}
                  </div>
                ))}
              </div>
              <p className="text-white/50 text-sm font-semibold">
                +3,400 فريق يستخدم FlowSaaS هذا الأسبوع
              </p>
            </div>
          </div>

          {/* Right: AI activity feed */}
          <div className="relative">
            <div
              className="rounded-clay-xl border border-white/10 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)" }}
            >
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-5 py-4 border-b border-white/8">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" aria-hidden="true" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" aria-hidden="true" />
                <div className="flex-1 text-center">
                  <span className="text-xs text-white/30 font-semibold">FlowSaaS · رئيس الأعمال الذكي</span>
                </div>
              </div>

              {/* Header */}
              <div className="px-5 pt-5 pb-4 border-b border-white/8">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 rounded-xl bg-clay-primary flex items-center justify-center flex-shrink-0 animate-pulse-glow">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">مرحباً، أحمد 👋</p>
                    <p className="text-white/45 text-xs">عندي تحديث جديد لك</p>
                  </div>
                </div>
              </div>

              {/* Feed */}
              <div className="px-5 py-4 space-y-3 min-h-[220px]">
                {feed.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 transition-all duration-500 ${
                      i === activeIdx ? "opacity-100 scale-100" : i < activeIdx ? "opacity-30 scale-95" : "opacity-0 scale-95"
                    }`}
                    aria-live={i === activeIdx ? "polite" : undefined}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        item.type === "ai"
                          ? "bg-clay-primary/20 text-clay-primary"
                          : item.type === "done"
                          ? "bg-clay-accent/20 text-clay-accent"
                          : "bg-clay-secondary/20 text-clay-secondary"
                      }`}
                      aria-hidden="true"
                    >
                      {item.type === "ai" && (
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 1a.5.5 0 01.45.28l1.57 3.15 3.49.51a.5.5 0 01.28.85l-2.53 2.46.6 3.48a.5.5 0 01-.73.53L8 10.58l-3.12 1.64a.5.5 0 01-.73-.53l.6-3.48L2.22 5.75a.5.5 0 01.28-.85l3.49-.51L7.55 1.28A.5.5 0 018 1z" />
                        </svg>
                      )}
                      {item.type === "done" && (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 16 16">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 8l4 4 7-7" />
                        </svg>
                      )}
                      {item.type === "task" && (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="6" />
                          <path strokeLinecap="round" d="M8 5v3l2 2" />
                        </svg>
                      )}
                    </div>
                    <p className="text-white/75 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}

                {showTyping && (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-clay-primary/20 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <TypingDots />
                    </div>
                    <p className="text-white/30 text-sm">FlowSaaS يُحلّل...</p>
                  </div>
                )}
              </div>

              {/* Input bar */}
              <div className="px-5 py-4 border-t border-white/8">
                <div className="flex items-center gap-3 px-4 py-3 rounded-clay bg-white/5 border border-white/10">
                  <p className="text-white/25 text-sm flex-1">اسأل رئيس أعمالك الذكي...</p>
                  <div className="w-7 h-7 rounded-lg bg-clay-primary flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div
              className="absolute -top-4 -right-4 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-clay bg-[#0D0D2B] border border-clay-accent/30 shadow-glow-sm animate-float"
              aria-hidden="true"
            >
              <span className="text-clay-accent text-lg">✓</span>
              <div>
                <p className="text-white text-xs font-bold">السبرينت اكتمل</p>
                <p className="text-white/40 text-[10px]">قبل الموعد بيومين</p>
              </div>
            </div>
            <div
              className="absolute -bottom-4 -left-4 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-clay bg-[#0D0D2B] border border-clay-secondary/30 shadow-glow-pink animate-float-delay"
              aria-hidden="true"
            >
              <span className="text-clay-secondary text-lg">⚠</span>
              <div>
                <p className="text-white text-xs font-bold">مهمة معلّقة</p>
                <p className="text-white/40 text-[10px]">FlowSaaS يكتب التذكير</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to light */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #EEF2FF)" }}
      />
    </section>
  );
}
