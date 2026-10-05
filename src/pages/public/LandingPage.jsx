import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../../context/AppContext";

import {
  Terminal,
  Building2,
  Calendar,
  Users,
  Award,
  Compass,
  CheckCircle2,
  Zap,
  BookOpen,
  Palette,
  Trophy,
  Heart,
  ShieldCheck,
  Users2,
  Sparkles,
} from "lucide-react";

/* ─── Hero Node Matrix Canvas (The "One Bold Moment") ─────────────────────── */
const HeroNodeMatrixCanvas = () => {
  const canvasRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isReducedMotion = mediaQuery.matches;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width * 0.5;
    const centerY = rect.height * 0.5;

    const nodes = [
      { id: "hub", label: "CommandLine Hub", x: centerX, y: centerY, r: 26, color: "#6C4CF1", stat: "Central Campus Ecosystem Gateway" },
      { id: "tech", label: "Technical & Dev", x: centerX - 130, y: centerY - 80, r: 19, color: "#10B981", stat: "25+ Hackathons & AI Labs" },
      { id: "cultural", label: "Cultural Arts", x: centerX + 140, y: centerY - 65, r: 19, color: "#FF5A5F", stat: "Annual Campus Fest & Stage Shows" },
      { id: "sports", label: "Athletics & Sports", x: centerX - 125, y: centerY + 95, r: 17, color: "#8A6BFF", stat: "Inter-College Leagues & E-Sports" },
      { id: "literary", label: "Literary & Debate", x: centerX + 130, y: centerY + 90, r: 17, color: "#D97706", stat: "Model UN & Public Speaking" },
    ];

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e) => {
      const bounds = canvas.getBoundingClientRect();
      mouseX = e.clientX - bounds.left;
      mouseY = e.clientY - bounds.top;

      let found = null;
      nodes.forEach((node) => {
        const nx = node.currentX || node.x;
        const ny = node.currentY || node.y;
        if (Math.hypot(mouseX - nx, mouseY - ny) < node.r + 12) {
          found = node;
        }
      });
      setHoveredNode(found);
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      setHoveredNode(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let angle = 0;

    const render = () => {
      const bounds = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, bounds.width, bounds.height);

      if (!isReducedMotion) {
        angle += 0.015;
      }

      // Draw connecting lines between peripheral nodes and central hub
      nodes.forEach((node, idx) => {
        if (node.id === "hub") {
          node.currentX = hubX();
          node.currentY = hubY();
          return;
        }

        function hubX() { return bounds.width * 0.5; }
        function hubY() { return bounds.height * 0.5; }

        if (!isReducedMotion) {
          node.currentX = node.x + Math.cos(angle + idx) * 7;
          node.currentY = node.y + Math.sin(angle * 1.3 + idx) * 7;
        } else {
          node.currentX = node.x;
          node.currentY = node.y;
        }

        const hub = nodes[0];
        ctx.beginPath();
        ctx.moveTo(hub.currentX || hub.x, hub.currentY || hub.y);
        ctx.lineTo(node.currentX, node.currentY);
        ctx.strokeStyle = node.color;
        ctx.globalAlpha = 0.28;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.lineDashOffset = -angle * 15;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1.0;
      });

      // Cursor attraction lines
      nodes.forEach((node) => {
        const nx = node.currentX || node.x;
        const ny = node.currentY || node.y;
        const dist = Math.hypot(mouseX - nx, mouseY - ny);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(nx, ny);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = node.color;
          ctx.globalAlpha = (1 - dist / 130) * 0.55;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        }
      });

      // Draw Nodes
      nodes.forEach((node) => {
        const nx = node.currentX || node.x;
        const ny = node.currentY || node.y;
        const isHovered = hoveredNode?.id === node.id;

        // Outer aura ring
        ctx.beginPath();
        ctx.arc(nx, ny, node.r + (isHovered ? 10 : 4), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = isHovered ? 0.32 : 0.12;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Solid Node Circle
        ctx.beginPath();
        ctx.arc(nx, ny, node.r, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // White Accent Border
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();

        // Label
        ctx.font = `${isHovered ? "700" : "600"} ${isHovered ? "12.5px" : "12px"} 'DM Sans', sans-serif`;
        ctx.fillStyle = "#090D16";
        ctx.textAlign = "center";
        ctx.fillText(node.label, nx, ny + node.r + 17);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hoveredNode]);

  return (
    <div style={{ position: "relative", width: "100%", height: "420px" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          borderRadius: "24px",
          background: "#FFFFFF",
          border: "1.5px solid #E2E8F0",
          boxShadow: "0 20px 40px -10px rgba(9, 13, 22, 0.07)",
        }}
      />
      {hoveredNode && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#090D16",
            color: "#FFFFFF",
            padding: "8px 16px",
            borderRadius: "12px",
            fontSize: "12.5px",
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(9, 13, 22, 0.25)",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            zIndex: 10,
          }}
        >
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: hoveredNode.color }} />
          <span><strong>{hoveredNode.label}:</strong> {hoveredNode.stat}</span>
        </div>
      )}
    </div>
  );
};

