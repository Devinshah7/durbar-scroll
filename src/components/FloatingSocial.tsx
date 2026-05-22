export function FloatingSocial() {
  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/tmb_events2015/",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/themajesticbharat/",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      href: "https://youtube.com/@themajesticbharat_tmb?si=qRIBvHadpV1pVxVF",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2.5 md:flex">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="group flex h-11 w-11 items-center justify-center rounded-md transition-all duration-300"
          style={{
            background: "#D4AF37",
            border: "1px solid #8b6914",
            color: "#0B0608",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#B8860B";
            el.style.boxShadow = "0 0 18px rgba(212,175,55,0.7), 0 2px 8px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#D4AF37";
            el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.4)";
          }}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
