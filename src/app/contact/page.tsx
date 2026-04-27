export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Get In Touch</p>
        <h1 className="text-3xl font-bold text-foreground mb-3">Contact Us</h1>
        <p className="text-muted max-w-xl mx-auto">Have a question or want to list your property? Our team is here to help.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h2>
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">First Name</label>
                <input type="text" placeholder="John" className="w-full px-4 py-3 rounded-xl border border-border outline-none text-sm focus:border-primary transition-colors bg-background" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full px-4 py-3 rounded-xl border border-border outline-none text-sm focus:border-primary transition-colors bg-background" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-border outline-none text-sm focus:border-primary transition-colors bg-background" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Phone (optional)</label>
              <input type="tel" placeholder="+1 (415) 000-0000" className="w-full px-4 py-3 rounded-xl border border-border outline-none text-sm focus:border-primary transition-colors bg-background" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Subject</label>
              <select className="w-full px-4 py-3 rounded-xl border border-border outline-none text-sm focus:border-primary transition-colors bg-background text-foreground">
                <option>General Inquiry</option>
                <option>List My Property</option>
                <option>Schedule a Viewing</option>
                <option>Agent Partnership</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
              <textarea rows={4} placeholder="Tell us how we can help..." className="w-full px-4 py-3 rounded-xl border border-border outline-none text-sm focus:border-primary transition-colors bg-background resize-none" />
            </div>
            <button type="submit" className="bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-light transition-colors mt-2">
              Send Message
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          {[
            {
              title: "Our Office",
              lines: ["123 Realty Blvd, Suite 400", "San Francisco, CA 94105"],
              icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
            },
            {
              title: "Email Us",
              lines: ["hello@estateprime.com", "support@estateprime.com"],
              icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
            },
            {
              title: "Call Us",
              lines: ["+1 (415) 555-0193", "Mon – Fri, 9am – 6pm PST"],
              icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
            },
          ].map((info) => (
            <div key={info.title} className="bg-white border border-border rounded-2xl p-6 flex gap-4 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={info.icon} />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                {info.lines.map((l) => (
                  <p key={l} className="text-sm text-muted">{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
