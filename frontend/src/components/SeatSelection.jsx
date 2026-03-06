import { API_URL } from '../config';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Info, ShieldCheck, ArrowRight } from 'lucide-react';

/* ── Steering wheel ── */
const SteeringWheel = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
    {/* Outer Rim - Thick & Dark */}
    <circle cx="21" cy="21" r="19" stroke="#1e293b" strokeWidth="3.5" />
    <circle cx="21" cy="21" r="17.2" stroke="#334155" strokeWidth="0.8" />

    {/* Center Hub */}
    <circle cx="21" cy="21" r="6.5" fill="#334155" stroke="#1e293b" strokeWidth="1" />
    <circle cx="21" cy="21" r="2.5" fill="#94a3b8" />

    {/* Spokes (3-spoke classic bus design) */}
    {/* Bottom Spoke */}
    <rect x="19.5" y="27" width="3" height="11" rx="1" fill="#334155" stroke="#1e293b" strokeWidth="0.5" />

    {/* Top Left Spoke */}
    <path d="M16 17 L7 9" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
    <path d="M16 17 L7 9" stroke="#1e293b" strokeWidth="0.5" strokeLinecap="round" />

    {/* Top Right Spoke */}
    <path d="M26 17 L35 9" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
    <path d="M26 17 L35 9" stroke="#1e293b" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
);

/* ──────────────────────────────────────────────
   SEAT SVG — exactly matches the reference image.
   Technique: draw shapes in layers, cover seams
   with fill-only white rects so the outline looks
   like one connected outline path.
   ────────────────────────────────────────────── */
const SeatIcon = ({ type = 'available' }) => {
  const isSold = type === 'sold';
  const isLadies = type === 'ladies' || type === 'ladies-sel';
  const isSel = type === 'selected' || type === 'ladies-sel';

  const s = isSold ? '#b8b8c0'      // stroke
    : isLadies ? '#f472b6'
      : '#22c55e';

  const bg = isSold ? '#f0f0f2'     // fill
    : isSel && isLadies ? '#f472b6' // full pink for selected ladies
      : isSel ? '#22c55e'           // full green for selected available
        : '#ffffff';

  return (
    <svg width="40" height="42" viewBox="0 0 40 42" fill="none">
      {/* ── Backrest (Top Part) — moved down to touch the cushion line ── */}
      <path
        d="M9 26 L9 9 Q 9 4 14 4 L 26 4 Q 31 4 31 9 L 31 26"
        fill={bg}
        stroke={s}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* ── Seat Frame (Armrests + Base) ── */}
      {/* This 'U' shape forms the bucket look in the image */}
      <path
        d="M5 16 C5 14 7 14 9 14 L12 14 C12 14 12 26 12 26 L28 26 C28 26 28 14 28 14  C33 14 35 14 35 16 L35 32 C35 36 32 38 28 38 L12 38 C8 38 5 36 5 32 Z"
        fill={bg}
        stroke={s}
        strokeWidth="2.2"
        fillRule="evenodd"
      />
    </svg>
  );
};

