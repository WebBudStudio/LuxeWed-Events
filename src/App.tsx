import { useState, useEffect } from "react";

const GOLD = "#C9A84C";
const IVORY = "#FFFDF5";

const scrollRevealObserver = () => {
  if (typeof window === "undefined") return;
  const els = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    },
    { threshold: 0.1 }
  );
  els.forEach((el) => observer.observe(el));
  return observer;
};

const svgWaveTop = `<svg viewBox="0 0 1440 100" preserveAspectRatio="none" style="width:100%;height:80px;display:block;"><path d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z" fill="#FFFDF5"/></svg>`;
const svgWaveBottom = `<svg viewBox="0 0 1440 100" preserveAspectRatio="none" style="width:100%;height:80px;display:block;transform:rotate(180deg);"><path d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z" fill="#FFFDF5"/></svg>`;
const svgWaveTopBurgundy = `<svg viewBox="0 0 1440 100" preserveAspectRatio="none" style="width:100%;height:80px;display:block;"><path d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z" fill="#5C0A2A"/></svg>`;
const svgWaveBottomBurgundy = `<svg viewBox="0 0 1440 100" preserveAspectRatio="none" style="width:100%;height:80px;display:block;transform:rotate(180deg);"><path d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z" fill="#5C0A2A"/></svg>`;
const svgWaveTopDark = `<svg viewBox="0 0 1440 100" preserveAspectRatio="none" style="width:100%;height:80px;display:block;"><path d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z" fill="#1A0A0F"/></svg>`;

const NAV_LINKS = ["Services", "Portfolio", "Packages", "About", "Contact"];

const FAQ_DATA = [
  {
    q: "How far in advance should I book?",
    a: "We recommend booking 3–6 months in advance for weddings, especially during peak season (Oct–Mar). For birthdays and smaller events, 2–4 weeks is usually sufficient. However, we've pulled off stunning events in just 7 days too!"
  },
  {
    q: "Do you handle destination weddings outside Jaipur?",
    a: "Absolutely! While we're based in Jaipur, we specialize in destination weddings across Rajasthan — Udaipur, Jodhpur, Pushkar, and beyond. We handle travel, accommodation, and venue coordination for out-of-city events."
  },
  {
    q: "Can I customize a package for my budget?",
    a: "Every package is fully customizable. The prices shown are starting points — we tailor every detail, from decor to catering, based on your guest count, preferences, and budget. No two LuxeWed events look alike!"
  },
  {
    q: "Do you coordinate with my own vendors?",
    a: "Of course! If you have a trusted photographer, caterer, or musician you'd like to work with, we'll seamlessly integrate them into the event plan and coordinate all logistics on your behalf."
  },
  {
    q: "What is included in decor services?",
    a: "Our decor services cover venue styling, floral arrangements, lighting design, stage setup, mandap decoration, table settings, and themed elements. We work with you to create a cohesive visual story for your event."
  },
  {
    q: "Do you manage outdoor events?",
    a: "Yes! We handle outdoor venues — palace lawns, farmhouses, rooftop venues, and heritage properties. Our team manages weather contingencies, power backup, lighting, and all outdoor logistics."
  },
  {
    q: "Is a site visit included before booking?",
    a: "Absolutely. We offer a complimentary site visit to shortlisted venues with our design team. You'll see the space, discuss layout possibilities, and get a feel for how your event will flow."
  },
  {
    q: "How do I get started?",
    a: "Just click the WhatsApp button or call us for a free consultation. We'll discuss your vision, budget, and timeline, then send you a customized proposal within 48 hours. No commitment required!"
  }
];

const SERVICES = [
  { icon: "💍", title: "Wedding Planning", desc: "End-to-end wedding management — venue, decor, catering, photography coordination. Every detail, flawlessly executed." },
  { icon: "🎉", title: "Birthday Celebrations", desc: "Milestone birthdays, theme parties, surprise events for all age groups. From intimate to extravagant." },
  { icon: "🏢", title: "Corporate Events", desc: "Product launches, conferences, team celebrations, award nights. Professional execution with a premium touch." },
  { icon: "🥂", title: "Receptions & Parties", desc: "Post-wedding receptions, anniversary parties, engagement ceremonies. Celebrate your way." }
];

