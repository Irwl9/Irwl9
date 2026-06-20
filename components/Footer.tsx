const footerLinks = {
  المنتج: ["المزايا", "الأسعار", "سجل التغييرات", "خارطة الطريق", "الحالة"],
  الشركة: ["من نحن", "المدونة", "وظائف", "الصحافة", "تواصل معنا"],
  الموارد: ["الوثائق", "مرجع API", "التكاملات", "القوالب", "المجتمع"],
  القانونية: ["الخصوصية", "الشروط", "الأمان", "سياسة الكوكيز"],
};

export default function Footer() {
  return (
    <footer className="border-t-2 border-[#CDEADE] bg-white/60 px-4 pt-16 pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a
              href="#"
              className="font-display tracking-tight flex items-center gap-2 font-black text-xl text-clay-primary mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary rounded-md w-fit"
              aria-label="الصفحة الرئيسية لـ FlowSaaS"
            >
              <span
                className="w-8 h-8 rounded-xl bg-clay-primary flex items-center justify-center text-white text-sm font-black shadow-clay-sm border-2 border-[#075438]"
                aria-hidden="true"
              >
                F
              </span>
              FlowSaaS
            </a>
            <p className="text-clay-muted text-sm leading-relaxed mb-4">
              اعمل بذكاء، أنجز بسرعة، معاً.
            </p>

            <div className="flex gap-3" aria-label="روابط التواصل الاجتماعي">
              {[
                { label: "تويتر", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { label: "لينكد إن", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
                { label: "جيت هاب", path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg border-2 border-[#CDEADE] bg-white flex items-center justify-center text-clay-muted hover:text-clay-primary hover:border-[#9FD4BC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <nav key={group} aria-labelledby={`footer-${group}`}>
              <h3
                id={`footer-${group}`}
                className="font-extrabold text-clay-text text-sm mb-3"
              >
                {group}
              </h3>
              <ul className="space-y-2" role="list">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-clay-muted hover:text-clay-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary rounded"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t-2 border-[#CDEADE] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-clay-muted font-semibold">
            © {new Date().getFullYear()} FlowSaaS Inc. جميع الحقوق محفوظة.
          </p>
          <p className="text-xs text-clay-muted font-semibold">
            صُنع بـ{" "}
            <span aria-label="حب" role="img">♥</span>{" "}
            للفرق التي تُنجز
          </p>
        </div>
      </div>
    </footer>
  );
}