/* ══════════════════════════════════════════════════════════
   SeatSelection — 2 + 3 layout, steering wheel top-right
   Ladies seats: rows 1-2, right side (cols C, D, E)
══════════════════════════════════════════════════════════ */
const SeatSelection = ({ bus, travelDate, onSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loadingSeats, setLoadingSeats] = useState(true);

  const ticketPrice = bus.basePrice || 249;
  const seatsPerRow = 5; // 2 + 3
  const rows = Math.ceil(bus.totalSeats / seatsPerRow);

  /* Entry/exit gap row on the LEFT side:
     - Row 2 = front entry gap
     - 3rd row from back = rear exit
  */
  const gapRows = new Set([2, Math.max(1, rows - 2)]);

  /* Ladies seats: rows 1-2, right columns only */
  const isLadiesSeat = (row, col) => row <= 2 && col >= 2;

  useEffect(() => {
    if (!bus._id || !travelDate) return;
    setLoadingSeats(true);
    axios.get(`${API_URL}/booking/booked-seats?busId=${bus._id}&date=${travelDate}`)
      .then(res => { if (res.data.success) setBookedSeats(res.data.data); })
      .catch(() => { })
      .finally(() => setLoadingSeats(false));
  }, [bus._id, travelDate]);

  const sid = (row, col) => `${row}${String.fromCharCode(65 + col)}`;

  const getSeatType = (row, col) => {
    const id = sid(row, col);
    if (bookedSeats.includes(id)) return 'sold';
    const ladies = isLadiesSeat(row, col);
    const sel = !!selectedSeats.find(s => s.id === id);
    if (ladies && sel) return 'ladies-sel';
    if (ladies) return 'ladies';
    if (sel) return 'selected';
    return 'available';
  };

  const handleClick = (row, col) => {
    const id = sid(row, col);
    if (bookedSeats.includes(id)) return;
    setSelectedSeats(prev =>
      prev.find(s => s.id === id)
        ? prev.filter(s => s.id !== id)
        : [...prev, { id, price: ticketPrice }]
    );
  };

  const totalPrice = selectedSeats.reduce((s, x) => s + x.price, 0);

  /* ── One seat cell ── */
  const Seat = ({ row, col }) => {
    const type = getSeatType(row, col);
    const sold = type === 'sold';
    return (
      <div
        className={`flex flex-col items-center ${sold ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'} transition-opacity`}
        onClick={() => !sold && handleClick(row, col)}
      >
        <SeatIcon type={type} />
        <span className={`text-[10px] font-semibold leading-none mt-0.5 ${sold ? 'text-gray-400' : 'text-gray-500'}`}>
          {sold ? 'Sold' : `₹${ticketPrice}`}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-slate-50/60 border-t border-border/20 px-4 py-6 flex flex-col lg:flex-row gap-6 items-start justify-center">

      {/* ════════════ BUS BODY CARD ════════════ */}
      <div className="w-full lg:w-auto flex justify-center">
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-lg relative"
          style={{ padding: '18px 24px 28px 24px', width: 380 }}>

          {/* Top section: Conductor seat on left + Steering wheel on right (Moved back to top) */}
          <div className="flex justify-between items-center mb-5 px-1">
            <Seat row={0} col={0} />
            <SteeringWheel />
          </div>

          {/* Loading spinner */}
          {loadingSeats && (
            <div className="absolute inset-0 bg-white/80 rounded-[32px] z-10 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* ── Seat rows ── */}
          <div className="flex flex-col gap-1 mt-9">
            {[...Array(rows)].map((_, ri) => {
              const row = ri + 1;
              return (
                <div key={row} className="flex items-end justify-between px-2">
                  {/* Left — 2 seats, gap logic for entry/exit rows */}
                  <div className="flex gap-2" style={{ width: 96 }}>
                    {gapRows.has(row) ? (
                      /* Empty door gap — no seats at all */
                      <div style={{ width: 96, height: 62 }} />
                    ) : (
                      <>
                        <Seat row={row} col={0} />
                        <Seat row={row} col={1} />
                      </>
                    )}
                  </div>

                  {/* Right — 3 seats */}
                  <div className="flex gap-2">
                    <Seat row={row} col={2} />
                    <Seat row={row} col={3} />
                    <Seat row={row} col={4} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════════════ BOOKING SUMMARY ════════════ */}
      <div className="w-full lg:w-72 space-y-4 shrink-0">
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-sm">
          <h4 className="font-heading font-bold text-base mb-4 flex items-center gap-2 text-foreground">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Booking Summary
          </h4>

          {selectedSeats.length > 0 ? (
            <div className="space-y-4">
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {selectedSeats.map(s => (
                  <div key={s.id} className="flex justify-between items-center text-sm py-1 border-b border-border/30 last:border-0">
                    <span className="text-muted-foreground font-medium">Seat {s.id}</span>
                    <span className="font-bold text-foreground">₹{s.price}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t-2 border-dashed border-border flex justify-between items-end">
                <span className="text-sm text-muted-foreground font-medium">Total</span>
                <div className="font-heading font-black text-2xl text-primary">₹{totalPrice}</div>
              </div>
              <Button
                className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-sm active:scale-[0.98] transition-all"
                onClick={() => onSelect(selectedSeats)}
              >
                Proceed to Pay <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          ) : (
            <div className="py-6 text-center space-y-2">
              <div className="w-10 h-10 bg-muted/40 rounded-full flex items-center justify-center mx-auto">
                <Info className="w-5 h-5 text-muted-foreground/40" />
              </div>
              <p className="text-sm text-muted-foreground">Tap a seat to select it</p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="bg-white rounded-2xl border border-border/60 p-4 shadow-sm">
          <h5 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Legend</h5>
          <div className="space-y-2.5">
            {[
              { stroke: '#22c55e', bg: '#fff', label: 'Available' },
              { stroke: '#22c55e', bg: '#f0fdf4', label: 'Selected' },
              { stroke: '#f472b6', bg: '#fff', label: 'Ladies Seats' },
              { stroke: '#b8b8c0', bg: '#f0f0f2', label: 'Sold Out' },
            ].map(({ stroke, bg, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg border-2 shrink-0" style={{ borderColor: stroke, background: bg }} />
                <span className="text-xs text-muted-foreground font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
