import { useState } from "react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    type: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative grid grid-cols-1 overflow-hidden md:grid-cols-2"
    >
      {/* LEFT */}
      <div
        className="relative px-6 py-20 md:px-14 md:py-32"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, var(--color-burgundy), var(--color-burgundy-dark) 70%)",
        }}
      >
        <h2
          className="font-display italic leading-[0.95]"
          style={{
            color: "var(--color-ivory)",
            fontSize: "clamp(48px, 6vw, 80px)",
            fontWeight: 500,
          }}
        >
          Let's Build
          <br />
          Something
          <br />
          <span style={{ color: "var(--color-gold)" }}>Majestic.</span>
        </h2>
        <div className="my-9 gold-rule">
          <span>❖</span>
        </div>
        <p
          className="max-w-md text-[16px] leading-[1.75]"
          style={{ color: "rgba(253,246,227,0.7)" }}
        >
          We work with corporates, brands, and institutions that value premium execution. If you
          have a vision, we have the expertise to make it real.
        </p>
        <div
          className="mt-10 space-y-3 text-[15px]"
          style={{ color: "rgba(253,246,227,0.85)" }}
        >
          <div className="flex items-center gap-3">
            <span style={{ color: "var(--color-gold)" }}>✆</span>
            <a href="tel:+919167122999" style={{ color: "inherit", textDecoration: "none" }}>+91 9167122999</a>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ color: "var(--color-gold)" }}>✉</span>
            connect@themajesticbharat.com
          </div>
          <div className="flex items-center gap-3">
            <span style={{ color: "var(--color-gold)" }}>✻</span>
            www.themajesticbharat.com
          </div>
        </div>
        <div className="mt-10 flex gap-3">
          {["IG", "in", "▶"].map((s) => (
            <a
              key={s}
              href="#"
              aria-label={`Social ${s}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border text-[12px] font-semibold transition-all hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)]"
              style={{
                borderColor: "var(--color-gold)",
                color: "var(--color-gold)",
              }}
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* RIGHT — Form */}
      <div
        className="relative px-6 py-20 md:px-14 md:py-32"
        style={{ background: "var(--color-ink)" }}
      >
        <div className="eyebrow mb-7">Start a Conversation</div>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-lg">
            {[
              { k: "name", label: "Name *", type: "input" as const },
              { k: "company", label: "Company / Organisation *", type: "input" as const },
              { k: "email", label: "Email Address *", type: "input" as const, inputType: "email" },
              { k: "phone", label: "Phone Number", type: "input" as const, inputType: "tel" },
            ].map((f) => (
              <div key={f.k} className="field">
                <input
                  type={(f as any).inputType || "text"}
                  placeholder=" "
                  required={f.label.includes("*")}
                  value={(form as any)[f.k]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                />
                <label>{f.label}</label>
              </div>
            ))}
            <div className={`field ${form.type ? "has-value" : ""}`}>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="" />
                <option value="corporate">Corporate Event</option>
                <option value="mice">MICE Travel</option>
                <option value="celebrity">Celebrity Booking</option>
                <option value="cultural">Cultural Program</option>
                <option value="other">Other</option>
              </select>
              <label>Type of Requirement</label>
            </div>
            <div className="field">
              <textarea
                rows={5}
                placeholder=" "
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <label>Tell us about your vision...</label>
            </div>
            <button type="submit" className="btn-gold mt-4 w-full !py-4">
              Submit Enquiry →
            </button>
          </form>
        ) : (
          <div className="max-w-lg animate-fade-up">
            <div
              className="mb-5 flex h-14 w-14 items-center justify-center rounded-full text-3xl"
              style={{
                background: "var(--color-gold)",
                color: "var(--color-ink)",
              }}
            >
              ✓
            </div>
            <h3
              className="font-serif-display"
              style={{ color: "var(--color-ivory)", fontSize: "28px" }}
            >
              Your enquiry has been received.
            </h3>
            <p
              className="mt-3 text-[15px] leading-[1.7]"
              style={{ color: "rgba(253,246,227,0.65)" }}
            >
              Our team will reach out within 24 hours. We look forward to building something
              majestic together.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
