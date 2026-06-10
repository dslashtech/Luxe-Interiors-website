import { useState, useEffect, useRef } from "react";

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const PROJECTS = [
  { id: 1, name: "Living Room Interior", location: "Anna Nagar", budget: "₹18 Lakhs", sqft: 2800, duration: "60 Days", date: "Mar 2024", style: "Luxury", type: "Villa", img: "/hero-bg.png" },
  { id: 2, name: "Dining Restaurant Interior", location: "OMR", budget: "₹8 Lakhs", sqft: 1200, duration: "45 Days", date: "Jan 2024", style: "Modern", type: "Apartment", img: "/assets/Dining Restaurant Interior (OMR).jpeg" },
  { id: 3, name: "Modular Kitchen Interior", location: "Velachery", budget: "₹12 Lakhs", sqft: 1800, duration: "55 Days", date: "Feb 2024", style: "Minimalist", type: "Apartment", img: "/assets/Modular Kitchen Interior (Velachery).jpeg" },
  { id: 4, name: "Bedroom Interior", location: "Coimbatore", budget: "₹25 Lakhs", sqft: 4000, duration: "75 Days", date: "Dec 2023", style: "Modern", type: "Office", img: "/assets/Bedroom Interior (Coimbatore).jpeg" },
  { id: 5, name: "Antique Interior", location: "Trichy", budget: "₹22 Lakhs", sqft: 3200, duration: "65 Days", date: "Nov 2023", style: "Luxury", type: "Villa", img: "/assets/Antique Interior (Trichy).jpeg" },
  { id: 6, name: "Pooja Room Interior", location: "Madurai", budget: "₹6 Lakhs", sqft: 900, duration: "35 Days", date: "Oct 2023", style: "Scandinavian", type: "Apartment", img: "/assets/Pooja Room Interior (Madurai).jpeg" },
  { id: 7, name: "Office Interior", location: "Anna Nagar", budget: "₹35 Lakhs", sqft: 5000, duration: "90 Days", date: "Sep 2023", style: "Luxury", type: "Villa", img: "/assets/Office Interior (Anna Nagar).jpeg" },
  { id: 8, name: "Balcony Interior", location: "OMR", budget: "₹4.5 Lakhs", sqft: 600, duration: "30 Days", date: "Aug 2023", style: "Minimalist", type: "Apartment", img: "/assets/Balcony Interior (OMR).jpeg" },
  { id: 9, name: "Bathroom Interior", location: "Coimbatore", budget: "₹40 Lakhs", sqft: 6000, duration: "100 Days", date: "Jul 2023", style: "Modern", type: "Office", img: "/assets/Bathroom Interior (Coimbatore).jpeg" },
  { id: 10, name: "Cafe Interior", location: "Velachery", budget: "₹14 Lakhs", sqft: 2200, duration: "50 Days", date: "Jun 2023", style: "Luxury", type: "Villa", img: "/assets/Cafe Interior (Velachery).jpeg" },
  { id: 11, name: "Salon Interior", location: "Madurai", budget: "₹7 Lakhs", sqft: 1100, duration: "40 Days", date: "May 2023", style: "Scandinavian", type: "Apartment", img: "/assets/Salon Interior (Madurai).jpeg" },
  { id: 12, name: "Office Interior", location: "Trichy", budget: "₹9 Lakhs", sqft: 1400, duration: "48 Days", date: "Apr 2023", style: "Modern", type: "Apartment", img: "/assets/Office Interior (Trichy).jpeg" },
];

const TESTIMONIALS = [
  { name: "Kavitha Rajan", area: "Anna Nagar", rating: 5, project: "Villa Renovation", text: "Absolutely transformed our home. The attention to detail and quality of execution was beyond our expectations. Every corner tells a story.", avatar: "KR" },
  { name: "Suresh Mohan", area: "OMR", rating: 5, project: "2BHK Apartment", text: "From concept to completion in 45 days! The team was professional, punctual, and the end result is stunning. Highly recommend.", avatar: "SM" },
  { name: "Priya Venkatesh", area: "Velachery", rating: 5, project: "Office Interior", text: "Our office now feels like a premium co-working space. Client impressions have improved dramatically. Worth every rupee.", avatar: "PV" },
  { name: "Arjun Balaji", area: "Trichy", rating: 5, project: "Modular Kitchen", text: "The modular kitchen is a masterpiece. Smart storage, beautiful finishes, and completed ahead of schedule. Outstanding work.", avatar: "AB" },
  { name: "Meera Krishnan", area: "Coimbatore", rating: 4, project: "Living Room", text: "Creative design team that truly understood our aesthetic. The space feels both luxurious and livable. Perfect balance.", avatar: "MK" },
];

const MATERIALS = [
  { name: "HDHMR Board", category: "HDHMR", durability: 95, warranty: "10 years", cost: "Premium", use: "Kitchen & Wardrobes", color: "#8B7355", desc: "High Density High Moisture Resistant board, ideal for humid spaces." },
  { name: "Marine Plywood", category: "Plywood", durability: 88, warranty: "7 years", cost: "Standard", use: "Furniture & Storage", color: "#A0855B", desc: "Water-resistant exterior-grade plywood for lasting structures." },
  { name: "MDF Board", category: "MDF", durability: 70, warranty: "5 years", cost: "Economy", use: "Decorative Panels", color: "#C4A882", desc: "Smooth finish medium-density fiberboard for precise cuts." },
  { name: "Acrylic High Gloss", category: "Acrylic", durability: 85, warranty: "8 years", cost: "Luxury", use: "Kitchen Shutters", color: "#E8E8E8", desc: "Mirror-finish acrylic for ultra-modern kitchen aesthetics." },
  { name: "Wooden Veneer", category: "Veneer", durability: 80, warranty: "6 years", cost: "Premium", use: "Wall Panels & Doors", color: "#6B4F3A", desc: "Natural wood grain aesthetics with consistent quality." },
  { name: "Matte Laminate", category: "Laminates", durability: 78, warranty: "5 years", cost: "Standard", use: "Cabinets & Shelves", color: "#D4C5B0", desc: "Tactile matte surface that resists fingerprints and smudges." },
];

const SERVICES = [
  { icon: "🍳", name: "Modular Kitchen", desc: "Smart storage meets premium finish", price: "From ₹1.8L" },
  { icon: "🛏", name: "Bedroom Design", desc: "Your sanctuary, perfectly crafted", price: "From ₹1.2L" },
  { icon: "🛋", name: "Living Room", desc: "First impressions that last forever", price: "From ₹1.5L" },
  { icon: "🚪", name: "Wardrobes", desc: "Organized spaces, elegant doors", price: "From ₹85K" },
  { icon: "✨", name: "False Ceiling", desc: "Layered light, elevated atmosphere", price: "From ₹45K" },
  { icon: "💼", name: "Office Interior", desc: "Workspaces that inspire productivity", price: "From ₹2.5L" },
];

const CHAT_MESSAGES = [
  { from: "team", text: "Hi Arun! Your installation at Living Room Interior is progressing well. 75% complete!", time: "10:30 AM" },
  { from: "user", text: "Great! How many more days for completion?", time: "10:32 AM" },
  { from: "team", text: "We estimate 8-10 more working days. The wardrobes are being fitted today.", time: "10:33 AM" },
  { from: "user", text: "Can I visit the site tomorrow around 4 PM?", time: "10:35 AM" },
  { from: "team", text: "Absolutely! We'll inform the site supervisor. Looking forward to your visit! 🏡", time: "10:36 AM" },
];

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const styles = {
  cream: "#FAF8F5",
  charcoal: "#1A1A1A",
  gold: "#C9A96E",
  goldLight: "#E8D5B0",
  sage: "#7A9E7E",
  warm: "#F5EDE0",
  darkCard: "#2A2A2A",
  border: "rgba(0,0,0,0.08)",
  borderGold: "rgba(201,169,110,0.3)",
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
const Tag = ({ children, active, onClick }) => (
  <button onClick={onClick} style={{
    padding: "6px 16px", borderRadius: 100, border: `1px solid ${active ? styles.gold : styles.border}`,
    background: active ? styles.gold : "transparent", color: active ? "#fff" : styles.charcoal,
    fontSize: 13, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif",
    transition: "all 0.2s", fontWeight: active ? 600 : 400,
  }}>{children}</button>
);

const Badge = ({ children, color = styles.gold }) => (
  <span style={{
    display: "inline-block", padding: "3px 10px", borderRadius: 100,
    background: color + "20", color, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em",
  }}>{children}</span>
);

const StarRating = ({ rating }) => (
  <span style={{ color: styles.gold, fontSize: 13 }}>
    {"★".repeat(rating)}{"☆".repeat(5 - rating)}
  </span>
);

const ProgressBar = ({ pct, color = styles.gold }) => (
  <div style={{ background: "#eee", borderRadius: 100, height: 6, overflow: "hidden" }}>
    <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 100, transition: "width 0.8s ease" }} />
  </div>
);

