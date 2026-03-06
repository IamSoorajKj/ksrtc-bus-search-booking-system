import React, { useState, useEffect, useMemo, memo } from 'react';
import { Search, MapPin, Calendar, ArrowRight, Loader2, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

import { getData } from '@/context/userContext';

const BusSearch = memo(() => {
  const { user } = getData();
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);

  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [date, setDate] = useState("");

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);

  const [showFromDrop, setShowFromDrop] = useState(false);
  const [showToDrop, setShowToDrop] = useState(false);

  const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  useEffect(() => {
    axios.get(`https://ksrtc-bus-search-booking-system.onrender.com/location/all`)
      .then(res => { if (res.data.success) setLocations(res.data.data); })
      .catch(() => { });
  }, []);

  const filterSuggestions = React.useCallback((query) => {
    if (query.length < 1) return [];
    const lowerQuery = query.toLowerCase();
    return locations.filter(loc =>
      loc.name.toLowerCase().includes(lowerQuery) ||
      (loc.district && loc.district.toLowerCase().includes(lowerQuery))
    ).slice(0, 12);
  }, [locations]);

  const handleSwap = () => {
    const tmpQuery = fromQuery, tmpSel = selectedFrom;
    setFromQuery(toQuery); setSelectedFrom(selectedTo);
    setToQuery(tmpQuery); setSelectedTo(tmpSel);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!selectedFrom || !selectedTo) return;

    if (!user) {
      toast.error("Registration Required", {
        description: "Please sign up or login to search for buses."
      });
      navigate("/signup");
      return;
    }

    navigate(`/results?from=${selectedFrom._id}&to=${selectedTo._id}&date=${date}&fromName=${selectedFrom.name}&toName=${selectedTo.name}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-5xl mx-auto">
      <div className="bg-white dark:bg-card rounded-2xl shadow-xl border border-border/60 overflow-visible">

        {/* Header - Hidden on mobile to save space */}
        <div className="hidden md:flex px-5 py-3 md:px-6 md:py-4 border-b border-border/50 items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          <span className="font-heading font-semibold text-sm text-foreground">Find Available Buses</span>
        </div>

        {/* Fields container */}
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-3 items-stretch md:items-end">

            {/* ─── FROM + SWAP (mobile: relative wrapper) ─── */}
            <div className="relative md:contents">

              {/* FROM field */}
              <div className="relative w-full">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1 ml-1">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <Input
                    placeholder="Departure station"
                    className="glass-input h-12 pl-9 pr-12 md:pr-9 font-medium"
                    value={fromQuery}
                    onChange={e => {
                      const val = e.target.value;
                      setFromQuery(val);
                      setSelectedFrom(null);
                      setFromSuggestions(filterSuggestions(val));
                      setShowFromDrop(true);
                    }}
                    onFocus={() => { setFromSuggestions(filterSuggestions(fromQuery)); setShowFromDrop(true); }}
                    onBlur={() => setTimeout(() => setShowFromDrop(false), 200)}
                  />
                </div>
                {showFromDrop && fromSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-card rounded-xl shadow-2xl border border-border z-50 overflow-hidden flex flex-col max-h-[280px]">
                    <div className="overflow-y-auto custom-scrollbar">
                      {fromSuggestions.map(loc => (
                        <div key={loc._id}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 cursor-pointer transition-colors border-b border-border/30 last:border-none"
                          onMouseDown={() => { setSelectedFrom(loc); setFromQuery(loc.name); setFromSuggestions([]); setShowFromDrop(false); }}>
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <MapPin className="w-4 h-4 text-primary" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-sm text-foreground">{loc.name}</div>
                            <div className="text-xs text-muted-foreground">{loc.district} District{loc.stationCode ? ` · ${loc.stationCode}` : ''}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Swap Button - sits between FROM and TO on mobile, inline on desktop */}
              <div className="
                md:my-0 md:mb-[6px] md:h-9 md:self-end md:flex md:justify-center md:overflow-visible md:z-10
                absolute right-3 bottom-0 translate-y-1/2 z-20
                md:static md:right-auto md:bottom-auto md:translate-y-0
              ">
                <button type="button" onClick={handleSwap}
                  className="flex w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-border bg-white hover:border-primary hover:bg-primary/5 items-center justify-center transition-all group shrink-0 shadow-md">
                  <ArrowLeftRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground group-hover:text-primary transition-colors rotate-90 md:rotate-0" />
                </button>
              </div>

            </div>{/* end mobile wrapper */}

            {/* TO */}
            <div className="relative w-full">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1 ml-1">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <Input
                  placeholder="Arrival station"
                  className="glass-input h-12 pl-9 font-medium"
                  value={toQuery}
                  onChange={e => {
                    const val = e.target.value;
                    setToQuery(val);
                    setSelectedTo(null);
                    setToSuggestions(filterSuggestions(val));
                    setShowToDrop(true);
                  }}
                  onFocus={() => { setToSuggestions(filterSuggestions(toQuery)); setShowToDrop(true); }}
                  onBlur={() => setTimeout(() => setShowToDrop(false), 200)}
                />
              </div>
              {showToDrop && toSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-card rounded-xl shadow-2xl border border-border z-50 overflow-hidden flex flex-col max-h-[280px]">
                  <div className="overflow-y-auto custom-scrollbar">
                    {toSuggestions.map(loc => (
                      <div key={loc._id}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-accent/5 cursor-pointer transition-colors border-b border-border/30 last:border-none"
                        onMouseDown={() => { setSelectedTo(loc); setToQuery(loc.name); setToSuggestions([]); setShowToDrop(false); }}>
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-accent" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-sm text-foreground">{loc.name}</div>
                          <div className="text-xs text-muted-foreground">{loc.district} District{loc.stationCode ? ` · ${loc.stationCode}` : ''}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-border/60 self-end mb-[6px]" />

            <div className="w-full">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1 ml-1">Travel Date</label>
              <div className="relative">
                <Input
                  type="date"
                  className="glass-input h-12 pl-4 font-medium cursor-pointer date-input-left"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  min={minDate}
                />
              </div>
            </div>

            {/* Submit */}
            <Button type="submit"
              className="w-full md:w-auto h-11 md:h-12 mt-1 md:mt-0 px-8 rounded-xl font-semibold bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap md:self-end"
              disabled={!selectedFrom || !selectedTo || !date}>
              <Search className="w-4 h-4 mr-2" />
              Search Buses
            </Button>
          </div>
        </div>

        {/* Quick help - Hidden on very small screens to save space */}
        {(!selectedFrom || !selectedTo) && (
          <div className="hidden xs:flex px-4 pb-3 items-center gap-2 text-[10px] text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            Type 1+ char for suggestions
          </div>)}
      </div>
    </form>
  )
});

export default BusSearch;
