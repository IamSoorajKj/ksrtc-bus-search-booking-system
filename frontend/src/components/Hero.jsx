import React from 'react'
import { getData } from '@/context/userContext'
import BusSearch from './BusSearch'
import { Shield, Clock, MapPin, Star, CheckCircle, Facebook, Twitter, Instagram, Youtube, Phone, Mail, ArrowRight } from 'lucide-react'

const stats = [
  { label: "Districts Covered", value: "14" },
  { label: "Daily Routes", value: "5,000+" },
  { label: "Years of Service", value: "60+" },
  { label: "Passengers/Day", value: "1M+" },
]

const features = [
  { icon: Shield, title: "Safe & Reliable", desc: "Government-operated fleet with professional drivers and regular safety inspections." },
  { icon: Clock, title: "Always On Time", desc: "Fixed schedules you can rely on — connecting every corner of Kerala punctually." },
  { icon: MapPin, title: "Statewide Network", desc: "From Kasaragod to Thiruvananthapuram — mountains, beaches, cities and villages." },
  { icon: Star, title: "Affordable Fares", desc: "Subsidized government pricing makes KSRTC accessible for every Keralite." },
]

/* ═══ REALISTIC KERALA BUILDINGS SCENE ═══ */
const BuildingSet = React.memo(() => (
  <div className="gpu-accelerated" style={{ display: 'flex', alignItems: 'flex-end', flexShrink: 0 }}>

    <div style={{ width: '60px', flexShrink: 0 }} />

    {/* ── HOSPITAL ── */}
    <svg width="300" height="220" viewBox="0 0 200 160" fill="none" style={{ flexShrink: 0, display: 'block', verticalAlign: 'bottom' }}>
      {/* Main Building */}
      <rect x="20" y="20" width="160" height="140" rx="3" fill="#f8fafc" />
      <rect x="15" y="14" width="170" height="6" rx="2" fill="#cbd5e1" />
      {/* Board */}
      <rect x="60" y="25" width="80" height="15" rx="1" fill="#dc2626" />
      <text x="100" y="35" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">CITY HOSPITAL</text>
      {/* Red Cross */}
      <rect x="30" y="25" width="16" height="16" fill="white" rx="1" />
      <path d="M36 27 h4 v4 h4 v4 h-4 v4 h-4 v-4 h-4 v-4 h4 z" fill="#dc2626" />
      {/* Windows Layer */}
      {[50, 75, 100].map(y => (
        <g key={y}>
          {[30, 60, 90, 120, 150].map(x => (
            <g key={x}>
              <rect x={x} y={y} width="20" height="15" rx="1" fill="#bae6fd" opacity="0.6" />
              <line x1={x + 10} y1={y} x2={x + 10} y2={y + 15} stroke="#cbd5e1" strokeWidth="1" />
            </g>
          ))}
        </g>
      ))}
      {/* Ground Floor Entrance */}
      <rect x="80" y="125" width="40" height="35" fill="#bae6fd" opacity="0.4" />
      <rect x="80" y="120" width="40" height="5" fill="#94a3b8" />
      <line x1="100" y1="125" x2="100" y2="160" stroke="#64748b" strokeWidth="1.5" />
      <text x="100" y="118" fontSize="5" fill="#1e293b" textAnchor="middle" fontWeight="bold">EMERGENCY</text>
    </svg>

    <div style={{ width: '80px', flexShrink: 0 }} />

    {/* ── TEA SHOP (THATTUKADA) - HIGH REALISM ── */}
    <svg width="200" height="140" viewBox="0 0 140 100" fill="none" style={{ flexShrink: 0, display: 'block', verticalAlign: 'bottom' }}>
      {/* Back Wall (Interior) */}
      <rect x="25" y="45" width="90" height="55" fill="#452718" />
      {/* Inside Details: Poster/Calendar */}
      <rect x="65" y="50" width="10" height="15" fill="#f8fafc" opacity="0.8" />
      <rect x="65" y="50" width="10" height="4" fill="#ef4444" />
      {/* Front Wooden Counter Base */}
      <rect x="23" y="70" width="94" height="28" rx="1" fill="#78411d" />
      {/* Vertical Wood Planks on Front */}
      {[25, 35, 45, 55, 65, 75, 85, 95, 105].map(x => (
        <line key={x} x1={x} y1="70" x2={x} y2="98" stroke="#522a10" strokeWidth="1" />
      ))}
      <rect x="20" y="98" width="100" height="2" fill="#381b09" />
      {/* Counter Top */}
      <rect x="21" y="68" width="98" height="4" rx="1" fill="#eab308" />
      {/* Board */}
      <rect x="30" y="38" width="80" height="12" rx="1" fill="#ef4444" stroke="#facc15" strokeWidth="1" />
      <text x="70" y="47" fontSize="6.5" fill="white" textAnchor="middle" fontWeight="bold">CHAYA KADA</text>
      {/* Rusty Tin Roof */}
      <path d="M15 42 L70 18 L125 42 L120 45 L70 23 L20 45 Z" fill="#475569" />
      <path d="M20 40 L70 15 L120 40 Z" fill="#64748b" />
      {/* Corrugated Roof Lines & Rust */}
      {[30, 40, 50, 60, 70, 80, 90, 100, 110].map(x => (
        <line key={x} x1={x} y1="35" x2={70} y2="15" stroke="#475569" strokeWidth="0.5" />
      ))}
      <ellipse cx="60" cy="25" rx="8" ry="4" fill="#a16207" opacity="0.6" transform="rotate(-15 60 25)" />
      {/* Hanging Items: Bananas */}
      <rect x="35" y="50" width="10" height="2" fill="#22c55e" />
      <ellipse cx="37" cy="58" rx="4" ry="7" fill="#facc15" />
      <ellipse cx="43" cy="58" rx="4" ry="7" fill="#eab308" />
      {/* Glass Jar with Snacks (Parippuvada / Pazhampori) */}
      <rect x="52" y="58" width="12" height="10" rx="1" fill="#bae6fd" opacity="0.6" stroke="#fff" strokeWidth="0.5" />
      <ellipse cx="58" cy="58" rx="5" ry="1.5" fill="#dc2626" /> {/* Lid */}
      <circle cx="55" cy="62" r="2" fill="#d97706" />
      <circle cx="60" cy="64" r="2" fill="#d97706" />
      <circle cx="54" cy="65" r="2" fill="#d97706" />
      {/* Hanging Yellow Bulb */}
      <line x1="70" y1="40" x2="70" y2="50" stroke="#1e293b" strokeWidth="0.5" />
      <circle cx="70" cy="52" r="2.5" fill="#fef08a" />
      <circle cx="70" cy="52" r="4" fill="#fef08a" opacity="0.4" />

      {/* Samovar Area */}
      {/* Fire / Smoke */}
      <path d="M102 65 Q106 60 101 55 Q97 50 102 45" stroke="#94a3b8" strokeWidth="2" fill="none" opacity="0.6" />
      <rect x="98" y="65" width="8" height="3" fill="#ef4444" />
      {/* Shiny Steel Samovar */}
      <path d="M96 55 v10 h12 v-10 z" fill="#cbd5e1" opacity="0.9" />
      <rect x="94" y="52" width="16" height="3" rx="1" fill="#94a3b8" />
      <circle cx="102" cy="50" r="3" fill="#64748b" />
      <line x1="108" y1="60" x2="111" y2="60" stroke="#475569" strokeWidth="1" /> {/* Tap */}
    </svg>

    <div style={{ width: '90px', flexShrink: 0 }} />

    {/* ── SUPERMARKET - ULTRA REALISM ── */}
    <svg width="320" height="180" viewBox="0 0 220 120" fill="none" style={{ flexShrink: 0, overflow: 'visible', display: 'block', verticalAlign: 'bottom' }}>
      <defs>
        <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bae6fd" opacity="0.3" />
          <stop offset="50%" stopColor="#bae6fd" opacity="0.05" />
          <stop offset="100%" stopColor="#bae6fd" opacity="0.3" />
        </linearGradient>
      </defs>

      {/* Building Structure with Depth */}
      <rect x="10" y="30" width="200" height="90" rx="2" fill="#cbd5e1" />
      <rect x="12" y="30" width="196" height="88" fill="#f1f5f9" />

      {/* Roof Details: AC Unit & Drainage */}
      <g>
        <rect x="150" y="20" width="25" height="10" fill="#94a3b8" rx="1" />
        <rect x="152" y="22" width="21" height="6" fill="#64748b" />
        <path d="M155 25 L170 25" stroke="#475569" strokeWidth="0.5" />
        <line x1="175" y1="25" x2="185" y2="25" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="185" y1="25" x2="185" y2="120" stroke="#94a3b8" strokeWidth="1.5" /> {/* Drainage pipe */}
      </g>

      {/* Modern High-End Signage */}
      <rect x="8" y="18" width="204" height="20" fill="#15803d" stroke="#166534" strokeWidth="1" />
      <rect x="10" y="20" width="200" height="1" fill="#4ade80" opacity="0.5" />
      <text x="110" y="32" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold" style={{ letterSpacing: '2px', filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))' }}>SUPERMARKET</text>

      {/* Ledge Detail */}
      <rect x="8" y="38" width="204" height="2" fill="#166534" />
      <rect x="8" y="40" width="204" height="4" fill="#0f172a" opacity="0.1" />

      {/* Large Glass Storefront */}
      <rect x="15" y="52" width="190" height="68" fill="#0f172a" stroke="#475569" strokeWidth="1" />
      <rect x="15" y="52" width="190" height="68" fill="url(#glassReflect)" />

      {/* Automatic Doors with Sensors */}
      <g>
        <rect x="85" y="65" width="50" height="55" fill="#e0f2fe" opacity="0.1" stroke="#94a3b8" strokeWidth="1" />
        <line x1="110" y1="65" x2="110" y2="120" stroke="#64748b" strokeWidth="2" />
        <circle cx="100" cy="68" r="1" fill="#ef4444" /> {/* Door sensor */}
        <circle cx="120" cy="68" r="1" fill="#ef4444" />
        <rect x="103" y="90" width="1" height="10" fill="#94a3b8" /> {/* Handles */}
        <rect x="116" y="90" width="1" height="10" fill="#94a3b8" />
      </g>

      {/* Diverse Product Shelving - Realistic Silhouettes */}
      <g opacity="0.8">
        {[25, 145].map(xOffset => (
          <g key={xOffset}>
            {[65, 85, 105].map(y => (
              <g key={y}>
                <rect x={xOffset} y={y} width="35" height="1.2" fill="#94a3b8" />
                {[...Array(6)].map((_, i) => {
                  const px = xOffset + i * 5 + 2;
                  const colors = ['#f87171', '#fbbf24', '#4ade80', '#60a5fa', '#f472b6', '#a78bfa'];
                  const color = colors[i % colors.length];
                  if (i % 3 === 0) return <rect key={i} x={px} y={y - 9} width="3" height="9" rx="0.5" fill={color} />; // Bottles
                  if (i % 3 === 1) return <circle key={i} cx={px + 1.5} cy={y - 3} r="1.5" fill={color} />; // Jars
                  return <path key={i} d={`M${px} ${y} L${px + 3} ${y} L${px + 3.5} ${y - 7} L${px - 0.5} ${y - 7} Z`} fill={color} />; // Packets/Bags
                })}
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* Trolley Bay (Outside) */}
      <g>
        <rect x="190" y="105" width="20" height="15" fill="none" stroke="#94a3b8" strokeWidth="1" />
        <path d="M192 110 H205 M192 114 H205" stroke="#64748b" strokeWidth="0.8" />
        <circle cx="195" cy="118" r="1.5" fill="#1e293b" />
        <circle cx="202" cy="118" r="1.5" fill="#1e293b" />
      </g>

      {/* Outside Decor: Potted Plants */}
      <g>
        <rect x="215" y="110" width="8" height="10" fill="#78350f" />
        <circle cx="219" cy="105" r="5" fill="#166534" />
        <circle cx="219" cy="102" r="4" fill="#22c55e" />
      </g>
    </svg>

    <div style={{ width: '100px', flexShrink: 0 }} />

    {/* ── KSRTC BUS STOP - HIGH REALISM ── */}
    <svg width="220" height="140" viewBox="0 0 160 100" fill="none" style={{ flexShrink: 0 }}>
      {/* Waiting shed base / concrete platform */}
      <rect x="5" y="85" width="150" height="15" rx="1" fill="#cbd5e1" />
      <rect x="5" y="85" width="150" height="4" fill="#94a3b8" /> {/* Platform Edge Highlight */}
      <rect x="5" y="96" width="150" height="4" fill="#64748b" /> {/* Platform Shadow */}

      {/* Pillar beams - Metal structure with horizontal support */}
      <line x1="20" y1="40" x2="140" y2="40" stroke="#64748b" strokeWidth="2" />
      {[20, 60, 100, 140].map(x => (
        <g key={x}>
          <rect x={x - 2} y="25" width="4" height="60" fill="#475569" />
          <rect x={x - 1} y="25" width="2" height="60" fill="#94a3b8" /> {/* Highlight */}
          <rect x={x - 3} y="83" width="6" height="4" fill="#334155" /> {/* Base mount */}
        </g>
      ))}

      {/* Curved / Angled Concrete Roof */}
      <path d="M5 25 Q80 15 155 25 L150 28 Q80 20 10 28 Z" fill="#b91c1c" />
      <path d="M10 28 Q80 20 150 28 L145 32 Q80 25 15 32 Z" fill="#991b1b" />

      {/* Top Signage Board */}
      <rect x="30" y="8" width="100" height="10" rx="2" fill="#1e3a8a" />
      <rect x="32" y="9.5" width="96" height="7" rx="1" fill="#1e40af" />
      <text x="80" y="15" fontSize="4.5" fill="#facc15" textAnchor="middle" fontWeight="bold" style={{ letterSpacing: '1px' }}>KSRTC WAITING SHED</text>

      {/* Backboards / Adverts */}
      {/* Board 1: Scenic */}
      <rect x="25" y="45" width="30" height="30" fill="#bae6fd" />
      <circle cx="40" cy="55" r="6" fill="#fcd34d" />
      <path d="M25 75 L35 60 L45 75 Z" fill="#22c55e" />
      {/* Board 2: Timetable */}
      <rect x="65" y="45" width="30" height="30" fill="#f8fafc" />
      <rect x="65" y="45" width="30" height="5" fill="#ef4444" />
      {[53, 58, 63, 68].map(y => (
        <line key={y} x1="68" y1={y} x2="92" y2={y} stroke="#cbd5e1" strokeWidth="1" />
      ))}
      {/* Board 3: Blank/Blue */}
      <rect x="105" y="45" width="30" height="30" fill="#0284c7" />

      {/* Seating Bench */}
      {/* Metal Frame */}
      <line x1="20" y1="70" x2="140" y2="70" stroke="#334155" strokeWidth="2" />
      {/* Wood / Plastic seats */}
      <rect x="22" y="68" width="116" height="3" rx="1" fill="#facc15" />
      <rect x="22" y="65" width="116" height="2" rx="0.5" fill="#eab308" />

      {/* Waste Bin */}
      <path d="M148 70 L154 70 L152 85 L150 85 Z" fill="#34d399" />
      <rect x="147" y="68" width="8" height="2" fill="#10b981" rx="1" />
      <text x="151" y="78" fontSize="3" fill="#064e3b" textAnchor="middle" transform="rotate(-90 151 78)">USE ME</text>
    </svg>

    <div style={{ width: '80px', flexShrink: 0 }} />

    {/* ── CINEMA THEATER ── */}
    <svg width="260" height="180" viewBox="0 0 180 120" fill="none" style={{ flexShrink: 0 }}>
      {/* Main Building Base */}
      <rect x="10" y="30" width="160" height="90" rx="2" fill="#1e293b" />
      <rect x="10" y="25" width="160" height="5" fill="#ef4444" />
      <rect x="5" y="115" width="170" height="5" fill="#64748b" />

      {/* Theater Marquee / Name Board */}
      <rect x="20" y="10" width="140" height="20" rx="1" fill="#0f172a" />
      <rect x="22" y="12" width="136" height="16" fill="#1e293b" stroke="#facc15" strokeWidth="1" />
      <text x="90" y="23" fontSize="8" fill="#facc15" textAnchor="middle" fontWeight="900" style={{ letterSpacing: '1px' }}>AASHIRVAD CINEMAS</text>

      {/* Movie Posters */}
      {[25, 75, 125].map(x => (
        <g key={x}>
          <rect x={x} y="40" width="30" height="40" fill="#f8fafc" />
          <rect x={x + 2} y="42" width="26" height="20" fill="#3b82f6" opacity="0.8" />
          <rect x={x + 2} y="64" width="26" height="14" fill="#ef4444" opacity="0.8" />
          <rect x={x} y="40" width="30" height="40" stroke="#facc15" strokeWidth="1.5" fill="none" />
        </g>
      ))}

      {/* Ticket Counter / Entrance */}
      <rect x="50" y="90" width="80" height="25" fill="#0f172a" />
      <rect x="60" y="95" width="15" height="20" fill="#bae6fd" opacity="0.4" />
      <rect x="105" y="95" width="15" height="20" fill="#bae6fd" opacity="0.4" />
      <rect x="80" y="92" width="20" height="10" fill="#facc15" opacity="0.2" /> {/* Ticket window */}
      <text x="90" y="99" fontSize="4" fill="#facc15" textAnchor="middle" fontWeight="bold">TICKETS</text>

      {/* Neon Lights / Accents */}
      <line x1="10" y1="35" x2="170" y2="35" stroke="#3b82f6" strokeWidth="1" opacity="0.8" />
      <line x1="10" y1="85" x2="170" y2="85" stroke="#ef4444" strokeWidth="1" opacity="0.8" />
    </svg>

    <div style={{ width: '90px', flexShrink: 0 }} />

    {/* ── SCHOOL ── */}
    <svg width="320" height="160" viewBox="0 0 240 120" fill="none" style={{ flexShrink: 0 }}>
      {/* School Base Multi-block */}
      <rect x="30" y="40" width="180" height="80" fill="#f8fafc" /> {/* Neutral base */}
      {/* Base border */}
      <rect x="25" y="115" width="190" height="5" fill="#9ca3af" />

      {/* Central Block (Main Entrance) */}
      <rect x="90" y="20" width="60" height="100" fill="#f1f5f9" />
      {/* Roof over central block */}
      <path d="M80 20 L120 5 L160 20 Z" fill="#b91c1c" />

      {/* Roof over side wings */}
      <path d="M20 40 L90 40 L90 30 L30 30 Z" fill="#dc2626" />
      <path d="M150 40 L220 40 L210 30 L150 30 Z" fill="#dc2626" />

      {/* Flag Pole */}
      <line x1="120" y1="20" x2="120" y2="-10" stroke="#94a3b8" strokeWidth="2" />
      <path d="M121 -8 L135 -8 L135 -1 L121 -1 Z" fill="#fca5a5" /> {/* Generic flag shape */}

      {/* School Name Board */}
      <rect x="91" y="25" width="58" height="10" rx="1" fill="#fff" stroke="#b91c1c" strokeWidth="1" />
      <text x="120" y="31.5" fontSize="4" fill="#1e293b" textAnchor="middle" fontWeight="bold">GOVT. PUBLIC SCHOOL</text>

      {/* Clock on Central Block */}
      <circle cx="120" cy="45" r="6" fill="#fff" stroke="#b91c1c" strokeWidth="1.5" />
      <line x1="120" y1="45" x2="120" y2="41" stroke="#1e293b" strokeWidth="1" />
      <line x1="120" y1="45" x2="123" y2="45" stroke="#1e293b" strokeWidth="1" />

      {/* Windows Left Wing */}
      {[50, 75].map(y => (
        <g key={`L${y}`}>
          {[40, 60].map(x => (
            <rect key={x} x={x} y={y} width="15" height="15" rx="1" fill="#bae6fd" opacity="0.6" stroke="#475569" strokeWidth="0.5" />
          ))}
        </g>
      ))}

      {/* Windows Right Wing */}
      {[50, 75].map(y => (
        <g key={`R${y}`}>
          {[165, 185].map(x => (
            <rect key={x} x={x} y={y} width="15" height="15" rx="1" fill="#bae6fd" opacity="0.6" stroke="#475569" strokeWidth="0.5" />
          ))}
        </g>
      ))}

      {/* Central Entrance Doors */}
      <rect x="105" y="90" width="30" height="30" fill="#3e2315" />
      <line x1="120" y1="90" x2="120" y2="120" stroke="#1c1917" strokeWidth="1.5" />
      <rect x="108" y="95" width="10" height="20" fill="#bae6fd" opacity="0.3" />
      <rect x="122" y="95" width="10" height="20" fill="#bae6fd" opacity="0.3" />
    </svg>

    <div style={{ width: '80px', flexShrink: 0 }} />

  </div>
));






const Hero = () => {
  const { user } = getData()

  return (
    <div className="flex flex-col">
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative overflow-hidden flex flex-col" style={{ background: 'linear-gradient(160deg, #1a6e3c 0%, #0f4525 55%, #071a0b 100%)', minHeight: '100svh' }}>

        {/* Keyframes for full-page animations */}
        <style>{`
          @keyframes floatUp {
            0%   { transform: translateY(0px) scale(1);   opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 0.6; }
            100% { transform: translateY(-120px) scale(1.15); opacity: 0; }
          }
          @keyframes orbDrift {
            0%   { transform: translate(0px, 0px) scale(1); }
            33%  { transform: translate(40px, -30px) scale(1.08); }
            66%  { transform: translate(-25px, -55px) scale(0.95); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0.5); }
            50%       { opacity: 1; transform: scale(1.2); }
          }
          @keyframes starTwinkle {
            0%, 100% { opacity: 0.1; }
            50%       { opacity: 0.7; }
          }
          @keyframes busDrive {
            0%   { transform: translateX(-200px); opacity: 0; }
            6%   { opacity: 1; }
            94%  { opacity: 1; }
            100% { transform: translateX(calc(100vw + 200px)); opacity: 0; }
          }
          @keyframes cityScroll {
            0%   { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-33.33%, 0, 0); }
          }
          @keyframes roadDash {
            0%   { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-100px, 0, 0); }
          }
          .gpu-accelerated {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
        `}</style>

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        {/* ── Animated floating particles across entire hero ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, overflow: 'hidden' }}>
          {[
            { left: '5%', top: '70%', size: 5, delay: '0s', dur: '6s', color: 'rgba(255,255,255,0.35)' },
            { left: '12%', top: '60%', size: 3, delay: '1s', dur: '8s', color: 'rgba(255,255,255,0.35)' },
            { left: '20%', top: '80%', size: 6, delay: '0.5s', dur: '7s', color: 'rgba(52,211,153,0.4)' },
            { left: '28%', top: '65%', size: 4, delay: '2.5s', dur: '9s', color: 'rgba(255,255,255,0.25)' },
            { left: '35%', top: '75%', size: 3, delay: '1.8s', dur: '6.5s', color: 'rgba(255,255,255,0.25)' },
            { left: '42%', top: '55%', size: 7, delay: '0.3s', dur: '10s', color: 'rgba(255,255,255,0.2)' },
            { left: '50%', top: '72%', size: 4, delay: '3s', dur: '7.5s', color: 'rgba(255,255,255,0.4)' },
            { left: '58%', top: '68%', size: 5, delay: '1.2s', dur: '8.5s', color: 'rgba(52,211,153,0.3)' },
            { left: '65%', top: '78%', size: 3, delay: '0.8s', dur: '6s', color: 'rgba(255,255,255,0.3)' },
            { left: '72%', top: '62%', size: 6, delay: '2s', dur: '9.5s', color: 'rgba(255,255,255,0.3)' },
            { left: '80%', top: '70%', size: 4, delay: '1.5s', dur: '7s', color: 'rgba(255,255,255,0.25)' },
            { left: '88%', top: '65%', size: 5, delay: '0.6s', dur: '8s', color: 'rgba(52,211,153,0.4)' },
            { left: '94%', top: '75%', size: 3, delay: '2.2s', dur: '6.5s', color: 'rgba(255,255,255,0.35)' },
            { left: '8%', top: '40%', size: 4, delay: '3.5s', dur: '11s', color: 'rgba(255,255,255,0.15)' },
            { left: '25%', top: '35%', size: 3, delay: '4s', dur: '9s', color: 'rgba(255,255,255,0.2)' },
            { left: '55%', top: '30%', size: 5, delay: '2.8s', dur: '12s', color: 'rgba(255,255,255,0.15)' },
            { left: '75%', top: '38%', size: 4, delay: '1.3s', dur: '10s', color: 'rgba(255,255,255,0.25)' },
            { left: '90%', top: '45%', size: 3, delay: '0.9s', dur: '8s', color: 'rgba(52,211,153,0.3)' },
          ].map((p, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.color,
              animation: `floatUp ${p.dur} ${p.delay} ease-in-out infinite`,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            }} />
          ))}
        </div>

        {/* ── Twinkling star dots scattered across hero ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          {[
            { left: '3%', top: '15%', delay: '0s', dur: '3s' },
            { left: '15%', top: '8%', delay: '1s', dur: '4s' },
            { left: '27%', top: '20%', delay: '2s', dur: '3.5s' },
            { left: '40%', top: '12%', delay: '0.5s', dur: '5s' },
            { left: '53%', top: '18%', delay: '1.5s', dur: '3s' },
            { left: '67%', top: '7%', delay: '3s', dur: '4.5s' },
            { left: '78%', top: '22%', delay: '0.8s', dur: '3.5s' },
            { left: '88%', top: '10%', delay: '2.5s', dur: '4s' },
            { left: '95%', top: '25%', delay: '1.2s', dur: '3s' },
            { left: '10%', top: '45%', delay: '3.5s', dur: '5s' },
            { left: '32%', top: '48%', delay: '2.2s', dur: '4s' },
            { left: '60%', top: '42%', delay: '0.3s', dur: '3.5s' },
            { left: '82%', top: '50%', delay: '1.8s', dur: '4.5s' },
          ].map((s, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: s.left,
              top: s.top,
              width: '2px',
              height: '2px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.8)',
              animation: `starTwinkle ${s.dur} ${s.delay} ease-in-out infinite`,
              boxShadow: '0 0 4px rgba(255,255,255,0.6)',
            }} />
          ))}
        </div>

        {/* ── Drifting ambient light orbs (large, slow, blurry) ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div style={{
            position: 'absolute', top: '10%', left: '5%',
            width: '320px', height: '320px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            animation: 'orbDrift 18s ease-in-out infinite',
            filter: 'blur(12px)',
          }} />
          <div style={{
            position: 'absolute', top: '5%', right: '5%',
            width: '380px', height: '380px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            animation: 'orbDrift 22s 4s ease-in-out infinite',
            filter: 'blur(18px)',
          }} />
          <div style={{
            position: 'absolute', top: '35%', left: '35%',
            width: '260px', height: '260px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(42,138,78,0.18) 0%, transparent 70%)',
            animation: 'orbDrift 26s 2s ease-in-out infinite',
            filter: 'blur(20px)',
          }} />
          <div style={{
            position: 'absolute', top: '20%', right: '25%',
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
            animation: 'orbDrift 15s 7s ease-in-out infinite',
            filter: 'blur(10px)',
          }} />
        </div>

        {/* Glow blobs (original) */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)' }} />
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)' }} />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-10 md:pt-16 pb-4">
          <div className="flex flex-col items-center text-center gap-3 md:gap-5">

            {/* Badge */}
            <div className="fade-up-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.25)' }}>
              🚌 Kerala State Road Transport Corporation
            </div>

            {user && (
              <div className="fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                👋 Welcome back, {user.username}
              </div>
            )}

            {/* Heading */}
            <div className="fade-up-2 space-y-0.5 md:space-y-3 max-w-4xl">
              <h1 className="font-heading font-extrabold text-xl sm:text-4xl md:text-6xl text-white leading-tight tracking-tight drop-shadow-lg p-1 md:p-2">
                Travel Kerala with<br />
                <span>
                  Comfort & Pride
                </span>
              </h1>
              <p className="hidden xs:block text-white/75 text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
                Book KSRTC bus tickets across God's Own Country. 14 districts, 5000+ routes.
              </p>
            </div>

            {/* Trust chips */}
            <div className="fade-up-3 hidden sm:flex flex-wrap justify-center gap-3">
              {['Free Booking', 'Instant Confirmation', 'All Routes'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-white/70">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400" />{t}
                </span>
              ))}
            </div>

            {/* Search */}
            <div className="fade-up-4 w-full">
              <BusSearch />
            </div>
          </div>
        </div>

        {/* ─── ANIMATED CITY & ROAD SCENE ─── */}
        <div className="relative w-full overflow-hidden flex-1"
          style={{ minHeight: '310px' }}>

          {/* No scaling wrapper needed - flat layout with responsive height */}

          {/* ─── KERALA ENVIRONMENT BACKGROUND ─── */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <svg width="100%" height="100%" viewBox="0 0 1440 280" preserveAspectRatio="xMidYMid slice" fill="none">
              <defs>
                <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f4020" />
                  <stop offset="100%" stopColor="#0a3018" />
                </linearGradient>
                <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a6e3c" />
                  <stop offset="100%" stopColor="#0f4525" />
                </linearGradient>
                <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a5040" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0a2a1a" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* ── Distant mountains / Western Ghats ── */}
              <path d="M0 180 Q120 100 240 145 Q360 90 480 135 Q600 80 720 130 Q840 95 960 140 Q1080 85 1200 128 Q1320 100 1440 138 L1440 280 L0 280 Z"
                fill="url(#hillFar)" opacity="0.7" />

              {/* ── Mid hills — rolling Kerala ridgeline ── */}
              <path d="M0 200 Q100 155 200 175 Q300 145 400 168 Q500 148 600 172 Q700 155 800 180 Q900 158 1000 178 Q1100 152 1200 170 Q1320 158 1440 175 L1440 280 L0 280 Z"
                fill="url(#hillNear)" opacity="0.85" />

              {/* ── Near ground strip ── */}
              <path d="M0 225 Q200 210 400 220 Q600 208 800 218 Q1000 207 1200 216 Q1320 210 1440 215 L1440 280 L0 280 Z"
                fill="#0f4525" />

              {/* ── Kerala Backwater strip ── */}
              <rect x="0" y="210" width="1440" height="15" fill="url(#waterGrad)" rx="2" />
              {/* Water shimmer lines */}
              {[60, 180, 300, 440, 580, 720, 860, 1000, 1140, 1280].map((x, i) => (
                <line key={i} x1={x} y1={213 + i % 3} x2={x + 60} y2={214 + (i + 1) % 3}
                  stroke="white" strokeWidth="0.8" opacity="0.12" />
              ))}

              {/* ── COCONUT PALM TREES ── */}
              {[
                { x: 85, h: 90, lean: -4 },
                { x: 105, h: 75, lean: 3 },
                { x: 310, h: 85, lean: -3 },
                { x: 560, h: 95, lean: 5 },
                { x: 580, h: 70, lean: -2 },
                { x: 810, h: 88, lean: -4 },
                { x: 830, h: 72, lean: 4 },
                { x: 1060, h: 90, lean: 3 },
                { x: 1300, h: 82, lean: -5 },
                { x: 1320, h: 68, lean: 3 },
              ].map((p, i) => (
                <g key={i} transform={`translate(${p.x}, ${228 - p.h}) rotate(${p.lean}, ${p.x} ${228})`}>
                  {/* Trunk */}
                  <path d={`M0 0 Q${p.lean > 0 ? 3 : -3} ${p.h / 2} 0 ${p.h}`}
                    stroke="#4a3010" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                  {/* Fronds */}
                  {[-40, -25, -10, 10, 25, 40].map((angle, j) => (
                    <g key={j} transform={`rotate(${angle})`}>
                      <path d={`M0 0 Q${angle > 0 ? 20 : -20} -8 ${angle > 0 ? 35 : -35} 5`}
                        stroke="#2d7a3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    </g>
                  ))}
                  {/* Coconuts */}
                  <circle cx="-4" cy="6" r="3.5" fill="#8b6914" opacity="0.8" />
                  <circle cx="4" cy="8" r="3.5" fill="#8b6914" opacity="0.8" />
                </g>
              ))}

              {/* ── Paddy/greenery silhouettes (near ground) ── */}
              {[0, 80, 200, 350, 500, 680, 850, 1020, 1200, 1370].map((x, i) => (
                <g key={i} opacity="0.6">
                  <ellipse cx={x + 20} cy="228" rx="22" ry="7" fill="#1a6e3c" />
                  <ellipse cx={x + 40} cy="226" rx="16" ry="5" fill="#2a8a4e" />
                </g>
              ))}

              {/* ── Birds (simple V shapes) ── */}
              {[[200, 55], [450, 35], [800, 60], [1100, 40], [1350, 50]].map(([x, y], i) => (
                <g key={i} fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.3">
                  <path d={`M${x} ${y} Q${x + 5} ${y - 4} ${x + 10} ${y}`} />
                  <path d={`M${x + 10} ${y} Q${x + 15} ${y - 4} ${x + 20} ${y}`} />
                </g>
              ))}

              {/* Fade bottom to road */}
              <rect x="0" y="220" width="1440" height="60" fill="black" opacity="0.35" />
            </svg>
          </div>


          {/* ─── SCROLLING BUILDINGS ─── */}
          <div
            className="gpu-accelerated"
            style={{
              position: 'absolute', bottom: '83px', left: 0, zIndex: 2,
              display: 'flex', alignItems: 'flex-end',
              animation: 'cityScroll 45s linear infinite',
              willChange: 'transform',
              contain: 'layout paint',
            }}>
            <BuildingSet />
            <BuildingSet />
            <BuildingSet />
          </div>

          {/* ─── ROAD ─── */}
          <div
            className="gpu-accelerated"
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '85px',
              background: '#181818', zIndex: 3,
              contain: 'layout paint'
            }}>
            {/* Amber top line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#e8a020', opacity: 0.4 }} />
            {/* Scrolling yellow dashes */}
            <div
              className="gpu-accelerated"
              style={{
                position: 'absolute', top: '50%', left: 0, display: 'flex',
                transform: 'translateY(-50%)',
                animation: 'roadDash 1.2s linear infinite',
                willChange: 'transform',
              }}>
              {Array.from({ length: 60 }).map((_, i) => (
                <div key={i} style={{
                  width: '65px', height: '5px', borderRadius: '3px', flexShrink: 0,
                  background: i % 2 === 0 ? '#ffe066' : 'transparent',
                  marginRight: '35px',
                }} />
              ))}
            </div>
            {/* Bottom kerb */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '5px', background: '#2a2a2a' }} />
          </div>

          {/* ─── REALISTIC KSRTC BUS ─── */}
          <div
            className="gpu-accelerated"
            style={{
              position: 'absolute', bottom: '82px', left: 0, zIndex: 5,
              animation: 'busDrive 11s linear infinite',
              willChange: 'transform',
              filter: 'drop-shadow(0 12px 16px rgba(0,0,0,0.45))',
              contain: 'layout paint',
            }}>
            <svg width="240" height="130" viewBox="0 0 240 130" fill="none">
              <defs>
                {/* KSRTC Super Fast Livery: Red at bottom, Yellow at top */}
                <linearGradient id="ksrtcLivery" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fef08a" /> {/* Yellow top */}
                  <stop offset="48%" stopColor="#facc15" />
                  <stop offset="52%" stopColor="#ef4444" /> {/* Red bottom separator */}
                  <stop offset="100%" stopColor="#b91c1c" />
                </linearGradient>
                <linearGradient id="ksrtcWindow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#bae6fd" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Ground Shadow */}
              <ellipse cx="120" cy="122" rx="100" ry="6" fill="black" opacity="0.3" />

              {/* Main Body Chassis */}
              <rect x="5" y="95" width="225" height="15" rx="4" fill="#1e293b" />

              {/* Iconic KSRTC Body Shape */}
              <path d="M2 25 Q2 15 15 15 L215 15 Q235 15 235 45 L235 105 L2 105 Z" fill="url(#ksrtcLivery)" />

              {/* White Stripe Separator */}
              <rect x="2" y="58" width="233" height="4" fill="white" opacity="0.2" />

              {/* Front Windshield - Large & Curved */}
              <path d="M185 22 L225 22 Q232 22 232 30 L232 55 L185 55 Z" fill="#0f172a" />
              <path d="M187 24 L223 24 Q230 24 230 30 L230 53 L187 53 Z" fill="url(#ksrtcWindow)" />

              {/* Passenger Windows - Classic Rectangular with rounded corners */}
              {[15, 48, 81, 114, 147].map((x, i) => (
                <g key={i}>
                  <rect x={x} y="22" width="28" height="32" rx="3" fill="#0f172a" />
                  <rect x={x + 1} y="23" width="26" height="30" rx="2" fill="url(#ksrtcWindow)" />
                  {/* Window Grill lines (classic KSRTC) */}
                  <line x1={x + 1} y1="38" x2={x + 27} y2="38" stroke="white" strokeWidth="0.5" opacity="0.2" />
                </g>
              ))}

              {/* Side Mirror */}

              <rect x="235" y="38" width="4" height="12" rx="1" fill="#222" stroke="#444" strokeWidth="0.5" />

              {/* Destination board removed to keep the front window clear */}

              {/* Lettering - Realistic KSRTC Font Style */}
              <text x="100" y="85" fontSize="16" fill="#fef08a" fontWeight="900" textAnchor="middle" style={{ letterSpacing: '4px', fontFamily: 'serif', filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.2))' }}>KSRTC</text>





              {/* Mechanical Details */}
              <rect x="210" y="65" width="20" height="12" rx="2" fill="#94a3b8" opacity="0.1" /> {/* Ventilation grill */}
              <circle cx="225" cy="70" r="3" fill="#fff" opacity="0.9" /> {/* Headlight */}
              <circle cx="225" cy="70" r="1.5" fill="#fef08a" />
              <rect x="233" y="100" width="2" height="5" fill="#1e293b" /> {/* Mudflap */}

              {/* Wheels */}
              {[60, 185].map(x => (
                <g key={x} style={{ transformOrigin: `${x}px 110px`, animation: 'spin 0.4s linear infinite' }}>
                  <circle cx={x} cy="110" r="16" fill="#18181b" />
                  <circle cx={x} cy="110" r="11" fill="#334155" />
                  <circle cx={x} cy="110" r="8" fill="#1e293b" />
                  <rect x={x - 1} y="102" width="2" height="16" fill="#475569" opacity="0.3" />
                  <rect x={x - 8} y="109" width="16" height="2" fill="#475569" opacity="0.3" />
                </g>
              ))}
            </svg>
          </div>

        </div> {/* ─── End of ANIMATED CITY & ROAD SCENE ─── */}

        {/* Stats strip - Hidden always to save vertical space */}
        <div className="hidden" style={{ background: 'rgba(0,0,0,0.25)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {stats.map((s, i) => (
                <div key={s.label} className={`fade-up-${Math.min(i + 1, 4)}`}>
                  <div className="font-heading font-black text-2xl md:text-3xl text-white">{s.value}</div>
                  <div className="text-xs text-white/60 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}

      </section >

      {/* ═══ FEATURES ═══ */}
      <section id="routes" className="py-10 md:py-16 bg-background scroll-mt-16" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-12">
            <div className="ksrtc-badge mx-auto mb-3">Our Services</div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Why Choose KSRTC?</h2>
            <p className="mt-2 text-muted-foreground max-w-lg mx-auto text-sm">The backbone of Kerala's public transport for over 6 decades.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="feature-card group cursor-default">
                <div className="w-12 h-12 rounded-xl ksrtc-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg float-anim">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-base mb-1.5 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* ═══ ABOUT SECTION (Text-only) ═══ */}
      < section id="about" className="py-32 relative overflow-hidden min-h-screen flex flex-col justify-center scroll-mt-16" style={{ background: 'linear-gradient(160deg, #113d23 0%, #0a2916 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-xs shadow-lg">K</div>
              <span className="text-sm font-bold text-accent tracking-widest uppercase">Our Heritage & Mission</span>
            </div>
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white leading-[1.15] mb-6">
              The <span className="text-accent text-gradient-gold">Life Line</span> of <br />God's Own Country.
            </h2>
            <div className="w-16 h-1.5 bg-accent rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-lg text-white/90 font-medium leading-relaxed">
                Established in 1965, the Kerala State Road Transport Corporation (KSRTC) has been more than just a transport service—it's the unbreakable bond connecting the heart of Kerala to its farthest corners.
              </p>
              <p className="text-white/60 leading-relaxed">
                From the misty hills of Wayanad to the serene backwaters of Alappuzha, our fleet of over 5,000 buses traverses 1.2 million kilometers every single day. We don't just move people; we move the economy, education, and the very spirit of Kerala.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-white/60 leading-relaxed">
                Our commitment to "Safe, Reliable, and Affordable" travel is at the core of everything we do. Whether it's the premium 'Swift' services or the humble village shuttle, every journey is a testament to our dedication to public service.
              </p>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm">
                <h4 className="font-heading font-bold text-accent mb-3 text-lg italic">"Aana Vandi" - A Symbol of Nostalgia</h4>
                <p className="text-sm text-white/50">
                  Affectionately called the 'Aana Vandi', the KSRTC bus is a symbol of nostalgia for every Malayali, representing a legacy of trust that has spanned generations.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl font-black text-white">1965</div>
              <div className="text-xs uppercase tracking-widest text-white/40 mt-1">Established</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white">5000+</div>
              <div className="text-xs uppercase tracking-widest text-white/40 mt-1">Bus Fleet</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white">14</div>
              <div className="text-xs uppercase tracking-widest text-white/40 mt-1">Districts Connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white">1M+</div>
              <div className="text-xs uppercase tracking-widest text-white/40 mt-1">Daily Passengers</div>
            </div>
          </div>
        </div>
      </section >

      {/* ═══ FOOTER ═══ */}
      {/* ═══ FOOTER ═══ */}
      <footer id="contact" style={{ background: 'linear-gradient(to bottom, #071a0b, #051408)' }} className="text-white pt-32 pb-16 min-h-[80vh] flex flex-col justify-between scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Section: Branding & Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg shadow-green-900/20">
                  <span className="text-white font-black text-lg">K</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-2xl tracking-tight text-white">KSRTC Kerala</h3>
                  <p className="text-xs text-green-500 font-bold tracking-widest uppercase">God's Own Country's Life Line</p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed mb-8">
                The Kerala State Road Transport Corporation has been the backbone of public transport in Kerala since 1965, connecting every village, town, and city with safe and affordable transit.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Facebook, color: '#1877F2' },
                  { Icon: Twitter, color: '#1DA1F2' },
                  { Icon: Instagram, color: '#E4405F' },
                  { Icon: Youtube, color: '#FF0000' }
                ].map(({ Icon, color }, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group">
                    <Icon size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">Navigation</h4>
              <ul className="space-y-4 text-gray-400">
                {['About KSRTC', 'Bus Schedules', 'Online Booking'].map(link => (
                  <li key={link}>
                    <a href="#" className="hover:text-green-500 transition-colors flex items-center gap-2 group">
                      <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">Our Promise</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                We are committed to providing the safest, most reliable, and comfortable travel experience. Connecting every corner of God's Own Country with punctuality and care since 1965.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-white/5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 text-green-500">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Helpline</p>
                <p className="text-white font-medium">1800-599-1800</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 text-green-500">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Support</p>
                <p className="text-white font-medium">info@ksrtc.kerala.gov.in</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 text-green-500">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Headquarters</p>
                <p className="text-white font-medium">Thampanoor, Thiruvananthapuram</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} KSRTC Kerala. All rights reserved.</p>
              <p className="mt-1 flex items-center justify-center md:justify-start gap-2">
                <span>Terms of Service</span>
                <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                <span>Privacy Policy</span>
              </p>
            </div>
            <div className="flex items-center gap-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">In Collaboration with</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-[8px]">G</span>
                </div>
                <span className="text-white font-bold text-xs">Govt. of Kerala</span>
              </div>
            </div>
          </div>


        </div>
      </footer>
    </div >
  )
}

export default Hero