export const LandingPage = () => {
  const { setIsAuthModalOpen } = useApp();

  const handleExploreClubsClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleViewClubCategory = () => {
    setIsAuthModalOpen(true);
  };

  const secondaryClubs = [
    {
      id: 'cultural',
      title: 'Cultural & Performing Arts',
      badge: 'badge-cultural',
      category: 'Cultural',
      desc: 'Music fests, dance troupes, drama societies & annual stage galas.',
      image: '/assets/club_cultural.jpg',
      icon: Palette,
      members: '340 Students Enrolled',
    },
    {
      id: 'literary',
      title: 'Literary & Debating Society',
      badge: 'badge-arts',
      category: 'Literary',
      desc: 'Model UN, parliamentary debates, creative writing & poetry slams.',
      image: '/assets/club_literary.jpg',
      icon: BookOpen,
      members: '190 Students Enrolled',
    },
    {
      id: 'sports',
      title: 'University Sports & Athletics',
      badge: 'badge-sports',
      category: 'Sports',
      desc: 'Inter-college tournaments, esports leagues, basketball & athletic meets.',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop',
      icon: Trophy,
      members: '480 Students Enrolled',
    },
    {
      id: 'social',
      title: 'Social Impact & Eco Action',
      badge: 'badge-tech',
      category: 'Social Impact',
      desc: 'Community service initiatives, tree plantation drives & blood donation camps.',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop',
      icon: Heart,
      members: '220 Students Enrolled',
    },
  ];

  return (
    <div style={{ background: '#F8F9FD', color: '#090D16', minHeight: '100vh' }}>
      {/* 1. NAVBAR */}
      <nav className="landing-navbar">
        <div
          className="logo-brand"
          style={{ cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="logo-icon">
            <Terminal size={22} color="white" />
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#090D16', fontFamily: 'Outfit' }}>
            CommandLine
          </span>
        </div>

        <ul className="nav-links">
          <li><a href="#home" className="nav-link active">Home</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#clubs" className="nav-link">Clubs</a></li>
          <li><a href="#why-us" className="nav-link">Why Us</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
          <li>
            <a
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                setIsAuthModalOpen(true);
              }}
            >
              Login
            </a>
          </li>
        </ul>

        <div>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="btn btn-primary btn-md"
          >
            Sign In to Portal
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="home" style={{ width: '100%', padding: '5rem 5% 4rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
          {/* Hero Left Content */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: '#EEF2FF', border: '1px solid #C7D2FE', color: '#6C4CF1', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              <Sparkles size={15} /> Official Campus Club Infrastructure
            </div>

            <h1 style={{ fontSize: '3.4rem', fontWeight: 800, color: '#090D16', margin: '0 0 1.25rem 0', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Empowering University Clubs, Events & Leadership
            </h1>

            <p style={{ fontSize: '1.1rem', color: '#475569', margin: '0 0 2rem 0', lineHeight: 1.65, maxWidth: '540px' }}>
              CommandLine unites students, club heads, faculty mentors, and DSW on a single high-performance platform to manage memberships, propose events, and track campus achievements.
            </p>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="btn btn-primary btn-md"
              >
                Explore Clubs
              </button>
              <a
                href="#about"
                className="btn btn-secondary btn-md"
              >
                Platform Overview
              </a>
            </div>
          </div>

          {/* Hero Right Visual: The One Bold Moment */}
          <div>
            <HeroNodeMatrixCanvas />
          </div>
        </div>

        {/* 4 Feature Highlights */}
        <div style={{ maxWidth: '1280px', margin: '3.5rem auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <div className="secondary-club-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#EEF2FF', color: '#6C4CF1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Compass size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#090D16' }}>Discover</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>Find organization matches</p>
              </div>
            </div>
          </div>

          <div className="secondary-club-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#090D16' }}>Participate</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>Join live campus hackathons</p>
              </div>
            </div>
          </div>

          <div className="secondary-club-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trophy size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#090D16' }}>Grow</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>Build accredited skills</p>
              </div>
            </div>
          </div>

          <div className="secondary-club-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FEE2E2', color: '#FF5A5F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users2 size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#090D16' }}>Belong</h4>
                <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>Join 5,000+ active peers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" style={{ padding: '5rem 5%', background: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#090D16', marginBottom: '1.25rem', lineHeight: 1.15 }}>
              Centralized Governance & Student Discovery
            </h2>
            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              CommandLine bridges the operational gap between student organization leaders, faculty mentors, and DSW administration — replacing manual paperwork with transparent digital workflows.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#090D16', fontWeight: 600 }}>
                <CheckCircle2 size={20} color="#6C4CF1" /> Unified portal for all university student organizations
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#090D16', fontWeight: 600 }}>
                <CheckCircle2 size={20} color="#6C4CF1" /> Event approval workflows, budget requests & roster tracking
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#090D16', fontWeight: 600 }}>
                <CheckCircle2 size={20} color="#6C4CF1" /> Transparent institutional oversight for DSW and Faculty Mentors
              </div>
            </div>

            <button
              onClick={handleExploreClubsClick}
              className="btn btn-primary btn-md"
            >
              Discover Portal Features
            </button>
          </div>

          <div>
            <div className="spotlight-card" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem', color: '#090D16' }}>
                Ecosystem Metrics at a Glance
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ background: '#F8F9FD', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#6C4CF1' }}>25+</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#475569' }}>Registered Clubs</div>
                </div>
                <div style={{ background: '#F8F9FD', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#10B981' }}>100+</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#475569' }}>Annual Events</div>
                </div>
                <div style={{ background: '#F8F9FD', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#8A6BFF' }}>5,000+</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#475569' }}>Enrolled Students</div>
                </div>
                <div style={{ background: '#F8F9FD', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FF5A5F' }}>100%</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#475569' }}>DSW Compliance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED CLUBS SECTION (ASYMMETRIC LAYOUT) */}
      <section id="clubs" style={{ padding: '5rem 5%', background: '#F8F9FD' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#090D16', margin: '0 0 0.5rem 0' }}>
              Explore Campus Organizations
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.05rem', margin: 0 }}>
              Asymmetric spotlight featuring technical, cultural, sports, and social clubs.
            </p>
          </div>

          {/* Asymmetric Grid Layout: Left Spotlight (2 Columns wide) + Right Stacked Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '2rem', alignItems: 'start' }}>
            {/* Left Primary Spotlight Card */}
            <div className="spotlight-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <span className="badge-tech">FEATURED SPOTLIGHT • TECHNICAL</span>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Terminal size={24} />
                </div>
              </div>

              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#090D16', marginBottom: '0.75rem' }}>
                Technical & Software Development Org
              </h3>

              <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.65, marginBottom: '2rem' }}>
                Build real-world software, participate in national hackathons, explore AI/ML research labs, and contribute to open-source university software projects.
              </p>

              <div style={{ display: 'flex', gap: '24px', padding: '1.25rem 0', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', marginBottom: '2rem' }}>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#090D16' }}>520+</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Active Coders</div>
                </div>
                <div style={{ width: '1px', background: '#E2E8F0' }} />
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10B981' }}>12 Annual</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Hackathons</div>
                </div>
              </div>

              <button
                onClick={handleViewClubCategory}
                className="btn btn-primary btn-md"
                style={{ width: '100%' }}
              >
                Join Technical Org Workspace
              </button>
            </div>

            {/* Right Secondary Cards Grid (2x2) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {secondaryClubs.map((club) => {
                const IconComp = club.icon;
                return (
                  <div key={club.id} className="secondary-club-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span className={club.badge}>{club.category}</span>
                        <IconComp size={20} color="#64748B" />
                      </div>

                      <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#090D16', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                        {club.title}
                      </h4>

                      <p style={{ fontSize: '0.86rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                        {club.desc}
                      </p>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#94A3B8', marginBottom: '0.75rem' }}>
                        {club.members}
                      </div>

                      <button
                        onClick={handleViewClubCategory}
                        className="btn btn-secondary btn-sm"
                        style={{ width: '100%' }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. ECOSYSTEM FLOW */}
      <section style={{ padding: '5rem 5%', background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#090D16', margin: '0 0 0.5rem 0' }}>
              How CommandLine Connects Everyone
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.05rem', margin: 0 }}>
              A structured role hierarchy ensuring clear accountability and smooth club operations.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <div className="secondary-club-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#EEF2FF', color: '#6C4CF1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#090D16', marginBottom: '0.5rem' }}>Students</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                Discover clubs, submit online applications, participate in events, and build extracurricular leadership records.
              </p>
            </div>

            <div className="secondary-club-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Award size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#090D16', marginBottom: '0.5rem' }}>Club Heads</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                Manage member rosters, review applicant profiles, propose event timelines, and track club budgets.
              </p>
            </div>

            <div className="secondary-club-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#090D16', marginBottom: '0.5rem' }}>Faculty Mentors</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                Provide academic guidance, review proposed event budgets, and approve club initiatives.
              </p>
            </div>

            <div className="secondary-club-card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#FEE2E2', color: '#FF5A5F', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Building2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#090D16', marginBottom: '0.5rem' }}>DSW Admin</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                Oversee university-wide club registration, master venue bookings, budget approvals, and campus analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section style={{ padding: '5rem 5%', background: 'linear-gradient(135deg, #090D16 0%, #1E1B4B 60%, #6C4CF1 100%)', color: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Elevate Your Campus Experience
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#C7D2FE', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Join CommandLine today to connect with 25+ student organizations and manage your university journey.
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            style={{
              background: '#FFFFFF',
              color: '#6C4CF1',
              padding: '14px 32px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '1.05rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
            }}
          >
            Access Portal
          </button>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer id="contact" style={{ background: '#090D16', color: '#94A3B8', padding: '4rem 5% 2.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div className="logo-brand" style={{ color: 'white' }}>
            <div className="logo-icon">
              <Terminal size={20} color="white" />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', fontFamily: 'Outfit' }}>
              CommandLine
            </span>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
            © 2026 CommandLine · Official University Club & Event Platform
          </div>
        </div>
      </footer>
    </div>
  );
};
