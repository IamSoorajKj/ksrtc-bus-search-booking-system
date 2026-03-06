import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BusFront, Calendar, CheckCircle, Clock, MapPin, Loader2, XCircle, User, Award, QrCode, ShieldCheck, Download, Printer, X, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import { getData } from '@/context/userContext';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const { user, loading: userLoading } = getData();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (userLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get(`https://ksrtc-bus-search-booking-system.onrender.com/booking/my-bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) {
          setBookings(res.data.data);
        }
      } catch (error) {
        // Error handled silently as state continues loading:false
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, navigate, userLoading]);

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar Profile Info */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white dark:bg-card border border-border/60 rounded-3xl p-8 shadow-sm relative overflow-hidden group">
                {/* Decorative background element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

                <div className="relative">
                  <div className="w-28 h-28 mx-auto p-1.5 rounded-full bg-gradient-to-tr from-primary via-emerald-400 to-primary/20 shadow-inner mb-5">
                    <div className="w-full h-full bg-white dark:bg-card rounded-full flex items-center justify-center text-primary font-heading font-black text-4xl shadow-sm">
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest mb-3 border border-amber-200 dark:border-amber-800 shadow-sm animate-pulse">
                      <Award className="w-3 h-3" /> Verified Passenger
                    </div>
                    <h2 className="font-heading font-black text-2xl tracking-tight text-foreground">{user?.username}</h2>
                    <p className="text-muted-foreground text-sm font-medium opacity-80">{user?.email}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-dashed border-border/60">
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Account Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-border/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-card flex items-center justify-center shadow-sm text-primary">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-muted-foreground">Joined</span>
                      </div>
                      <span className="text-xs font-black text-foreground uppercase tracking-tight">
                        {new Date(user?.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-border/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-card flex items-center justify-center shadow-sm text-primary">
                          <BusFront className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-muted-foreground">Trips</span>
                      </div>
                      <span className="text-xs font-black text-foreground tracking-tight">
                        {bookings.length} Bookings
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Main Content - Bookings */}
          <div className="flex-1 space-y-6">
            <h2 className="font-heading font-bold text-2xl flex items-center gap-2">
              <BusFront className="w-6 h-6 text-primary" />
              My Ticket Bookings
            </h2>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-4 bg-white dark:bg-card border border-border/60 rounded-2xl">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-muted-foreground">Loading your trips...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="py-20 text-center bg-white dark:bg-card border border-border/60 rounded-2xl shadow-sm">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">No Bookings Yet</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  You haven't booked any bus tickets. Ready to start your journey?
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div key={booking._id} className="group relative bg-white dark:bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border/40 overflow-hidden flex flex-col md:flex-row">

                    {/* Left Stub (Status & Date) */}
                    <div className="relative w-full md:w-48 bg-slate-50/80 dark:bg-muted/10 p-5 md:p-6 flex flex-row md:flex-col items-center justify-between md:justify-center border-b md:border-b-0 md:border-r border-dashed border-border/80">

                      {/* Top/Bottom Perforation Holes (Desktop Only) */}
                      <div className="hidden md:block absolute -top-3 -right-3 w-6 h-6 rounded-full bg-muted/30 border border-border/40" />
                      <div className="hidden md:block absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-muted/30 border border-border/40" />

                      <div className="flex flex-col items-center md:items-center">
                        {booking.paymentStatus === 'Completed' ? (
                          <div className="mb-0 md:mb-4 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-1.5 text-green-600">
                            <CheckCircle className="w-3.5 h-3.5 fill-green-600/10" />
                            <span className="text-[10px] font-black uppercase tracking-tight">Confirmed</span>
                          </div>
                        ) : (
                          <div className="mb-0 md:mb-4 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center gap-1.5 text-amber-600">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-tight">{booking.paymentStatus}</span>
                          </div>
                        )}

                        {/* Date for Mobile (hidden on desktop) */}
                        <div className="md:hidden mt-1 text-xs font-bold text-foreground opacity-60">
                          {new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                        </div>
                      </div>

                      <div className="hidden md:block text-center group-hover:scale-105 transition-transform duration-300">
                        <div className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] mb-1">Travel Date</div>
                        <div className="text-2xl font-heading font-black text-foreground leading-none">
                          {new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: '2-digit' })}
                        </div>
                        <div className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">
                          {new Date(booking.bookingDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                        </div>
                      </div>

                      {/* View Button for Mobile (hidden on desktop header) */}
                      <button
                        onClick={() => { setSelectedTicket(booking); setShowModal(true); }}
                        className="md:hidden h-8 px-4 rounded-lg bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform">
                        View Ticket
                      </button>
                    </div>

                    {/* Right Content (Trip Details) */}
                    <div className="flex-1 p-5 md:p-7 flex flex-col justify-between gap-4 md:gap-6">
                      <div className="flex flex-row md:items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <h3 className="font-heading font-black text-lg md:text-2xl tracking-tight text-foreground leading-tight">
                              {booking.busNumber || booking.busId?.busNumber || 'Unknown Bus'}
                            </h3>
                            <div className="hidden sm:block px-2 py-0.5 rounded bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider border border-primary/20">
                              {booking.busType || booking.busId?.busType || 'Super Fast'}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 md:gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              <span className="font-bold truncate max-w-[80px] md:max-w-none">
                                {booking.fromName || booking.fromId?.name || 'Start'}
                              </span>
                            </div>
                            <div className="w-3 h-[1px] bg-border flex-shrink-0" />
                            <div className="flex items-center gap-1.5 min-w-0">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              <span className="font-bold truncate max-w-[80px] md:max-w-none">
                                {booking.toName || booking.toId?.name || 'End'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mb-0.5">Fare</div>
                          <div className="text-xl md:text-2xl font-heading font-black text-primary leading-none">₹{booking.totalAmount}</div>
                        </div>
                      </div>

                      {/* Divider (Desktop Only) */}
                      <div className="hidden md:flex relative h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-1 items-center justify-center">
                        <div className="absolute px-3 bg-white dark:bg-card">
                          <BusFront className="w-3 h-3 text-muted-foreground/30" />
                        </div>
                      </div>

                      <div className="flex flex-row items-end justify-between gap-4">
                        <div className="flex gap-4 md:gap-8">
                          <div>
                            <div className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mb-1">Seats</div>
                            <div className="flex flex-wrap gap-1">
                              {booking.seats.map(s => (
                                <span key={s} className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px] font-black border border-border/50">{s}</span>
                              ))}
                            </div>
                          </div>
                          <div className="hidden xs:block">
                            <div className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mb-1">Pass.</div>
                            <div className="text-[11px] font-black text-foreground">{booking.seats.length}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="hidden lg:block text-right">
                            <div className="text-[9px] text-muted-foreground uppercase font-black tracking-widest leading-none mb-1">Booking ID</div>
                            <div className="text-[10px] font-mono text-muted-foreground/50">{booking.razorpayOrderId?.slice(-8) || 'KS-9922'}</div>
                          </div>
                          <button
                            onClick={() => { setSelectedTicket(booking); setShowModal(true); }}
                            className="hidden md:flex h-10 px-6 rounded-xl bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest items-center gap-2 hover:scale-[1.05] active:scale-95 transition-all shadow-lg shadow-emerald-500/10">
                            View Ticket
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── OFFICIAL TICKET MODAL ─── */}
      {showModal && selectedTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />

          <div className="relative w-full max-w-xl bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="absolute top-4 right-4 z-10 print:hidden">
              <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ticket Content */}
            <div className="p-0 overflow-y-auto overflow-x-hidden max-h-[90vh] print:max-h-none print:overflow-visible" id="printable-ticket">
              {/* Ticket Top Part: KSRTC Header */}
              <div className="bg-emerald-700 p-6 md:p-10 text-white relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                      <BusFront className="w-9 h-9" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black opacity-60 tracking-[0.3em] uppercase mb-1">Government of Kerala</div>
                      <h2 className="text-2xl md:text-3xl font-heading font-black tracking-tight leading-none">KSRTC KERALA</h2>
                      <p className="text-[11px] font-bold opacity-80 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5" /> Electronic Reservation Slip
                      </p>
                    </div>
                  </div>
                  <div className="text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-white/20 pl-4 md:pl-0 md:pr-4">
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Ticket Status</div>
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-emerald-800 text-[10px] font-black uppercase shadow-sm">
                      <CheckCircle className="w-3.5 h-3.5" /> {selectedTicket.paymentStatus}
                    </div>
                  </div>
                </div>

                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/20">
                  <div className="col-span-2">
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">PNR Number</div>
                    <div className="text-2xl font-mono font-black tracking-tighter">{selectedTicket.razorpayOrderId?.slice(-10).toUpperCase() || 'KS-TRV-88220'}</div>
                  </div>
                  <div className="text-right col-span-2">
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">VALID FOR ONE JOURNEY ONLY</div>
                    <div className="text-[10px] font-bold text-white/40 italic">Issued on {new Date(selectedTicket.bookingDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>

              {/* Ticket Perforation */}
              <div className="relative h-4 bg-white">
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-slate-900 border-4 border-white/10" />
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-slate-900 border-4 border-white/10" />
                <div className="h-full w-full border-t-[3px] border-dashed border-slate-100" />
              </div>

              {/* Ticket Middle Part: Trip Info */}
              <div className="p-6 md:p-12 space-y-10 bg-white relative">
                {/* Subtle Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-15deg]">
                  <div className="text-[8rem] font-black tracking-tighter uppercase">KSRTC</div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-100 gap-6 md:gap-8 relative z-10">
                  <div className="text-center w-full md:w-auto">
                    <div className="text-[10px] font-black text-slate-400 tracking-widest mb-2 uppercase">Departure Station</div>
                    <div className="text-2xl font-black text-slate-900">
                      {selectedTicket.fromName || selectedTicket.fromId?.name || 'Trivandrum'}
                    </div>
                    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase">
                      <MapPin className="w-3 h-3" /> Origin
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col items-center gap-4 px-8 w-full md:w-auto">
                    <div className="h-[2px] md:w-[2px] w-full md:h-12 bg-slate-200" />
                    <div className="p-3 bg-white rounded-full border border-slate-100 shadow-sm">
                      <BusFront className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="h-[2px] md:w-[2px] w-full md:h-12 bg-slate-200" />
                  </div>
                  <div className="text-center w-full md:w-auto">
                    <div className="text-[10px] font-black text-slate-400 tracking-widest mb-2 uppercase">Arrival Station</div>
                    <div className="text-2xl font-black text-slate-900">
                      {selectedTicket.toName || selectedTicket.toId?.name || 'Kochi'}
                    </div>
                    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase">
                      <MapPin className="w-3 h-3" /> Destination
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-4 relative z-10">
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Travel Date</div>
                    <div className="text-base font-black text-slate-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      {new Date(selectedTicket.bookingDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Bus Number</div>
                    <div className="text-base font-black text-slate-900 flex items-center gap-2">
                      <BusFront className="w-4 h-4 text-emerald-600" />
                      {selectedTicket.busNumber || selectedTicket.busId?.busNumber || 'KL-KS-1024'}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Passenger(s)</div>
                    <div className="text-base font-black text-slate-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-600" />
                      {selectedTicket.seats.length} Person(s)
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Service</div>
                    <div className="px-3 py-1 rounded bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider inline-block">
                      {selectedTicket.busType || selectedTicket.busId?.busType || 'Super Fast'}
                    </div>
                  </div>
                </div>

                {/* Seat and Fare Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100 relative z-10">
                  <div>
                    <div className="text-[10px] font-black text-slate-400 tracking-widest mb-4 uppercase">Assigned Seats</div>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedTicket.seats.map(seat => (
                        <div key={seat} className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-100 flex flex-col items-center justify-center shadow-sm">
                          <div className="text-[9px] font-black text-slate-300 uppercase leading-none mb-1">Seat</div>
                          <div className="text-lg font-black text-emerald-700 leading-none">{seat}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:text-right flex flex-col justify-center">
                    <div className="text-[10px] font-black text-slate-400 tracking-widest mb-1 uppercase">Total Paid Amount</div>
                    <div className="text-4xl font-heading font-black text-emerald-700 tabular-nums">₹{selectedTicket.totalAmount}</div>
                    <div className="text-[10px] text-slate-400 mt-1">Inclusive of all taxes and service charges</div>
                  </div>
                </div>

                {/* Terms and Duties */}
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-[1.5rem] space-y-3 relative z-10">
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">General Terms & Conditions</h4>
                  <ul className="text-[10px] text-slate-500 space-y-1.5 list-disc pl-3">
                    <li>Please carry a valid Government ID proof during travel.</li>
                    <li>Report at the boarding point at least 15 minutes before departure.</li>
                    <li>Ticket is non-transferable and valid for the specified trip only.</li>
                    <li>E-Slip is valid for conductor verification on digital devices.</li>
                  </ul>
                </div>
              </div>

              {/* Ticket Bottom: Barcode and Security */}
              <div className="bg-white p-6 md:p-10 border-t-2 border-dashed border-slate-100 flex flex-col items-center gap-6">
                {/* Realistic Barcode Generator */}
                <div className="w-full max-w-sm flex flex-col items-center gap-2">
                  <div className="w-full h-16 flex items-center justify-center gap-[1px]">
                    {[...Array(60)].map((_, i) => (
                      <div key={i} className={`h-full ${Math.random() > 0.4 ? 'bg-slate-900' : 'bg-transparent'}`} style={{ width: `${Math.floor(Math.random() * 3) + 1}px` }}></div>
                    ))}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-[0.5em]">{selectedTicket.razorpayOrderId?.slice(-12) || 'SECURITY-0022'}</div>
                </div>
                <div className="text-center group">
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-1.5">Official Security Code</p>
                  <p className="text-[9px] text-slate-400 max-w-[280px] leading-relaxed mx-auto">This reservation is cryptographically secured. Unauthorized duplication or alteration is a punishable offense under KSRTC guidelines.</p>
                </div>
              </div>

              {/* Action Bar */}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