const USPS = [
  { icon: "🏆", title: "500+ Successful Events", desc: "8 years of flawless execution across Jaipur and Rajasthan." },
  { icon: "💰", title: "All Budgets Welcome", desc: "₹5 lakh to ₹5 crore — same dedication and attention to detail." },
  { icon: "📍", title: "Jaipur Venue Experts", desc: "Deep knowledge of Rajasthan's best venues, vendors, and heritage spaces." },
  { icon: "🤝", title: "Dedicated Event Manager", desc: "One point of contact from planning to execution — always reachable." },
  { icon: "🎨", title: "Custom Themes & Decor", desc: "Fully personalized decor and experience design for every event." },
  { icon: "⏱️", title: "On-Time Guarantee", desc: "Every event starts exactly as planned — no delays, no stress." }
];

const PROCESS_STEPS = [
  { step: 1, icon: "💬", title: "Free Chat", desc: "Share your vision, budget, and dreams over coffee or a call." },
  { step: 2, icon: "🎨", title: "Design & Concept", desc: "We create a mood board, theme, and detailed plan just for you." },
  { step: 3, icon: "📋", title: "Vendor & Booking", desc: "We handle all vendor bookings, contracts, and coordination." },
  { step: 4, icon: "🏗️", title: "Execution & Setup", desc: "Our team manages every detail — from setup to rehearsal." },
  { step: 5, icon: "✨", title: "Your Perfect Day", desc: "You enjoy. We handle everything. Flawless delivery guaranteed." }
];

const PACKAGES = [
  {
    name: "The Classic",
    price: "₹1.5 Lakh",
    featured: false,
    features: [
      "Event planning & coordination",
      "Venue decoration (basic)",
      "Catering coordination",
      "Photographer booking",
      "On-day event management"
    ]
  },
  {
    name: "The Grand",
    price: "₹5 Lakh",
    featured: true,
    badge: "⭐ MOST POPULAR",
    features: [
      "Full wedding planning & design",
      "Premium venue decoration",
      "Catering & bar coordination",
      "Professional photography & video",
      "Live music or DJ booking",
      "Guest accommodation coordination",
      "Dedicated event manager",
      "Post-event follow-up"
    ]
  },
  {
    name: "The Royal",
    price: "₹15 Lakh",
    featured: false,
    features: [
      "End-to-end luxury planning",
      "Heritage/5-star venue booking",
      "International chef coordination",
      "Cinematic photography & film",
      "Celebrity artist booking",
      "Custom themed decor (full)",
      "Mehndi & sangeet planning",
      "Guest travel management",
      "Wedding website & invites",
      "24/7 dedicated concierge"
    ]
  }
];

const TESTIMONIALS = [
  {
    type: "Wedding",
    name: "Priya & Rajesh Sharma",
    location: "Delhi, Married in Jaipur",
    quote: "LuxeWed turned our dream wedding into reality. From the venue at a stunning Jaipur palace to the intricate decor — every detail was beyond perfect. Our families are still talking about it!"
  },
  {
    type: "Birthday",
    name: "Amit Kapoor",
    location: "Mumbai, Celebrated in Jaipur",
    quote: "We wanted a grand 50th birthday for my father at a heritage property. The team created a magical evening that blended tradition with elegance. Absolutely flawless execution."
  },
  {
    type: "Corporate",
    name: "Neha Joshi",
    location: "Jaipur, Product Launch 2024",
    quote: "As a brand launching in Jaipur, we needed an event that impressed. LuxeWed delivered a show-stopping launch that our clients still reference. Professional, creative, and seamless."
  }
];