const Card = ({ children, style = {} }) => (
  <div style={{
    background: "#fff", borderRadius: 16, border: `1px solid ${styles.border}`,
    overflow: "hidden", ...style,
  }}>{children}</div>
);

const ProjectCard = ({ project, onClick }) => (
  <Card style={{ cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
    onClick={() => onClick(project)}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
    <div style={{ position: "relative", paddingBottom: "65%", overflow: "hidden" }}>
      <img src={project.img} alt={project.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.currentTarget.style.transform = ""} />
      <div style={{ position: "absolute", top: 12, right: 12 }}>
        <Badge>{project.style}</Badge>
      </div>
    </div>
    <div style={{ padding: "16px 20px 20px" }}>
      <p style={{ fontSize: 16, fontWeight: 700, margin: "0 0 4px", color: styles.charcoal }}>{project.name}</p>
      <p style={{ fontSize: 13, color: "#888", margin: "0 0 12px" }}>📍 {project.location} · {project.sqft} sq ft</p>
      <div style={{ display: "flex", gap: 16 }}>
        <div><p style={{ fontSize: 11, color: "#aaa", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Budget</p><p style={{ fontSize: 15, fontWeight: 700, color: styles.gold, margin: 0 }}>{project.budget}</p></div>
        <div><p style={{ fontSize: 11, color: "#aaa", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Duration</p><p style={{ fontSize: 15, fontWeight: 700, color: styles.charcoal, margin: 0 }}>{project.duration}</p></div>
      </div>
    </div>
  </Card>
);

const SectionHeader = ({ label, title, subtitle }) => (
  <div style={{ textAlign: "center", marginBottom: 48 }}>
    {label && <p style={{ color: styles.gold, fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 12px" }}>{label}</p>}
    <h2 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 12px", color: styles.charcoal, lineHeight: 1.2 }}>{title}</h2>
    {subtitle && <p style={{ color: "#777", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>{subtitle}</p>}
  </div>
);

// ─── PAGES ───────────────────────────────────────────────────────────────────

// HOME PAGE
function HomePage({ navigate }) {
  const [activeArea, setActiveArea] = useState(null);
  const areas = [
    { name: "Anna Nagar", x: 180, y: 80, projects: 45 },
    { name: "Velachery", x: 300, y: 220, projects: 38 },
    { name: "OMR", x: 380, y: 280, projects: 52 },
    { name: "Madurai", x: 200, y: 300, projects: 29 },
    { name: "Coimbatore", x: 100, y: 200, projects: 31 },
    { name: "Trichy", x: 270, y: 180, projects: 43 },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="section-padding" style={{
        background: `linear-gradient(135deg, #1A1A1A 0%, #2D2520 100%)`,
        minHeight: 580, display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img src="/hero-bg.png" alt="luxury interior"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
          <div className="hero-overlay" />
        </div>
        <div style={{ position: "relative", maxWidth: 560 }}>
          <p style={{ color: styles.gold, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 20px" }}>Chennai's Premier Design Studio</p>
          <h1 className="hero-title" style={{ fontWeight: 800, margin: "0 0 24px", lineHeight: 1.1 }}>
            Luxury Interiors<br /><span style={{ color: styles.gold }}>Crafted For</span><br />Modern Living
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 17, margin: "0 0 40px", lineHeight: 1.7 }}>
            Transforming Chennai homes into timeless sanctuaries. Premium materials, expert craftsmanship, on-time delivery.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
            <button onClick={() => navigate("booking")} style={{
              background: styles.gold, color: "#fff", border: "none", padding: "14px 28px",
              borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif",
            }}>Book Consultation</button>
            <button onClick={() => navigate("estimator")} style={{
              background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)",
              padding: "14px 28px", borderRadius: 100, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif",
            }}>Get Cost Estimate →</button>
          </div>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[["500+", "Projects Completed"], ["4.9", "Customer Rating"], ["12 Yrs", "Experience"]].map(([val, label]) => (
              <div key={label}>
                <p style={{ color: styles.gold, fontSize: 28, fontWeight: 800, margin: "0 0 4px" }}>{val}</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="section-padding" style={{ background: styles.cream }}>
        <SectionHeader label="Our Work" title="Featured Projects" subtitle="Handpicked transformations from Chennai's finest homes and offices" />
        <div className="grid-3" style={{ marginBottom: 40 }}>
          {PROJECTS.slice(0, 6).map(p => <ProjectCard key={p.id} project={p} onClick={() => navigate("portfolio")} />)}
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => navigate("portfolio")} style={{
            background: "transparent", color: styles.charcoal, border: `1.5px solid ${styles.charcoal}`,
            padding: "12px 32px", borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif",
          }}>View All 500+ Projects →</button>
        </div>
      </div>

      {/* Services */}
      <div className="section-padding" style={{ background: "#fff" }}>
        <SectionHeader label="Services" title="What We Design" subtitle="End-to-end interior solutions for every space in your home" />
        <div className="grid-3">
          {SERVICES.map(s => (
            <div key={s.name} style={{
              padding: "28px 24px", background: styles.cream, borderRadius: 16, border: `1px solid ${styles.border}`,
              cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = styles.charcoal; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = styles.cream; e.currentTarget.style.color = ""; }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
              <p style={{ fontSize: 17, fontWeight: 700, margin: "0 0 6px" }}>{s.name}</p>
              <p style={{ fontSize: 13, color: "#888", margin: "0 0 12px", lineHeight: 1.5 }}>{s.desc}</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: styles.gold, margin: 0 }}>{s.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="section-padding" style={{ background: styles.charcoal }}>
        <SectionHeader label="Reviews" title={<span style={{ color: "#fff" }}>What Clients Say</span>} subtitle={<span style={{ color: "#aaa" }}>500+ happy families across Chennai</span>} />
        <div className="grid-3">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <div key={i} style={{ background: styles.darkCard, padding: "28px 24px", borderRadius: 16, border: `1px solid rgba(255,255,255,0.08)` }}>
              <StarRating rating={t.rating} />
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.7, margin: "12px 0 20px" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: styles.gold, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>{t.avatar}</div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: 0 }}>{t.name}</p>
                  <p style={{ color: "#888", fontSize: 12, margin: 0 }}>{t.project} · {t.area}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Areas Map */}
      <div className="section-padding" style={{ background: styles.cream }}>
        <SectionHeader label="Coverage" title="We Serve All of Chennai" subtitle="Our design teams are active across major residential and commercial hubs" />
        <div className="map-card" style={{ border: `1px solid ${styles.border}` }}>
          <div className="map-section-wrapper">
            <div className="map-svg-container">
              <svg viewBox="0 0 500 380" style={{ width: "100%", height: "100%", display: "block" }}>
                <rect width="500" height="380" fill="#f0ece6" rx="12" />
                {/* Chennai simplified map background */}
                <path d="M 80 30 Q 200 20 350 60 Q 420 90 440 180 Q 450 260 400 320 Q 360 360 300 370 Q 200 375 150 340 Q 80 300 60 220 Q 40 150 80 30 Z" fill="#e8e0d5" stroke="#d4c8b8" strokeWidth="1.5" />
                <text x="250" y="20" textAnchor="middle" fill="#aaa" fontSize="11" fontWeight="500">Bay of Bengal →</text>

                {areas.map((a, i) => (
                  <g key={a.name} onClick={() => setActiveArea(activeArea?.name === a.name ? null : a)} style={{ cursor: "pointer" }}>
                    <circle cx={a.x} cy={a.y} r={activeArea?.name === a.name ? 20 : 14} fill={activeArea?.name === a.name ? styles.gold : "#fff"} stroke={styles.gold} strokeWidth="2" style={{ transition: "all 0.2s" }} />
                    <text x={a.x} y={a.y + 4} textAnchor="middle" fill={activeArea?.name === a.name ? "#fff" : styles.gold} fontSize="8" fontWeight="700">●</text>
                    <text x={a.x} y={a.y + 30} textAnchor="middle" fill={styles.charcoal} fontSize="11" fontWeight="600">{a.name}</text>
                  </g>
                ))}
              </svg>
            </div>
            {activeArea && (
              <div className="map-detail-card">
                <p style={{ fontWeight: 700, fontSize: 16, margin: "0 0 4px", color: styles.charcoal }}>{activeArea.name}</p>
                <p style={{ color: styles.gold, fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>{activeArea.projects}</p>
                <p style={{ color: "#888", fontSize: 12, margin: 0 }}>Projects completed</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="section-padding" style={{ background: styles.gold, textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: 40, fontWeight: 800, margin: "0 0 16px" }}>Ready to Transform Your Space?</h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 17, margin: "0 0 32px" }}>Get a free consultation and design concept within 48 hours</p>
        <button onClick={() => navigate("booking")} style={{
          background: "#fff", color: styles.gold, border: "none", padding: "16px 40px",
          borderRadius: 100, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif",
        }}>Book Free Consultation →</button>
      </div>
    </div>
  );
}

// PORTFOLIO PAGE
function PortfolioPage({ navigate }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [beforeAfter, setBeforeAfter] = useState(50);
  const filters = ["All", "Apartment", "Villa", "Office", "Luxury", "Modern", "Minimalist", "Scandinavian"];

  const filtered = activeFilter === "All" ? PROJECTS : PROJECTS.filter(p => p.type === activeFilter || p.style === activeFilter);

  if (selectedProject) {
    return (
      <div className="page-padding">
        <button onClick={() => setSelectedProject(null)} style={{
          background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#888",
          marginBottom: 24, padding: 0, fontFamily: "Instrument Sans, sans-serif", display: "flex", alignItems: "center", gap: 6,
        }}>← Back to Portfolio</button>

        <div className="portfolio-details-grid">
          <div>
            <img src={selectedProject.img} alt={selectedProject.name} style={{ width: "100%", height: 400, objectFit: "cover", borderRadius: 16, marginBottom: 24 }} />

            {/* Before/After Slider */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Before / After</h3>
                <span style={{ fontSize: 13, color: "#888" }}>Drag to reveal</span>
              </div>
              <div style={{ position: "relative", height: 280, borderRadius: 12, overflow: "hidden", border: `1px solid ${styles.border}` }}>
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", width: `${beforeAfter}%` }}>
                  <img src={selectedProject.img} style={{ width: `${10000 / beforeAfter}%`, height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ position: "absolute", top: 0, bottom: 0, left: `${beforeAfter}%`, width: 3, background: "#fff", transform: "translateX(-50%)" }} />
                <div style={{ position: "absolute", top: "50%", left: `${beforeAfter}%`, transform: "translate(-50%, -50%)", background: "#fff", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.2)", fontSize: 14, cursor: "ew-resize" }}>⟺</div>
                <div style={{ position: "absolute", top: 12, left: 12 }}><Badge color="#fff">Before</Badge></div>
                <div style={{ position: "absolute", top: 12, right: 12 }}><Badge color={styles.gold}>After</Badge></div>
                <input type="range" min="10" max="90" value={beforeAfter} onChange={e => setBeforeAfter(+e.target.value)}
                  style={{ position: "absolute", inset: 0, opacity: 0, cursor: "ew-resize", width: "100%", height: "100%" }} />
              </div>
            </div>

            {/* Design Process */}
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Design Process</h3>
              <div style={{ display: "flex", gap: 0, flexWrap: "wrap", justifyContent: "center" }}>
                {["Consultation", "Concept", "3D Design", "Approval", "Execution", "Handover"].map((step, i) => (
                  <div key={step} style={{ flex: "1 1 100px", minWidth: 80, textAlign: "center", marginBottom: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: i < 5 ? styles.gold : "#eee", color: i < 5 ? "#fff" : "#aaa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, margin: "0 auto 8px" }}>{i + 1}</div>
                    <p style={{ fontSize: 11, color: i < 5 ? styles.charcoal : "#aaa", margin: 0, fontWeight: i < 5 ? 600 : 400 }}>{step}</p>
                    {i < 5 && <div className="step-connector" style={{ background: i < 4 ? styles.gold : "#eee" }} />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Badge>{selectedProject.style}</Badge>
            <h1 style={{ fontSize: 28, fontWeight: 800, margin: "12px 0 4px" }}>{selectedProject.name}</h1>
            <p style={{ color: "#888", margin: "0 0 24px" }}>📍 {selectedProject.location}</p>

            <div className="grid-2" style={{ marginBottom: 24 }}>
              {[["Budget", selectedProject.budget, styles.gold], ["Duration", selectedProject.duration, "#333"], ["Area", `${selectedProject.sqft} sq ft`, "#333"], ["Completed", selectedProject.date, "#333"]].map(([label, val, color]) => (
                <div key={label} style={{ background: styles.cream, padding: "16px", borderRadius: 12 }}>
                  <p style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>{label}</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color, margin: 0 }}>{val}</p>
                </div>
              ))}
            </div>

            {/* Materials Used */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 12px" }}>Materials Used</h3>
              {["HDHMR Board", "Acrylic High Gloss", "Wooden Veneer", "Matte Laminate"].map(m => (
                <div key={m} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: styles.gold }} />
                  <span style={{ fontSize: 13, color: "#555" }}>{m}</span>
                </div>
              ))}
            </div>

            {/* Client Review */}
            <div style={{ background: styles.charcoal, padding: 20, borderRadius: 16 }}>
              <StarRating rating={5} />
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, lineHeight: 1.7, margin: "12px 0 16px" }}>
                "The team delivered a stunning result that exceeded every expectation. Our home feels like a luxury hotel now."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: styles.gold, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12 }}>AK</div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, margin: 0 }}>Arun Kumar</p>
                  <p style={{ color: "#888", fontSize: 11, margin: 0 }}>Verified Client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <SectionHeader label="Portfolio" title="500+ Completed Projects" subtitle="Browse our finest work across apartments, villas, and offices" />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
        {filters.map(f => <Tag key={f} active={activeFilter === f} onClick={() => setActiveFilter(f)}>{f}</Tag>)}
      </div>
      <div className="grid-3">
        {filtered.map(p => <ProjectCard key={p.id} project={p} onClick={setSelectedProject} />)}
      </div>
    </div>
  );
}

// AI ROOM DESIGNER
function AIDesignerPage() {
  const [step, setStep] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const styles_list = [
    { name: "Modern", img: "/hero-bg.png", desc: "Clean lines, bold geometry" },
    { name: "Luxury", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&q=80", desc: "Opulent textures, gold accents" },
    { name: "Scandinavian", img: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=300&q=80", desc: "Light wood, cozy minimalism" },
    { name: "Minimal", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80", desc: "Less is more, pure form" },
  ];

  const results = [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=400&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
  ];

  const handleUpload = () => { setUploading(true); setTimeout(() => { setUploading(false); setUploaded(true); setStep(1); }, 1500); };
  const handleGenerate = () => { setGenerating(true); setTimeout(() => { setGenerating(false); setGenerated(true); setStep(3); }, 2500); };

  return (
    <div className="page-padding" style={{ maxWidth: 900, margin: "0 auto" }}>
      <SectionHeader label="AI-Powered" title="Room Designer" subtitle="Upload your room photo and get instant AI-generated design concepts" />

      {/* Steps */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 48, gap: 0, flexWrap: "wrap" }}>
        {["Upload Room", "Choose Style", "Generate", "Results"].map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: step >= i ? styles.gold : "#eee",
                color: step >= i ? "#fff" : "#aaa",
                display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14,
              }}>{i + 1}</div>
              <span style={{ fontSize: 12, color: step >= i ? styles.charcoal : "#aaa", fontWeight: step === i ? 700 : 400 }}>{s}</span>
            </div>
            {i < 3 && <div className="progress-step-connector" style={{ background: step > i ? styles.gold : "#eee" }} />}
          </div>
        ))}
      </div>

      {/* Step 0: Upload */}
      {step === 0 && (
        <div style={{
          border: `2px dashed ${uploading ? styles.gold : "#ddd"}`, borderRadius: 20,
          padding: "80px 40px", textAlign: "center", background: styles.cream, transition: "all 0.3s",
        }}>
          {uploading ? (
            <div>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
              <p style={{ fontSize: 18, fontWeight: 600 }}>Uploading your room photo...</p>
              <div style={{ width: 200, margin: "16px auto 0" }}><ProgressBar pct={75} /></div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 64, marginBottom: 16 }}>📷</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>Upload Your Room Photo</h3>
              <p style={{ color: "#888", margin: "0 0 24px" }}>Supports JPG, PNG up to 10MB. Best results with natural lighting.</p>
              <button onClick={handleUpload} style={{
                background: styles.gold, color: "#fff", border: "none", padding: "14px 32px",
                borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif",
              }}>Choose Photo</button>
            </div>
          )}
        </div>
      )}

      {/* Step 1: Choose Style */}
      {step === 1 && (
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, textAlign: "center", marginBottom: 24 }}>Choose Your Design Style</h3>
          <div className="grid-2" style={{ marginBottom: 32 }}>
            {styles_list.map(s => (
              <div key={s.name} onClick={() => setSelectedStyle(s.name)} style={{
                borderRadius: 16, overflow: "hidden", cursor: "pointer",
                border: `2px solid ${selectedStyle === s.name ? styles.gold : "transparent"}`,
                transition: "all 0.2s", transform: selectedStyle === s.name ? "scale(1.02)" : "scale(1)",
              }}>
                <div style={{ position: "relative", paddingBottom: "60%", overflow: "hidden" }}>
                  <img src={s.img} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  {selectedStyle === s.name && (
                    <div style={{ position: "absolute", top: 12, right: 12, width: 28, height: 28, borderRadius: "50%", background: styles.gold, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>✓</div>
                  )}
                </div>
                <div style={{ padding: "14px 16px", background: "#fff" }}>
                  <p style={{ fontWeight: 700, margin: "0 0 4px" }}>{s.name}</p>
                  <p style={{ fontSize: 13, color: "#888", margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <button onClick={() => setStep(0)} style={{ background: "#f5f5f5", color: "#333", border: "none", padding: "12px 24px", borderRadius: 100, fontSize: 14, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>Back</button>
            <button onClick={() => setStep(2)} disabled={!selectedStyle} style={{
              background: selectedStyle ? styles.gold : "#ddd", color: "#fff", border: "none",
              padding: "12px 32px", borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: selectedStyle ? "pointer" : "not-allowed", fontFamily: "Instrument Sans, sans-serif",
            }}>Continue →</button>
          </div>
        </div>
      )}

      {/* Step 2: Generate */}
      {step === 2 && (
        <div style={{ textAlign: "center" }}>
          <div style={{ background: styles.cream, borderRadius: 20, padding: 40, marginBottom: 32 }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>Ready to Generate!</h3>
            <p style={{ color: "#888", margin: "0 0 24px" }}>Style: <strong>{selectedStyle}</strong> · AI will create 4 unique design concepts</p>
            {generating ? (
              <div>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🤖</div>
                <p style={{ fontWeight: 600 }}>AI is designing your space...</p>
                <div style={{ width: 300, margin: "16px auto 0" }}><ProgressBar pct={65} /></div>
                <p style={{ fontSize: 13, color: "#aaa", marginTop: 8 }}>Analysing dimensions · Applying {selectedStyle} aesthetics · Rendering concepts</p>
              </div>
            ) : (
              <button onClick={handleGenerate} style={{
                background: styles.charcoal, color: "#fff", border: "none", padding: "16px 48px",
                borderRadius: 100, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif",
              }}>✨ Generate Design Concepts</button>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 3 && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>4 Design Concepts Generated · {selectedStyle} Style</h3>
            <button onClick={() => { setStep(0); setUploaded(false); setSelectedStyle(null); setGenerated(false); }} style={{
              background: styles.cream, border: "none", padding: "8px 16px", borderRadius: 100,
              fontSize: 13, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif",
            }}>Try Another Room</button>
          </div>
          <div className="grid-2" style={{ marginBottom: 24 }}>
            {results.map((r, i) => (
              <div key={i} style={{ position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.querySelector(".overlay").style.opacity = "1"}
                onMouseLeave={e => e.currentTarget.querySelector(".overlay").style.opacity = "0"}>
                <img src={r} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
                <div className="overlay" style={{
                  position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)",
                  display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.3s",
                }}>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ color: "#fff", fontWeight: 700, margin: "0 0 12px" }}>Concept {i + 1}</p>
                    <button style={{ background: styles.gold, color: "#fff", border: "none", padding: "8px 20px", borderRadius: 100, fontSize: 13, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>Use This Design</button>
                  </div>
                </div>
                <div style={{ position: "absolute", top: 12, left: 12 }}><Badge>Concept {i + 1}</Badge></div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button style={{ background: styles.gold, color: "#fff", border: "none", padding: "14px 40px", borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>Book Consultation to Execute This Design →</button>
          </div>
        </div>
      )}
    </div>
  );
}

// COST ESTIMATOR
function EstimatorPage() {
  const [step, setStep] = useState(0);
  const [propertyType, setPropertyType] = useState(null);
  const [size, setSize] = useState(null);
  const [quality, setQuality] = useState(null);

  const types = [
    { name: "Apartment", icon: "🏢", desc: "1BHK to 4BHK flats" },
    { name: "Villa", icon: "🏡", desc: "Independent houses & villas" },
    { name: "Office", icon: "💼", desc: "Commercial & co-working spaces" },
  ];

  const sizes = ["600 sq ft", "1000 sq ft", "1500 sq ft", "2000 sq ft", "Custom"];

  const getEstimates = () => {
    const base = size === "600 sq ft" ? 100 : size === "1000 sq ft" ? 160 : size === "1500 sq ft" ? 230 : 310;
    return [
      { tier: "Economy", price: `₹${(base * 0.45 / 100).toFixed(1)} Lakhs`, desc: "Basic finishes, standard brands", features: ["Plywood furniture", "POP ceiling", "Basic flooring"] },
      { tier: "Standard", price: `₹${(base * 0.7 / 100).toFixed(1)} Lakhs`, desc: "Mid-range brands, good quality", features: ["HDHMR furniture", "Grid ceiling", "Laminate flooring"] },
      { tier: "Premium", price: `₹${(base / 100).toFixed(1)} Lakhs`, desc: "Premium brands, superior finish", features: ["Acrylic kitchen", "Designer ceiling", "Hardwood flooring"] },
      { tier: "Luxury", price: `₹${(base * 1.5 / 100).toFixed(1)} Lakhs`, desc: "Imported materials, signature design", features: ["Custom imported furniture", "Statement ceiling", "Italian marble"] },
    ];
  };

  return (
    <div className="page-padding" style={{ maxWidth: 800, margin: "0 auto" }}>
      <SectionHeader label="Smart Pricing" title="AI Cost Estimator" subtitle="Get an instant, accurate cost estimate for your interior project" />

      {/* Progress */}
      <div style={{ display: "flex", gap: 8, marginBottom: 48 }}>
        {["Property Type", "Property Size", "Quality Level", "Your Estimate"].map((s, i) => (
          <div key={s} style={{ flex: 1, height: 4, borderRadius: 100, background: step >= i ? styles.gold : "#eee", transition: "background 0.3s" }} />
        ))}
      </div>

      {step === 0 && (
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, textAlign: "center", marginBottom: 24 }}>What type of property?</h3>
          <div className="grid-3" style={{ marginBottom: 32 }}>
            {types.map(t => (
              <div key={t.name} onClick={() => setPropertyType(t.name)} style={{
                padding: "32px 24px", textAlign: "center", borderRadius: 16, border: `2px solid ${propertyType === t.name ? styles.gold : styles.border}`,
                cursor: "pointer", background: propertyType === t.name ? styles.gold + "15" : "#fff", transition: "all 0.2s",
              }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>{t.icon}</div>
                <p style={{ fontWeight: 700, fontSize: 16, margin: "0 0 4px" }}>{t.name}</p>
                <p style={{ fontSize: 13, color: "#888", margin: 0 }}>{t.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button onClick={() => propertyType && setStep(1)} style={{
              background: propertyType ? styles.gold : "#ddd", color: "#fff", border: "none",
              padding: "14px 40px", borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: propertyType ? "pointer" : "not-allowed", fontFamily: "Instrument Sans, sans-serif",
            }}>Continue →</button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, textAlign: "center", marginBottom: 24 }}>Property size?</h3>
          <div className="grid-3" style={{ marginBottom: 32 }}>
            {sizes.map(s => (
              <div key={s} onClick={() => setSize(s)} style={{
                padding: "20px", textAlign: "center", borderRadius: 12, border: `2px solid ${size === s ? styles.gold : styles.border}`,
                cursor: "pointer", background: size === s ? styles.gold + "15" : "#fff", fontWeight: size === s ? 700 : 500,
                fontSize: 15, transition: "all 0.2s",
              }}>{s}</div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <button onClick={() => setStep(0)} style={{ background: "#f5f5f5", color: "#333", border: "none", padding: "12px 24px", borderRadius: 100, fontSize: 14, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>Back</button>
            <button onClick={() => size && setStep(2)} style={{ background: size ? styles.gold : "#ddd", color: "#fff", border: "none", padding: "12px 32px", borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: size ? "pointer" : "not-allowed", fontFamily: "Instrument Sans, sans-serif" }}>Continue →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, textAlign: "center", marginBottom: 8 }}>What's your quality preference?</h3>
          <p style={{ color: "#888", textAlign: "center", marginBottom: 24 }}>This determines material grade and brand selection</p>
          <div className="grid-2" style={{ marginBottom: 32 }}>
            {["Economy", "Standard", "Premium", "Luxury"].map(q => (
              <div key={q} onClick={() => setQuality(q)} style={{
                padding: "20px 24px", borderRadius: 12, border: `2px solid ${quality === q ? styles.gold : styles.border}`,
                cursor: "pointer", background: quality === q ? styles.gold + "15" : "#fff", transition: "all 0.2s",
              }}>
                <p style={{ fontWeight: 700, fontSize: 16, margin: "0 0 4px" }}>{q}</p>
                <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
                  {q === "Economy" ? "₹800–1000/sq ft · Basic finishes" : q === "Standard" ? "₹1200–1500/sq ft · Good quality" : q === "Premium" ? "₹1800–2200/sq ft · Premium brands" : "₹2500+/sq ft · Imported materials"}
                </p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <button onClick={() => setStep(1)} style={{ background: "#f5f5f5", color: "#333", border: "none", padding: "12px 24px", borderRadius: 100, fontSize: 14, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>Back</button>
            <button onClick={() => quality && setStep(3)} style={{ background: quality ? styles.gold : "#ddd", color: "#fff", border: "none", padding: "12px 32px", borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: quality ? "pointer" : "not-allowed", fontFamily: "Instrument Sans, sans-serif" }}>Get My Estimate →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <p style={{ color: "#888", fontSize: 14 }}>{propertyType} · {size} · {quality} preference</p>
            <h3 style={{ fontSize: 24, fontWeight: 800, margin: "4px 0" }}>Your Cost Estimates</h3>
          </div>
          <div className="grid-2" style={{ marginBottom: 32 }}>
            {getEstimates().map((e, i) => (
              <div key={e.tier} style={{
                padding: "24px", borderRadius: 16,
                background: e.tier === quality ? styles.charcoal : "#fff",
                border: `2px solid ${e.tier === quality ? styles.charcoal : styles.border}`,
              }}>
                {e.tier === quality && <p style={{ color: styles.gold, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>Your Selection</p>}
                <p style={{ fontWeight: 700, fontSize: 16, color: e.tier === quality ? "#fff" : styles.charcoal, margin: "0 0 4px" }}>{e.tier}</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: e.tier === quality ? styles.gold : styles.charcoal, margin: "0 0 8px" }}>{e.price}</p>
                <p style={{ fontSize: 13, color: e.tier === quality ? "rgba(255,255,255,0.6)" : "#888", margin: "0 0 12px" }}>{e.desc}</p>
                {e.features.map(f => <p key={f} style={{ fontSize: 12, color: e.tier === quality ? "rgba(255,255,255,0.7)" : "#666", margin: "4px 0", display: "flex", alignItems: "center", gap: 6 }}><span style={{ color: styles.gold }}>✓</span> {f}</p>)}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => { setStep(0); setPropertyType(null); setSize(null); setQuality(null); }} style={{ background: "#f5f5f5", color: "#333", border: "none", padding: "12px 24px", borderRadius: 100, fontSize: 14, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>Start Over</button>
            <button style={{ background: styles.gold, color: "#fff", border: "none", padding: "14px 32px", borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>Book Free Consultation →</button>
          </div>
        </div>
      )}
    </div>
  );
}

// BOOKING PAGE
function BookingPage() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [booked, setBooked] = useState(false);

  const dates = ["Mon, 12 Jun", "Tue, 13 Jun", "Wed, 14 Jun", "Thu, 15 Jun", "Fri, 16 Jun", "Sat, 17 Jun"];
  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

  const handleSubmit = () => { if (name && phone) setBooked(true); };

  if (booked) {
    return (
      <div className="section-padding" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
        <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 12px" }}>Consultation Booked!</h2>
        <p style={{ color: "#777", fontSize: 16, margin: "0 0 32px", lineHeight: 1.7 }}>
          Your free consultation has been confirmed. A design expert will call you at your preferred time.
        </p>
        <div style={{ background: styles.cream, borderRadius: 16, padding: 24, textAlign: "left", marginBottom: 32 }}>
          {[["Service", service], ["Date", date], ["Time", time], ["Name", name], ["Phone", phone]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${styles.border}` }}>
              <span style={{ color: "#888", fontSize: 14 }}>{l}</span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{v}</span>
            </div>
          ))}
        </div>
        <p style={{ color: "#888", fontSize: 14, margin: "0 0 24px" }}>Confirmation sent to {phone}. We'll WhatsApp you with a reminder.</p>
        <button onClick={() => { setBooked(false); setStep(0); setService(null); setDate(null); setTime(null); setName(""); setPhone(""); }} style={{
          background: styles.gold, color: "#fff", border: "none", padding: "14px 32px",
          borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif",
        }}>Book Another Slot</button>
      </div>
    );
  }

  return (
    <div className="page-padding" style={{ maxWidth: 700, margin: "0 auto" }}>
      <SectionHeader label="Free Consultation" title="Book Your Design Session" subtitle="Speak with our expert designer. 100% free, no obligations." />

      <div style={{ display: "flex", gap: 8, marginBottom: 40 }}>
        {["Select Service", "Choose Date", "Choose Time", "Your Details"].map((s, i) => (
          <div key={s} style={{ flex: 1, height: 4, borderRadius: 100, background: step >= i ? styles.gold : "#eee" }} />
        ))}
      </div>

      {step === 0 && (
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>What service are you interested in?</h3>
          <div className="grid-2" style={{ marginBottom: 32 }}>
            {SERVICES.map(s => (
              <div key={s.name} onClick={() => setService(s.name)} style={{
                padding: "16px 20px", borderRadius: 12, border: `2px solid ${service === s.name ? styles.gold : styles.border}`,
                cursor: "pointer", background: service === s.name ? styles.gold + "15" : "#fff",
                display: "flex", gap: 12, alignItems: "center", transition: "all 0.2s",
              }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{s.name}</p>
                  <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{s.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "right" }}>
            <button onClick={() => service && setStep(1)} style={{ background: service ? styles.gold : "#ddd", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: service ? "pointer" : "not-allowed", fontFamily: "Instrument Sans, sans-serif" }}>Next →</button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Select a date</h3>
          <div className="grid-3" style={{ marginBottom: 32 }}>
            {dates.map(d => (
              <div key={d} onClick={() => setDate(d)} style={{
                padding: "16px", textAlign: "center", borderRadius: 12, border: `2px solid ${date === d ? styles.gold : styles.border}`,
                cursor: "pointer", background: date === d ? styles.gold + "15" : "#fff", fontWeight: date === d ? 700 : 400, transition: "all 0.2s",
              }}>{d}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button onClick={() => setStep(0)} style={{ background: "#f5f5f5", color: "#333", border: "none", padding: "12px 20px", borderRadius: 100, fontSize: 14, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>Back</button>
            <button onClick={() => date && setStep(2)} style={{ background: date ? styles.gold : "#ddd", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: date ? "pointer" : "not-allowed", fontFamily: "Instrument Sans, sans-serif" }}>Next →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Choose a time slot</h3>
          <div className="grid-4" style={{ marginBottom: 32 }}>
            {times.map(t => (
              <div key={t} onClick={() => setTime(t)} style={{
                padding: "14px", textAlign: "center", borderRadius: 12, border: `2px solid ${time === t ? styles.gold : styles.border}`,
                cursor: "pointer", background: time === t ? styles.gold + "15" : "#fff", fontWeight: time === t ? 700 : 400, fontSize: 14, transition: "all 0.2s",
              }}>{t}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button onClick={() => setStep(1)} style={{ background: "#f5f5f5", color: "#333", border: "none", padding: "12px 20px", borderRadius: 100, fontSize: 14, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>Back</button>
            <button onClick={() => time && setStep(3)} style={{ background: time ? styles.gold : "#ddd", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: time ? "pointer" : "not-allowed", fontFamily: "Instrument Sans, sans-serif" }}>Next →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Your details</h3>
          <div style={{ marginBottom: 32 }}>
            {[["Full Name", name, setName, "text", "e.g. Arun Kumar"], ["Phone / WhatsApp", phone, setPhone, "tel", "+91 98765 43210"]].map(([label, val, setter, type, ph]) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 6 }}>{label}</label>
                <input type={type} value={val} onChange={e => setter(e.target.value)} placeholder={ph} style={{
                  width: "100%", padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${styles.border}`,
                  fontSize: 15, outline: "none", fontFamily: "Instrument Sans, sans-serif", boxSizing: "border-box",
                }} onFocus={e => e.target.style.borderColor = styles.gold} onBlur={e => e.target.style.borderColor = styles.border} />
              </div>
            ))}
            <div style={{ background: styles.cream, borderRadius: 12, padding: "16px 20px" }}>
              <p style={{ fontSize: 13, color: "#666", margin: 0 }}>
                📅 <strong>{date}</strong> at <strong>{time}</strong> · {service}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button onClick={() => setStep(2)} style={{ background: "#f5f5f5", color: "#333", border: "none", padding: "12px 20px", borderRadius: 100, fontSize: 14, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>Back</button>
            <button onClick={handleSubmit} style={{ background: styles.gold, color: "#fff", border: "none", padding: "12px 32px", borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>Confirm Booking ✓</button>
          </div>
        </div>
      )}
    </div>
  );
}

// CUSTOMER DASHBOARD
function DashboardPage() {
  const [activeTab, setActiveTab] = useState("tracker");
  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState(CHAT_MESSAGES);

  const sendMsg = () => {
    if (!newMsg.trim()) return;
    setMessages([...messages, { from: "user", text: newMsg, time: "Now" }]);
    setNewMsg("");
    setTimeout(() => {
      setMessages(m => [...m, { from: "team", text: "Thanks for your message! Our team will get back to you shortly.", time: "Just now" }]);
    }, 1000);
  };

  const stages = [
    { label: "Consultation", done: true },
    { label: "Design Approval", done: true },
    { label: "Material Selection", done: true },
    { label: "Manufacturing", done: true },
    { label: "Installation", done: false, active: true },
    { label: "Handover", done: false },
  ];

  return (
    <div className="page-padding">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <p style={{ color: styles.gold, fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 6px" }}>Welcome back</p>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 4px" }}>Good Morning, Arun Kumar! 👋</h1>
          <p style={{ color: "#888", margin: 0 }}>Living Room Interior · Anna Nagar</p>
        </div>
        <div style={{ textAlign: "left" }}>
          <Badge color={styles.sage}>Installation Phase</Badge>
          <p style={{ color: "#888", fontSize: 13, margin: "8px 0 0" }}>Est. Completion: Jun 24, 2024</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        {[["75%", "Project Progress", styles.gold], ["₹18L", "Project Value", "#3A7BD5"], ["8 Days", "Est. Remaining", styles.sage], ["⭐ 5.0", "Design Rating", "#E8A838"]].map(([v, l, c]) => (
          <div key={l} style={{ background: "#fff", border: `1px solid ${styles.border}`, borderRadius: 16, padding: "20px 24px" }}>
            <p style={{ fontSize: 26, fontWeight: 800, color: c, margin: "0 0 4px" }}>{v}</p>
            <p style={{ fontSize: 13, color: "#888", margin: 0 }}>{l}</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ background: "#fff", border: `1px solid ${styles.border}`, borderRadius: 16, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontWeight: 600, fontSize: 14 }}>Overall Progress</span>
          <span style={{ fontWeight: 700, color: styles.gold }}>75%</span>
        </div>
        <ProgressBar pct={75} />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#f5f5f5", padding: 4, borderRadius: 12, width: "fit-content", flexWrap: "wrap" }}>
        {[["tracker", "Project Tracker"], ["docs", "Documents"], ["messages", "Messages"], ["meetings", "Meetings"]].map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{
            padding: "8px 18px", borderRadius: 8, border: "none",
            background: activeTab === id ? "#fff" : "transparent",
            fontWeight: activeTab === id ? 700 : 400, fontSize: 13, cursor: "pointer",
            color: activeTab === id ? styles.charcoal : "#888",
            fontFamily: "Instrument Sans, sans-serif",
            boxShadow: activeTab === id ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
            transition: "all 0.2s",
          }}>{label}</button>
        ))}
      </div>

      {activeTab === "tracker" && (
        <div className="grid-2">
          <Card style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 20px" }}>Project Stages</h3>
            {stages.map((s, i) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: s.done ? styles.gold : s.active ? "#fff" : "#f5f5f5",
                    border: `2px solid ${s.done ? styles.gold : s.active ? styles.gold : "#ddd"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, color: s.done ? "#fff" : s.active ? styles.gold : "#ccc",
                  }}>{s.done ? "✓" : s.active ? "●" : ""}</div>
                  {i < stages.length - 1 && <div style={{ width: 2, height: 28, background: s.done ? styles.gold : "#eee" }} />}
                </div>
                <p style={{ fontWeight: s.active ? 700 : s.done ? 500 : 400, fontSize: 14, margin: "0 0 28px", color: s.done ? styles.charcoal : s.active ? styles.charcoal : "#bbb" }}>
                  {s.label}
                  {s.active && <span style={{ marginLeft: 8 }}><Badge>In Progress</Badge></span>}
                </p>
              </div>
            ))}
          </Card>
          <div>
            <Card style={{ padding: 24, marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Your Designer</h3>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: styles.gold, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16 }}>SP</div>
                <div>
                  <p style={{ fontWeight: 700, margin: "0 0 2px" }}>Sudha Priya</p>
                  <p style={{ fontSize: 13, color: "#888", margin: 0 }}>Senior Interior Designer · 8 yrs exp</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <button style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1px solid ${styles.border}`, background: "transparent", fontSize: 13, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>📞 Call</button>
                <button style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1px solid ${styles.gold}`, background: styles.gold + "15", fontSize: 13, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif", color: styles.gold, fontWeight: 600 }}>💬 WhatsApp</button>
              </div>
            </Card>
            <Card style={{ padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 14px" }}>Quick Updates</h3>
              {["Wardrobe fittings started today", "Electricals 90% complete", "Painting scheduled for Thu"].map((u, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? styles.gold : "#ddd", marginTop: 4, flexShrink: 0 }} />
                  <p style={{ fontSize: 13, color: "#555", margin: 0 }}>{u}</p>
                </div>
              ))}
            </Card>
          </div>
        </div>
      )}

      {activeTab === "docs" && (
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 20px" }}>Your Documents</h3>
          {[["Quotation.pdf", "₹18,40,000", "28 May 2024", "📄"], ["Invoice_1.pdf", "₹9,20,000", "1 Jun 2024", "🧾"], ["Design_Concept.pdf", "3D Renders + Moodboard", "20 May 2024", "🎨"], ["Material_List.pdf", "62 items selected", "22 May 2024", "📋"]].map(([name, info, date, icon]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: `1px solid ${styles.border}`, flexWrap: "wrap" }}>
              <span style={{ fontSize: 28 }}>{icon}</span>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 2px" }}>{name}</p>
                <p style={{ fontSize: 12, color: "#888", margin: 0 }}>{info} · {date}</p>
              </div>
              <button style={{ background: styles.cream, border: "none", padding: "8px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>Download</button>
            </div>
          ))}
        </Card>
      )}

      {activeTab === "messages" && (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${styles.border}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Chat with Design Team</h3>
          </div>
          <div style={{ height: 320, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "85%", padding: "10px 14px", borderRadius: m.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: m.from === "user" ? styles.gold : styles.cream,
                  color: m.from === "user" ? "#fff" : styles.charcoal,
                }}>
                  <p style={{ margin: "0 0 4px", fontSize: 14, lineHeight: 1.5 }}>{m.text}</p>
                  <p style={{ margin: 0, fontSize: 11, opacity: 0.7 }}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "16px 24px", borderTop: `1px solid ${styles.border}`, display: "flex", gap: 10 }}>
            <input value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()}
              placeholder="Type a message..." style={{ flex: 1, padding: "10px 16px", borderRadius: 100, border: `1.5px solid ${styles.border}`, fontSize: 14, outline: "none", fontFamily: "Instrument Sans, sans-serif" }} />
            <button onClick={sendMsg} style={{ background: styles.gold, color: "#fff", border: "none", padding: "10px 20px", borderRadius: 100, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>Send</button>
          </div>
        </Card>
      )}

      {activeTab === "meetings" && (
        <div className="grid-2">
          {[
            { date: "Thu, 13 Jun", time: "3:00 PM", type: "Site Visit", designer: "Sudha Priya", mode: "In-Person" },
            { date: "Mon, 17 Jun", time: "11:00 AM", type: "Final Review", designer: "Sudha Priya", mode: "Video Call" },
          ].map((m, i) => (
            <Card key={i} style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <Badge color={m.mode === "In-Person" ? styles.sage : "#3A7BD5"}>{m.mode}</Badge>
                <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>{m.date}</p>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>{m.type}</h3>
              <p style={{ color: "#888", fontSize: 14, margin: "0 0 16px" }}>With {m.designer} · {m.time}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button style={{ flex: 1, minWidth: 100, padding: "10px", borderRadius: 10, border: `1px solid ${styles.border}`, background: "transparent", fontSize: 13, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>Reschedule</button>
                <button style={{ flex: 1, minWidth: 100, padding: "10px", borderRadius: 10, border: "none", background: styles.charcoal, color: "#fff", fontSize: 13, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>Add to Calendar</button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// PACKAGE BUILDER
function PackageBuilderPage() {
  const [selections, setSelections] = useState({ kitchen: null, wardrobe: null, living: null, bedroom: null });

  const tiers = {
    Economy: { suffix: "E", color: "#888" },
    Premium: { suffix: "P", color: styles.gold },
    Luxury: { suffix: "L", color: styles.charcoal },
  };

  const pricing = {
    kitchen: { Economy: 1.5, Premium: 2.5, Luxury: 4.0 },
    wardrobe: { Economy: 0.7, Premium: 1.2, Luxury: 2.0 },
    living: { Economy: 0.8, Premium: 1.5, Luxury: 2.5 },
    bedroom: { Economy: 0.6, Premium: 1.0, Luxury: 1.8 },
  };

  const total = Object.entries(selections).reduce((sum, [room, tier]) => {
    return sum + (tier ? pricing[room][tier] : 0);
  }, 0);

  const rooms = [
    { key: "kitchen", label: "Modular Kitchen", icon: "🍳", desc: "Custom cabinetry, countertops, chimney" },
    { key: "wardrobe", label: "Wardrobe", icon: "🚪", desc: "Sliding/hinged doors, interior organization" },
    { key: "living", label: "Living Room", icon: "🛋", desc: "TV unit, wall panels, false ceiling" },
    { key: "bedroom", label: "Master Bedroom", icon: "🛏", desc: "Bed design, study area, wardrobes" },
  ];

  return (
    <div className="section-padding">
      <SectionHeader label="Customise" title="Build Your Package" subtitle="Mix and match quality tiers for each room. See live pricing instantly." />

      <div className="package-builder-grid">
        <div>
          {rooms.map(room => (
            <div key={room.key} style={{ background: "#fff", border: `1px solid ${styles.border}`, borderRadius: 16, padding: "24px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>{room.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 16, margin: "0 0 2px" }}>{room.label}</p>
                  <p style={{ fontSize: 13, color: "#888", margin: 0 }}>{room.desc}</p>
                </div>
              </div>
              <div className="grid-3">
                {Object.entries(pricing[room.key]).map(([tier, price]) => (
                  <div key={tier} onClick={() => setSelections(s => ({ ...s, [room.key]: s[room.key] === tier ? null : tier }))} style={{
                    padding: "16px 12px", textAlign: "center", borderRadius: 12,
                    border: `2px solid ${selections[room.key] === tier ? styles.gold : styles.border}`,
                    cursor: "pointer", background: selections[room.key] === tier ? styles.gold + "15" : "#fff",
                    transition: "all 0.2s",
                  }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: tiers[tier].color, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{tier}</p>
                    <p style={{ fontSize: 22, fontWeight: 800, color: selections[room.key] === tier ? styles.gold : styles.charcoal, margin: "0 0 4px" }}>₹{price}L</p>
                    <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>
                      {tier === "Economy" ? "Basic finish" : tier === "Premium" ? "Mid-range brands" : "Imported materials"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="sticky-sidebar">
          <div style={{ background: styles.charcoal, borderRadius: 20, padding: 28, color: "#fff" }}>
            <p style={{ color: styles.gold, fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 16px" }}>Your Package</p>
            <div style={{ marginBottom: 24 }}>
              {rooms.map(room => (
                <div key={room.key} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <div>
                    <p style={{ fontSize: 13, color: "#aaa", margin: "0 0 2px" }}>{room.label}</p>
                    <p style={{ fontSize: 12, color: selections[room.key] ? styles.gold : "#555", margin: 0 }}>
                      {selections[room.key] || "Not selected"}
                    </p>
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: selections[room.key] ? "#fff" : "#555", margin: 0 }}>
                    {selections[room.key] ? `₹${pricing[room.key][selections[room.key]]}L` : "—"}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ color: "#aaa", fontSize: 14, margin: 0 }}>Total Estimate</p>
                <p style={{ fontSize: 32, fontWeight: 800, color: total > 0 ? styles.gold : "#555", margin: 0 }}>
                  {total > 0 ? `₹${total.toFixed(1)}L` : "₹0"}
                </p>
              </div>
              {total > 0 && <p style={{ fontSize: 12, color: "#888", margin: "4px 0 0" }}>*Excludes civil work & installation</p>}
            </div>
            <button style={{
              width: "100%", background: styles.gold, color: "#fff", border: "none", padding: "14px",
              borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif",
              marginTop: 16, opacity: total > 0 ? 1 : 0.5,
            }}>Get Detailed Quote →</button>
          </div>

          <div style={{ background: styles.cream, borderRadius: 16, padding: 20, marginTop: 16, border: `1px solid ${styles.border}` }}>
            <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 8px" }}>💡 Smart Savings</p>
            <p style={{ fontSize: 13, color: "#777", margin: 0, lineHeight: 1.6 }}>
              Bundle 3 or more rooms and save up to 12% on total package cost.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// MATERIALS PAGE
function MaterialsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Plywood", "MDF", "HDHMR", "Laminates", "Acrylic", "Veneer"];
  const filtered = activeCategory === "All" ? MATERIALS : MATERIALS.filter(m => m.category === activeCategory);

  return (
    <div className="section-padding">
      <SectionHeader label="Materials" title="Experience Centre" subtitle="Touch, feel, and understand every material before it goes into your home" />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
        {categories.map(c => <Tag key={c} active={activeCategory === c} onClick={() => setActiveCategory(c)}>{c}</Tag>)}
      </div>
      <div className="grid-3">
        {filtered.map(m => (
          <Card key={m.name}>
            <div style={{ height: 140, background: m.color, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", top: 12, right: 12 }}>
                <Badge color={m.cost === "Economy" ? "#888" : m.cost === "Standard" ? "#3A7BD5" : m.cost === "Premium" ? styles.gold : styles.charcoal}>{m.cost}</Badge>
              </div>
              <div style={{ width: 80, height: 80, borderRadius: 8, background: m.color, border: "3px solid rgba(255,255,255,0.4)", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }} />
            </div>
            <div style={{ padding: "20px 24px" }}>
              <Badge color={styles.gold}>{m.category}</Badge>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "10px 0 6px" }}>{m.name}</h3>
              <p style={{ fontSize: 13, color: "#777", margin: "0 0 16px", lineHeight: 1.6 }}>{m.desc}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <p style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>Durability</p>
                  <ProgressBar pct={m.durability} />
                  <p style={{ fontSize: 12, fontWeight: 600, margin: "4px 0 0" }}>{m.durability}/100</p>
                </div>
                <div>
                  <p style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>Warranty</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: styles.charcoal, margin: 0 }}>{m.warranty}</p>
                </div>
              </div>
              <p style={{ fontSize: 12, color: styles.sage, fontWeight: 600, margin: 0 }}>✓ Best for: {m.use}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ADMIN DASHBOARD
function AdminPage() {
  const leads = [
    { name: "Rajesh Sharma", area: "Anna Nagar", service: "3BHK Full", value: "₹12L", stage: "Consultation", time: "2h ago" },
    { name: "Deepa Menon", area: "Velachery", service: "Kitchen", value: "₹3.5L", stage: "Quotation", time: "5h ago" },
    { name: "Karthik Raja", area: "OMR", service: "Villa Full", value: "₹28L", stage: "Negotiation", time: "1d ago" },
    { name: "Anitha Krishnan", area: "Trichy", service: "Bedroom", value: "₹2L", stage: "New Lead", time: "3h ago" },
    { name: "Suresh Babu", area: "Coimbatore", service: "2BHK", value: "₹8L", stage: "Won", time: "2d ago" },
  ];

  const stageColors = { "New Lead": "#3A7BD5", "Consultation": styles.gold, "Quotation": "#E8A838", "Negotiation": "#E85858", "Won": styles.sage, "Lost": "#ccc" };

  const barData = [
    { month: "Jan", val: 85 }, { month: "Feb", val: 120 }, { month: "Mar", val: 95 }, { month: "Apr", val: 145 }, { month: "May", val: 160 }, { month: "Jun", val: 130 },
  ];
  const maxBar = Math.max(...barData.map(d => d.val));

  return (
    <div className="page-padding">
      <div style={{ marginBottom: 32 }}>
        <p style={{ color: styles.gold, fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 6px" }}>Admin</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Business Dashboard</h1>
      </div>

      {/* Metrics */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        {[["128", "New Leads", styles.gold, "+14% this month"], ["42", "Active Projects", "#3A7BD5", "Across Chennai"], ["₹1.8 Cr", "Revenue", styles.sage, "June 2024"], ["56", "Consultations", "#E8A838", "This week"]].map(([v, l, c, sub]) => (
          <div key={l} style={{ background: "#fff", border: `1px solid ${styles.border}`, borderRadius: 16, padding: "24px" }}>
            <p style={{ fontSize: 30, fontWeight: 800, color: c, margin: "0 0 4px" }}>{v}</p>
            <p style={{ fontSize: 14, fontWeight: 600, margin: "0 0 4px" }}>{l}</p>
            <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Revenue Chart */}
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 20px" }}>Revenue Trend (₹ Lakhs)</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 160 }}>
            {barData.map(d => (
              <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: "100%", background: styles.gold, borderRadius: "6px 6px 0 0", height: `${(d.val / maxBar) * 130}px`, transition: "height 0.5s" }} />
                <p style={{ fontSize: 11, color: "#888", margin: 0 }}>{d.month}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pipeline */}
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 20px" }}>Lead Pipeline</h3>
          {[["New Lead", 24, 128], ["Consultation", 18, 86], ["Quotation", 12, 57], ["Negotiation", 8, 38], ["Won", 22, 105], ["Lost", 6, 29]].map(([stage, pct, count]) => (
            <div key={stage} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{stage}</span>
                <span style={{ fontSize: 12, color: "#888" }}>{count} leads</span>
              </div>
              <ProgressBar pct={pct * 3} color={stageColors[stage]} />
            </div>
          ))}
        </Card>
      </div>

      {/* Leads Table */}
      <Card style={{ padding: 0 }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${styles.border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Recent Leads</h3>
          <button style={{ background: styles.gold, color: "#fff", border: "none", padding: "8px 16px", borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Instrument Sans, sans-serif" }}>+ Add Lead</button>
        </div>
        <div className="table-responsive-container">
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead>
              <tr style={{ background: styles.cream }}>
                {["Client", "Area", "Service", "Value", "Stage", "Time"].map(h => (
                  <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, color: "#888", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", border: "none" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((l, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${styles.border}` }}
                  onMouseEnter={e => e.currentTarget.style.background = styles.cream}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: styles.gold + "30", display: "flex", alignItems: "center", justifyContent: "center", color: styles.gold, fontWeight: 700, fontSize: 12 }}>{l.name.split(" ").map(w => w[0]).join("")}</div>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{l.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: 13, color: "#666" }}>{l.area}</td>
                  <td style={{ padding: "14px 20px", fontSize: 13, color: "#666" }}>{l.service}</td>
                  <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 700, color: styles.charcoal }}>{l.value}</td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{ background: stageColors[l.stage] + "20", color: stageColors[l.stage], fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 100 }}>{l.stage}</span>
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: 12, color: "#aaa" }}>{l.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "portfolio", label: "Portfolio" },
    { id: "ai-designer", label: "AI Designer" },
    { id: "estimator", label: "Cost Estimator" },
    { id: "materials", label: "Materials" },
    { id: "builder", label: "Package Builder" },
    { id: "booking", label: "Book Consultation" },
    { id: "dashboard", label: "My Project" },
    { id: "admin", label: "Admin" },
  ];

  const pages = {
    home: <HomePage navigate={setActivePage} />,
    portfolio: <PortfolioPage navigate={setActivePage} />,
    "ai-designer": <AIDesignerPage />,
    estimator: <EstimatorPage />,
    materials: <MaterialsPage />,
    builder: <PackageBuilderPage />,
    booking: <BookingPage />,
    dashboard: <DashboardPage />,
    admin: <AdminPage />,
  };

  return (
    <div style={{ fontFamily: "'Instrument Sans', -apple-system, sans-serif", background: styles.cream, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Nav */}
      <nav className="nav-padding" style={{
        position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)", borderBottom: `1px solid ${styles.border}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", height: 64, justifyContent: "space-between" }}>
          <div style={{ fontWeight: 800, fontSize: 20, color: styles.charcoal, cursor: "pointer", letterSpacing: "-0.03em" }}
            onClick={() => { setActivePage("home"); setMobileMenuOpen(false); }}>
            LUXE INTERIORS
          </div>
          
          {/* Desktop Nav Items */}
          <div className="desktop-nav">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActivePage(item.id)} style={{
                padding: "8px 14px", borderRadius: 8, border: "none",
                background: activePage === item.id ? styles.gold : "transparent",
                color: activePage === item.id ? "#fff" : "#666",
                fontWeight: activePage === item.id ? 700 : 400,
                fontSize: 13, cursor: "pointer",
                fontFamily: "Instrument Sans, -apple-system, sans-serif",
                whiteSpace: "nowrap", transition: "all 0.2s",
              }}>{item.label}</button>
            ))}
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Nav Menu Dropdown */}
        {mobileMenuOpen && (
          <div style={{
            position: "absolute", top: 64, left: 0, right: 0,
            background: "rgba(255,255,255,0.98)", borderBottom: `1px solid ${styles.border}`,
            padding: "16px 20px", display: "flex", flexDirection: "column", gap: 8,
            boxShadow: "0 8px 16px rgba(0,0,0,0.06)", zIndex: 99,
          }}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => { setActivePage(item.id); setMobileMenuOpen(false); }} style={{
                padding: "12px 16px", borderRadius: 8, border: "none",
                background: activePage === item.id ? styles.gold : "transparent",
                color: activePage === item.id ? "#fff" : "#666",
                fontWeight: activePage === item.id ? 700 : 400,
                fontSize: 14, cursor: "pointer", textAlign: "left",
                fontFamily: "Instrument Sans, -apple-system, sans-serif",
                transition: "all 0.2s",
              }}>{item.label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main>{pages[activePage]}</main>

      {/* Footer */}
      <footer className="section-padding" style={{ background: styles.charcoal, color: "#fff", paddingTop: 60, paddingBottom: 40 }}>
        <div className="footer-grid" style={{ marginBottom: 40 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 12, letterSpacing: "-0.03em" }}>
              LUXE INTERIORS
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 280 }}>
              Chennai's premier interior design studio. Crafting luxury spaces since 2012 with 500+ completed projects.
            </p>
            <p style={{ color: styles.gold, fontSize: 14, fontWeight: 600, margin: 0 }}>📞 +91 98400 12345</p>
          </div>
          {[["Services", ["Modular Kitchen", "Bedroom Design", "Living Room", "Wardrobes", "False Ceiling", "Office Interior"]], ["Areas", ["Anna Nagar", "Velachery", "OMR", "Coimbatore", "Madurai", "Trichy"]], ["Company", ["About Us", "Portfolio", "Careers", "Blog", "Contact"]]].map(([heading, items]) => (
            <div key={heading}>
              <p style={{ fontWeight: 700, marginBottom: 16, fontSize: 14 }}>{heading}</p>
              {items.map(item => <p key={item} style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "0 0 8px", cursor: "pointer" }}>{item}</p>)}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: 0 }}>© 2024 Luxe Interiors. All rights reserved.</p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: 0 }}>Chennai · Trusted by 500+ Families</p>
        </div>
      </footer>
    </div>
  );
}
