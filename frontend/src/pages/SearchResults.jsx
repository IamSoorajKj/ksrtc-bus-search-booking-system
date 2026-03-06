import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { BusFront, MapPin, ArrowRight, Loader2, ArrowLeft, Users, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import SeatSelection from '@/components/SeatSelection';
import axios from 'axios';
import { getData } from '@/context/userContext';

/* ─── helpers ─── */
const to12Hour = (t) => {
  if (!t || t === '--:--') return '--:--';
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};

const busTypeConfig = {
  'Ordinary': { color: 'bg-sky-100 text-sky-700 border-sky-200', dot: 'bg-sky-500' },
  'Fast Passenger': { color: 'bg-violet-100 text-violet-700 border-violet-200', dot: 'bg-violet-500' },
  'Super Fast': { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  'Minnal': { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', dot: 'bg-yellow-500' },
  'Swift Deluxe': { color: 'bg-orange-100 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
  'Scania': { color: 'bg-rose-100 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
  'Volvo': { color: 'bg-indigo-100 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500' },
};

/* ─── Full-screen payment overlay ─── */
const PaymentOverlay = ({ status }) => {
  if (!status) return null;

  const isSuccess = status === 'success';
  const isFailed = status === 'failed';
  const isLoading = !isSuccess && !isFailed;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center select-none"
      style={{ background: 'rgba(0,0,0,0.68)', backdropFilter: 'blur(8px)' }}
    >
      <div className="bg-white rounded-3xl shadow-2xl px-10 py-12 flex flex-col items-center gap-5 w-[300px] text-center">

        {/* Loading */}
        {isLoading && (
          <>
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div
                className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
                style={{ animation: 'spin 0.85s linear infinite' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <BusFront className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div>
              <div className="font-heading font-bold text-lg text-foreground">
                {status === 'verifying' ? 'Verifying Payment…' : 'Processing Payment…'}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {status === 'verifying'
                  ? 'Confirming your payment — please wait.'
                  : 'Complete the payment in the Razorpay window.'}
              </div>
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary block"
                  style={{ animation: `bounce 0.9s ease-in-out ${i * 0.18}s infinite` }}
                />
              ))}
            </div>
          </>
        )}

        {/* Success */}
        {isSuccess && (
          <>
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </div>
            <div>
              <div className="font-heading font-bold text-xl text-foreground">Booking Confirmed! 🎉</div>
              <div className="text-sm text-muted-foreground mt-1">Your seats are booked successfully.</div>
            </div>
            <div className="text-xs text-muted-foreground animate-pulse">Redirecting to your bookings…</div>
          </>
        )}

        {/* Failed / Cancelled */}
        {isFailed && (
          <>
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <div>
              <div className="font-heading font-bold text-xl text-foreground">Payment Failed</div>
              <div className="text-sm text-muted-foreground mt-1">Your payment was not completed.</div>
            </div>
            <div className="text-xs text-muted-foreground animate-pulse">Returning to seat selection…</div>
          </>
        )}
      </div>
    </div>
  );
};

/* ─── Main component ─── */
const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openBusId, setOpenBusId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null); // null | 'loading' | 'verifying' | 'success' | 'failed'
  const { user, loading: userLoading } = getData();

  const fromId = searchParams.get('from');
  const toId = searchParams.get('to');
  const date = searchParams.get('date');
  const fromName = searchParams.get('fromName');
  const toName = searchParams.get('toName');

  useEffect(() => {
    if (userLoading) return;
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error('Authentication required', { description: 'Please sign up to view search results.' });
      navigate('/signup');
      return;
    }
    if (fromId && toId && date) {
      setIsLoading(true);
      axios.get(`https://ksrtc-bus-search-booking-system.onrender.com/bus/search?from=${fromId}&to=${toId}&date=${date}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => { if (res.data.success) setBuses(res.data.data); })
        .catch(() => toast.error('Failed to fetch buses'))
        .finally(() => setIsLoading(false));
    }
  }, [fromId, toId, date, navigate, userLoading]);

  const formattedDate = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const handlePayment = async (bus, seats) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error('Please sign up to book seats');
      navigate('/signup');
      return;
    }

    try {
      setPaymentStatus('loading');
      const totalAmount = seats.reduce((sum, s) => sum + s.price, 0);
      const seatIds = seats.map(s => s.id).join(', ');
      const orderRes = await axios.post(`https://ksrtc-bus-search-booking-system.onrender.com/payment/createOrder`, {
        amount: totalAmount,
        seats: seatIds,
        busId: bus._id,
        travelDate: date,
        fromId,
        toId,
        fromName,
        toName
      }, { headers: { Authorization: `Bearer ${token}` } });

      if (!orderRes.data.success) {
        setPaymentStatus('failed');
        setTimeout(() => setPaymentStatus(null), 2500);
        toast.error(orderRes.data.msg || 'Failed to initiate payment');
        return;
      }

      const resData = orderRes.data;
      const options = {
        key: resData.key_id,
        amount: resData.amount,
        currency: 'INR',
        name: resData.product_name,
        description: resData.description,
        order_id: resData.order_id,

        handler: async function (response) {
          // ── Payment successful in Razorpay ──
          setPaymentStatus('verifying');
          try {
            const verifyRes = await axios.post(`https://ksrtc-bus-search-booking-system.onrender.com/payment/verifyPayment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            }, { headers: { Authorization: `Bearer ${token}` } });

            if (verifyRes.data.success) {
              setPaymentStatus('success');
              // Show success screen for 2s then redirect
              setTimeout(() => {
                toast.success('🎉 Booking confirmed! View your tickets in My Bookings.');
                navigate('/profile');
              }, 2000);
            } else {
              setPaymentStatus('failed');
              setTimeout(() => { setPaymentStatus(null); setOpenBusId(bus._id); }, 2500);
              toast.error('Payment verification failed.');
            }
          } catch {
            setPaymentStatus('failed');
            setTimeout(() => { setPaymentStatus(null); setOpenBusId(bus._id); }, 2500);
            toast.error('Payment verification error.');
          }
        },

        modal: {
          ondismiss: function () {
            // ── User closed/cancelled Razorpay modal ──
            setPaymentStatus('failed');
            setTimeout(() => {
              setPaymentStatus(null);
              setOpenBusId(bus._id); // Re-open seat selection so user can retry
            }, 2200);
            toast.error('Payment cancelled. You can try again.', { duration: 4000 });
          }
        },

        prefill: { name: 'Passenger', email: 'passenger@example.com', contact: '9999999999' },
        theme: { color: '#16a34a' }
      };

      const razorpayObj = new window.Razorpay(options);
      razorpayObj.on('payment.failed', function (response) {
        setPaymentStatus('failed');
        setTimeout(() => { setPaymentStatus(null); setOpenBusId(bus._id); }, 2500);
        toast.error('Payment Failed!', { description: response.error.description });
      });

      // Hide our loading overlay while Razorpay modal is open
      setPaymentStatus(null);
      razorpayObj.open();

    } catch {
      setPaymentStatus('failed');
      setTimeout(() => setPaymentStatus(null), 2500);
      toast.error('Error connecting to payment gateway.');
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
      {/* Full-screen payment overlay — blocks all interaction */}
      <PaymentOverlay status={paymentStatus} />

      <Navbar />

      {/* ── Hero Header ── */}
      <div style={{ background: 'linear-gradient(135deg, #1a6e3c 0%, #0f4525 60%, #071a0b 100%)' }} className="relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #4ade80, transparent)' }} />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #86efac, transparent)' }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 relative">
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-sm mb-5 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Search
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-center gap-4 sm:gap-6">
              <div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest mb-1 font-semibold">From</div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-white leading-none">{fromName}</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <div className="w-14 sm:w-20 h-px bg-white/30 flex items-center justify-center">
                    <BusFront className="w-3.5 h-3.5 text-white/50" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-orange-400" />
                </div>
                <span className="text-[9px] text-white/40 uppercase tracking-widest">Direct</span>
              </div>
              <div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest mb-1 font-semibold">To</div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-white leading-none">{toName}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mb-1">Travel Date</div>
                <div className="text-white font-semibold text-sm sm:text-base">{formattedDate}</div>
              </div>
              <Link to="/">
                <Button variant="outline" className="bg-white/10 border-white/25 text-white hover:bg-white/20 backdrop-blur-sm h-9 text-sm px-4">
                  Modify
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        {isLoading ? (
          <div className="py-32 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <BusFront className="w-8 h-8 text-primary" />
              </div>
              <Loader2 className="w-5 h-5 text-primary animate-spin absolute -top-1 -right-1" />
            </div>
            <p className="text-muted-foreground font-medium">Searching available buses…</p>
          </div>
        ) : buses.length > 0 ? (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold text-foreground">
                {buses.length} bus{buses.length !== 1 ? 'es' : ''} available
              </span>
              <span className="text-xs text-muted-foreground">for {fromName} → {toName}</span>
            </div>

            <div className="space-y-4">
              {buses.map((bus) => {
                const fromStop = bus.route.find(r => (r.station._id || r.station) === fromId);
                const toStop = bus.route.find(r => (r.station._id || r.station) === toId);
                const cfg = busTypeConfig[bus.busType] || { color: 'bg-gray-100 text-gray-700 border-gray-200', dot: 'bg-gray-400' };
                const depTime = to12Hour(fromStop?.departureTime);
                const arrTime = to12Hour(toStop?.arrivalTime);
                const isOpen = openBusId === bus._id;

                return (
                  <div key={bus._id}
                    className={`bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${isOpen ? 'border-primary/40 ring-1 ring-primary/20' : 'border-border/50'}`}>

                    {/* Top strip */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-border/30 bg-gradient-to-r from-slate-50 to-white">
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-foreground text-sm sm:text-base tracking-tight">{bus.busNumber}</span>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-semibold border ${cfg.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {bus.busType}
                        </span>
                        {bus.liveStatus && bus.liveStatus !== 'Scheduled' && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            {bus.liveStatus}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="w-3.5 h-3.5" />
                        <span>{bus.totalSeats} seats</span>
                      </div>
                    </div>

                    {/* Journey card */}
                    <div className="px-5 py-5 flex flex-col sm:flex-row items-center gap-5">
                      {/* Departure */}
                      <div className="text-center sm:text-left min-w-[90px]">
                        <div className="font-heading font-black text-3xl sm:text-4xl text-foreground leading-none tracking-tight">
                          {depTime.split(' ')[0]}
                        </div>
                        <div className="text-xs font-bold text-primary mt-0.5">{depTime.split(' ')[1]}</div>
                        <div className="text-xs text-muted-foreground mt-1 font-medium truncate max-w-[90px]">{fromName}</div>
                      </div>

                      {/* Journey line */}
                      <div className="flex-1 flex flex-col items-center gap-1.5 w-full sm:w-auto">
                        <div className="w-full flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full border-2 border-primary bg-white shrink-0" />
                          <div className="flex-1 h-0.5 rounded-full bg-gradient-to-r from-primary via-primary/50 to-accent opacity-60" />
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <BusFront className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <div className="flex-1 h-0.5 rounded-full bg-gradient-to-r from-accent/60 to-accent opacity-60" />
                          <div className="w-3 h-3 rounded-full border-2 border-accent bg-white shrink-0" />
                        </div>
                        <div className="text-[10px] text-muted-foreground font-medium">KSRTC {bus.busType}</div>
                      </div>

                      {/* Arrival */}
                      <div className="text-center sm:text-right min-w-[90px]">
                        <div className="font-heading font-black text-3xl sm:text-4xl text-foreground leading-none tracking-tight">
                          {arrTime.split(' ')[0]}
                        </div>
                        <div className="text-xs font-bold text-accent mt-0.5">{arrTime.split(' ')[1]}</div>
                        <div className="text-xs text-muted-foreground mt-1 font-medium truncate max-w-[90px]">{toName}</div>
                      </div>

                      {/* Price + CTA */}
                      <div className="sm:ml-4 sm:pl-4 sm:border-l sm:border-border/40 w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-3 sm:gap-2">
                        <div className="text-left sm:text-right">
                          <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Starts from</div>
                          <div className="font-heading font-black text-2xl text-primary">₹{bus.basePrice || 249}</div>
                        </div>
                        <Button
                          disabled={!!paymentStatus}
                          onClick={() => {
                            const token = localStorage.getItem('accessToken');
                            if (!token || !user) {
                              toast.error('Authentication Required', { description: 'Please sign up to select seats.' });
                              navigate('/signup');
                              return;
                            }
                            setOpenBusId(isOpen ? null : bus._id);
                          }}
                          className={`flex-1 sm:flex-none px-5 h-10 font-semibold text-sm rounded-xl whitespace-nowrap shadow-sm transition-all ${isOpen
                            ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            : 'bg-primary hover:bg-primary/90 text-white shadow-primary/25'
                            }`}>
                          {isOpen ? 'Close' : 'Select Seat'}
                          <ArrowRight className={`w-4 h-4 ml-1.5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                        </Button>
                      </div>
                    </div>

                    {/* Seat selection */}
                    {isOpen && (
                      <SeatSelection
                        bus={bus}
                        travelDate={date}
                        onSelect={(seats) => handlePayment(bus, seats)}
                      />
                    )}

                    {/* Route preview */}
                    <div className="px-5 py-2.5 bg-slate-50/70 border-t border-border/20 flex items-center gap-2 flex-wrap">
                      <MapPin className="w-3 h-3 text-primary shrink-0" />
                      {bus.route.slice(0, 6).map((stop, i) => (
                        <React.Fragment key={i}>
                          <span className={`text-[11px] ${stop.station._id === fromId ? 'font-bold text-primary' :
                            stop.station._id === toId ? 'font-bold text-accent' :
                              'text-muted-foreground'
                            }`}>{stop.station.name}</span>
                          {i < Math.min(bus.route.length - 1, 5) && <span className="text-border text-[10px]">›</span>}
                        </React.Fragment>
                      ))}
                      {bus.route.length > 6 && (
                        <span className="text-[11px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                          +{bus.route.length - 6} stops
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="py-28 text-center bg-white rounded-2xl border border-border/40 shadow-sm">
            <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mx-auto mb-5">
              <BusFront className="w-10 h-10 text-muted-foreground/30" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2 text-foreground">No Buses Found</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-6">
              No buses available for <strong>{fromName} → {toName}</strong> on {formattedDate}. Try a different date.
            </p>
            <Link to="/">
              <Button className="bg-primary hover:bg-primary/90 text-white px-6">Search Again</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