const PORTFOLIO_ITEMS = [
  { id: 1, category: "Weddings", title: "Royal Palace Wedding", location: "Jaipur", year: "2024", tall: true },
  { id: 2, category: "Corporate", title: "Tech Summit 2024", location: "Jaipur", year: "2024", tall: false },
  { id: 3, category: "Birthdays", title: "50th Gold Celebration", location: "Jaipur", year: "2023", tall: false },
  { id: 4, category: "Receptions", title: "Garden Reception", location: "Jaipur", year: "2024", tall: true },
  { id: 5, category: "Weddings", title: "Heritage Mandap Wedding", location: "Jaipur", year: "2023", tall: false },
  { id: 6, category: "Corporate", title: "Award Night Gala", location: "Jaipur", year: "2024", tall: false },
  { id: 7, category: "Birthdays", title: "Kids Carnival Party", location: "Jaipur", year: "2023", tall: false },
  { id: 8, category: "Weddings", title: "Destination Udaipur Wedding", location: "Udaipur", year: "2024", tall: false }
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <span className="announcement-text">✨ Now booking 2025 &amp; 2026 weddings in Jaipur — Limited slots available</span>
          <span className="announcement-text">✨ Now booking 2025 &amp; 2026 weddings in Jaipur — Limited slots available</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`main-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <button className="logo-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className="logo-luxewed">LuxeWed</span>
            <span className="logo-events">Events</span>
            <span className="logo-underline"></span>
          </button>

          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <button key={link} className="nav-link" onClick={() => scrollTo(link.toLowerCase())}>
                {link}
              </button>
            ))}
          </div>

          <button className="nav-cta" onClick={() => scrollTo("contact")}>
            Book Free Consultation
          </button>

          <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
            <div className="mobile-menu-header">
              <span className="mobile-menu-script">LuxeWed</span>
            </div>
            <div className="mobile-menu-links">
              {NAV_LINKS.map((link) => (
                <button key={link} className="mobile-link" onClick={() => scrollTo(link.toLowerCase())}>
                  {link}
                </button>
              ))}
            </div>
            <button className="mobile-cta" onClick={() => { setMenuOpen(false); scrollTo("contact"); }}>
              Book Free Consultation
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="home">
      {/* Ornamental Border */}
      <div className="hero-border"></div>

      {/* Rose Petals */}
      <div className="petals">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`petal petal-${i + 1}`} />
        ))}
      </div>

      <div className="hero-content">
        {loaded && <div className="hero-label reveal-hero" style={{ animationDelay: "0s" }}>
          <span className="hero-script">Jaipur's Premier Event Planners</span>
        </div>}
        {loaded && <h1 className="hero-title reveal-hero" style={{ animationDelay: "0.15s" }}>
          We Create<br />
          <span className="hero-title-italic">Celebrations</span><br />
          Worth Remembering
        </h1>}
        {loaded && <div className="hero-divider reveal-hero" style={{ animationDelay: "0.3s" }}></div>}
        {loaded && <p className="hero-subtext reveal-hero" style={{ animationDelay: "0.45s" }}>
          Full event management for weddings, receptions, birthdays &amp; corporate events — across all budgets in Jaipur.
        </p>}
        {loaded && <div className="hero-ctas reveal-hero" style={{ animationDelay: "0.6s" }}>
          <button className="btn-gold" onClick={() => scrollTo("packages")}>Plan My Event</button>
          <button className="btn-outline-ivory" onClick={() => scrollTo("portfolio")}>View Our Work</button>
        </div>}
        {loaded && <div className="hero-trust reveal-hero" style={{ animationDelay: "0.75s" }}>
          <span>500+ Events</span>
          <span className="trust-dot">·</span>
          <span>8 Years</span>
          <span className="trust-dot">·</span>
          <span>Jaipur's Top Rated</span>
          <span className="trust-dot">·</span>
          <span>All Budgets</span>
        </div>}

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="section services-section" id="services">
      <div className="section-container">
        <div className="section-label reveal">WHAT WE DO</div>
        <div className="script-accent reveal" style={{ color: GOLD }}>Our Services</div>
        <h2 className="section-title reveal">Every Occasion,<br />Perfectly Executed</h2>

        <div className="services-grid">
          {SERVICES.map((svc, i) => (
            <div key={i} className="service-card reveal" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="service-icon">{svc.icon}</div>
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
              <span className="service-link">Explore →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyLuxeWed() {
  return (
    <section className="section why-section" id="about">
      <div dangerouslySetInnerHTML={{ __html: svgWaveTopBurgundy }} />
      <div className="section-container">
        <div className="section-label reveal" style={{ color: GOLD }}>WHY LUXEWED</div>
        <h2 className="section-title reveal">Because Your Celebration<br />Deserves The Best</h2>

        <div className="usps-grid">
          {USPS.map((usp, i) => (
            <div key={i} className="usp-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="usp-icon">{usp.icon}</div>
              <h3 className="usp-title">{usp.title}</h3>
              <p className="usp-desc">{usp.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: svgWaveBottomBurgundy }} />
    </section>
  );
}

function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Weddings", "Birthdays", "Corporate", "Receptions"];

  const filtered = activeFilter === "All"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section className="section portfolio-section" id="portfolio">
      <div className="section-container">
        <div className="section-label reveal" style={{ color: GOLD }}>OUR WORK</div>
        <h2 className="section-title reveal" style={{ fontStyle: "italic" }}>Moments We've<br />Brought To Life</h2>

        {/* Filter Pills */}
        <div className="filter-pills reveal">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-pill ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`gallery-tile ${item.tall ? "tall" : ""}`}
              data-category={item.category}
            >
              <div className="gallery-gradient">
                <span className="gallery-emoji">
                  {item.category === "Weddings" ? "💒" : item.category === "Corporate" ? "🏢" : item.category === "Birthdays" ? "🎂" : "🥂"}
                </span>
              </div>
              <div className="gallery-overlay">
                <div className="gallery-overlay-content">
                  <span className="gallery-overlay-tag">{item.category}</span>
                  <h3 className="gallery-overlay-title">{item.title}</h3>
                  <p className="gallery-overlay-location">{item.location} · {item.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-cta reveal">
          <a href="https://instagram.com/luxewed" target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
            See More On Instagram →
          </a>
          <p className="gallery-handle">@luxewed.events</p>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="section process-section" id="process">
      <div className="section-container">
        <div className="section-label reveal">OUR PROCESS</div>
        <h2 className="section-title reveal">From Vision<br />To Reality</h2>

        <div className="process-timeline">
          <div className="timeline-line"></div>
          {PROCESS_STEPS.map((step, i) => (
            <div key={i} className="process-step reveal" style={{ animationDelay: `${i * 0.2}s` }}>
              <div className="step-number">{step.step}</div>
              <div className="step-icon">{step.icon}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const whatsappMsg = (pkg: string) =>
    `https://wa.me/919999999999?text=Hi%20LuxeWed%20Events!%20I%20am%20interested%20in%20the%20${encodeURIComponent(pkg)}%20package.%20Please%20share%20a%20custom%20quote.`;

  return (
    <section className="section pricing-section" id="packages">
      <div className="section-container">
        <div className="section-label reveal" style={{ color: GOLD }}>PACKAGES</div>
        <h2 className="section-title reveal">Celebrations For<br />Every Budget</h2>

        <div className="pricing-grid">
          {PACKAGES.map((pkg, i) => (
            <div key={i} className={`pricing-card reveal ${pkg.featured ? "featured" : ""}`} style={{ animationDelay: `${i * 0.15}s` }}>
              {pkg.badge && <div className="featured-badge">{pkg.badge}</div>}
              <h3 className="pricing-name">{pkg.name}</h3>
              <div className="pricing-script">starting from</div>
              <div className="pricing-price">{pkg.price}</div>
              <ul className="pricing-features">
                {pkg.features.map((f, j) => (
                  <li key={j} className="pricing-feature">
                    <span className="feature-bullet">✦</span> {f}
                  </li>
                ))}
              </ul>
              <a href={whatsappMsg(pkg.name)} target="_blank" rel="noopener noreferrer" className={`pricing-cta ${pkg.featured ? "btn-ivory" : "btn-gold"}`}>
                Get A Custom Quote
              </a>
            </div>
          ))}
        </div>

        <p className="pricing-note reveal">All packages fully customizable. Final pricing based on guest count, venue &amp; requirements.</p>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="section testimonials-section" id="testimonials">
      <div dangerouslySetInnerHTML={{ __html: svgWaveTop }} />
      <div className="section-container">
        <div className="section-label reveal" style={{ color: GOLD }}>LOVE NOTES</div>
        <div className="script-accent reveal" style={{ color: IVORY }}>What Couples Say</div>
        <h2 className="section-title reveal" style={{ color: IVORY }}>Stories From<br />Our Happy Clients</h2>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card reveal" style={{ animationDelay: `${i * 0.15}s` }}>
              <span className="testimonial-tag">{t.type}</span>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-location">{t.location}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonial-badge reveal">
          ⭐ 4.9 · 200+ Reviews on Google &amp; WeddingWire
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: svgWaveBottom }} />
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section faq-section" id="contact">
      <div className="section-container">
        <div className="section-label reveal">QUESTIONS</div>
        <h2 className="section-title reveal">Everything You<br />Need To Know</h2>

        <div className="faq-list">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className={`faq-item reveal ${openIndex === i ? "open" : ""}`}>
              <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span>{item.q}</span>
                <span className="faq-icon">{openIndex === i ? "−" : "+"}</span>
              </button>
              <div className="faq-answer" style={{ maxHeight: openIndex === i ? "300px" : "0" }}>
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="section cta-strip" id="contact">
      <div className="cta-border"></div>
      <div className="cta-glow"></div>
      <div className="section-container" style={{ position: "relative", zIndex: 2 }}>
        <h2 className="cta-title reveal">Let's Plan Your<br />Dream Celebration</h2>
        <p className="cta-subtext reveal">Limited slots for 2025. Book your free consultation today.</p>

        <div className="cta-buttons reveal">
          <a href="tel:+919999999999" className="cta-btn-ivory">📞 Call Us Now</a>
          <a href="https://wa.me/919999999999?text=Hi%20LuxeWed%20Events!%20I%20would%20like%20to%20discuss%20my%20event%20in%20Jaipur." target="_blank" rel="noopener noreferrer" className="cta-btn-whatsapp">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white" style={{ marginRight: 8 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
          <button className="cta-btn-outline" onClick={() => setShowForm(!showForm)}>
            📩 Send Enquiry
          </button>
        </div>

        {showForm && (
          <div className="cta-form reveal" style={{ animationDelay: "0.2s" }}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <input type="text" placeholder="Your Name" required />
                <input type="tel" placeholder="Phone Number" required />
              </div>
              <div className="form-row">
                <select required>
                  <option value="">Event Type</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Corporate</option>
                  <option>Reception</option>
                  <option>Other</option>
                </select>
                <input type="date" required />
              </div>
              <button type="submit" className="btn-gold" style={{ width: "100%", marginTop: 8 }}>Submit Enquiry</button>
            </form>
          </div>
        )}

        <div className="cta-contact-info reveal">
          <span>📍 Jaipur, Rajasthan</span>
          <span>✉️ hello@luxewed.in</span>
          <span>📞 +91 99999 99999</span>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="footer" id="footer">
      <div dangerouslySetInnerHTML={{ __html: svgWaveTopDark }} />
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-luxewed">LuxeWed</span>
              <span className="footer-logo-events">Events</span>
            </div>
            <p className="footer-tagline">Crafting legendary celebrations in Jaipur since 2017. Every celebration deserves to be legendary.</p>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              {["Services", "Portfolio", "Packages", "About", "Contact", "Book Now"].map((link) => (
                <a key={link} href={`#${link.toLowerCase().replace(" ", "")}`} className="footer-link">{link}</a>
              ))}
            </div>
          </div>

          <div className="footer-contact-col">
            <h4 className="footer-heading">Contact</h4>
            <p className="footer-contact-item">📍 Jaipur, Rajasthan 302001</p>
            <p className="footer-contact-item">📞 <a href="tel:+919999999999">+91 99999 99999</a></p>
            <p className="footer-contact-item">✉️ <a href="mailto:hello@luxewed.in">hello@luxewed.in</a></p>
            <p className="footer-contact-item">🕐 Mon–Sat, 10 AM – 8 PM</p>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="footer-whatsapp-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="white" style={{ marginRight: 6 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-social">
          {["Instagram", "Pinterest", "Facebook", "YouTube", "WhatsApp"].map((s) => (
            <a key={s} href={`https://${s.toLowerCase()}.com/luxewed`} target="_blank" rel="noopener noreferrer" className="social-circle" title={s}>
              {s[0]}
            </a>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-border"></div>
          <div className="footer-bottom-content">
            <span>© 2025 LuxeWed Events. All rights reserved.</span>
            <span className="footer-credit">Crafted by Zyndro Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919999999999?text=Hi%20LuxeWed%20Events!%20I%20would%20like%20to%20discuss%20my%20event%20in%20Jaipur."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <div className="whatsapp-pulse"></div>
      <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="whatsapp-tooltip">Plan your event on WhatsApp</span>
    </a>
  );
}

export default function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
    const timer = setTimeout(() => {
      const obs = scrollRevealObserver();
      return () => obs?.disconnect();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  if (!init) return null;

  return (
    <div className="app">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyLuxeWed />
      <PortfolioSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
      <FooterSection />
      <WhatsAppFloat />
    </div>
  );
}
