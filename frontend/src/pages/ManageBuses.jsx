import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Bus, Loader2, Clock, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from 'axios';
import { toast } from 'sonner';

const ManageBuses = () => {
  const [buses, setBuses] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [formData, setFormData] = useState({
    busNumber: "",
    busType: "Super Fast",
    totalSeats: 49,
    route: [],
    daysRunning: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  });

  const busTypes = ['Ordinary', 'Fast Passenger', 'Super Fast', 'Minnal', 'Swift Deluxe', 'Scania', 'Volvo'];
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [busesRes, locsRes] = await Promise.all([
        axios.get(`https://ksrtc-bus-search-booking-system.onrender.com/bus/all`),
        axios.get(`https://ksrtc-bus-search-booking-system.onrender.com/location/all`)
      ]);
      if (busesRes.data.success) setBuses(busesRes.data.data);
      if (locsRes.data.success) setLocations(locsRes.data.data);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addRouteStop = () => {
    setFormData({
      ...formData,
      route: [...formData.route, { station: "", arrivalTime: "00:00", departureTime: "00:00" }]
    });
  };

  const removeRouteStop = (index) => {
    setFormData({
      ...formData,
      route: formData.route.filter((_, i) => i !== index)
    });
  };

  const updateRouteStop = (index, field, value) => {
    const newRoute = [...formData.route];
    newRoute[index][field] = value;
    setFormData({ ...formData, route: newRoute });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      setIsLoading(true);
      let res;
      if (editingBus) {
        res = await axios.put(`https://ksrtc-bus-search-booking-system.onrender.com/bus/update/${editingBus._id}`, formData, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      } else {
        res = await axios.post(`https://ksrtc-bus-search-booking-system.onrender.com/bus/add`, formData, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      }

      if (res.data.success) {
        toast.success(res.data.message);
        setIsOpen(false);
        setEditingBus(null);
        fetchData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bus?")) return;
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.delete(`https://ksrtc-bus-search-booking-system.onrender.com/bus/delete/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchData();
      }
    } catch (error) {
      toast.error("Deletion failed");
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header & Stats */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Fleet Operations</h2>
          <p className="text-slate-500 font-medium">Monitor and schedule your KSRTC bus network</p>
          <div className="flex gap-4 pt-4">
            <div className="px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-0.5">Total Fleet</p>
              <p className="text-xl font-black text-emerald-900 leading-tight">{buses.length}</p>
            </div>
            <div className="px-4 py-2 bg-amber-50 rounded-2xl border border-amber-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-0.5">Active Routes</p>
              <p className="text-xl font-black text-amber-900 leading-tight">{buses.length}</p>
            </div>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={(val) => {
          setIsOpen(val);
          if (!val) {
            setEditingBus(null);
            setFormData({
              busNumber: "",
              busType: "Super Fast",
              totalSeats: 49,
              route: [],
              daysRunning: weekdays,
            });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="h-16 px-10 rounded-[2rem] bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-200 hover:scale-105 transition-all duration-300">
              <Plus className="w-5 h-5 mr-3" /> Add Bus
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] rounded-[3rem] p-10 border-none shadow-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="mb-6 text-left">
              <DialogTitle className="text-2xl font-black text-slate-900">{editingBus ? 'Modify' : 'Add'} Bus</DialogTitle>
              <DialogDescription className="font-medium text-slate-500">
                Set specifications and define the operational route.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">License Number</Label>
                  <Input
                    placeholder="e.g., KL-15-A-1234"
                    className="h-14 rounded-2xl bg-white border-slate-100 focus:bg-white focus:ring-emerald-500 font-bold"
                    value={formData.busNumber}
                    onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Service Category</Label>
                  <Select value={formData.busType} onValueChange={(val) => setFormData({ ...formData, busType: val })}>
                    <SelectTrigger className="h-14 rounded-2xl bg-white border-slate-100 focus:ring-emerald-500 font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-xl">
                      {busTypes.map(type => <SelectItem key={type} value={type} className="rounded-xl my-1">{type}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center px-1">
                  <Label className="text-lg font-black text-slate-900">Route Architecture</Label>
                  <Button type="button" size="sm" variant="outline" onClick={addRouteStop} className="rounded-xl border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 font-bold">
                    <Plus className="w-4 h-4 mr-1.5" /> Add Stop
                  </Button>
                </div>
                <div className="space-y-4">
                  {formData.route.map((stop, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 bg-white border border-slate-100 rounded-[2rem] relative group shadow-sm transition-all hover:shadow-md">
                      <div className="md:col-span-1 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">{idx + 1}</div>
                        {idx < formData.route.length - 1 && <div className="w-[1px] h-8 bg-slate-100 my-1" />}
                      </div>
                      <div className="md:col-span-5 space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Terminal</Label>
                        <Select
                          value={stop.station?._id || stop.station}
                          onValueChange={(val) => updateRouteStop(idx, 'station', val)}
                        >
                          <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-slate-100 font-bold">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-none shadow-xl">
                            {locations.map(loc => <SelectItem key={loc._id} value={loc._id} className="rounded-xl my-1">{loc.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-3 space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Arrival</Label>
                        <Input type="time" className="h-11 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-slate-100 font-bold" value={stop.arrivalTime} onChange={(e) => updateRouteStop(idx, 'arrivalTime', e.target.value)} />
                      </div>
                      <div className="md:col-span-3 space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Departure</Label>
                        <div className="flex gap-2">
                          <Input type="time" className="h-11 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-slate-100 font-bold flex-1" value={stop.departureTime} onChange={(e) => updateRouteStop(idx, 'departureTime', e.target.value)} />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="h-11 w-11 rounded-xl text-rose-300 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeRouteStop(idx)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {formData.route.length === 0 && (
                    <div className="py-10 border-2 border-dashed border-slate-100 rounded-[2rem] text-center text-slate-400 italic text-sm">
                      No stops defined yet. Click "Add Stop" to begin.
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter className="pt-8">
                <Button type="submit" disabled={isLoading} className="h-16 w-full rounded-[2rem] bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-emerald-600 shadow-xl shadow-slate-200 transition-all duration-300">
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingBus ? 'Update Fleet Record' : 'Save Bus')}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Toolbar */}
      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
        <Input
          placeholder="Search fleet by license number or service type..."
          className="h-20 pl-16 rounded-[2.5rem] bg-white border-slate-100 shadow-xl shadow-slate-200/40 text-lg font-bold placeholder:font-medium focus:ring-emerald-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        {buses.filter(b => b.busNumber?.toLowerCase().includes(searchQuery.toLowerCase()) || b.busType?.toLowerCase().includes(searchQuery.toLowerCase())).map((bus) => (
          <Card key={bus._id} className="border-none shadow-xl shadow-slate-200/30 rounded-[3rem] group hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 relative overflow-hidden bg-white">
            <CardContent className="p-0">
              <div className="flex flex-col xl:flex-row min-h-[220px]">
                {/* Left Side: Bus Identity */}
                <div className="xl:w-[320px] p-8 xl:border-r border-slate-50 flex flex-col justify-between bg-slate-50 relative group-hover:bg-emerald-950 transition-colors duration-500">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.1),transparent)] pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                        <Bus size={30} />
                      </div>
                      <div>
                        <h3 className="font-black text-2xl text-slate-900 group-hover:text-white transition-colors tracking-tight">{bus.busNumber}</h3>
                        <span className="text-[10px] px-3 py-1 bg-emerald-100 text-emerald-700 font-black uppercase tracking-[0.2em] rounded-full border border-emerald-200 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-transparent transition-all">
                          {bus.busType}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-8 relative z-10">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 group-hover:text-white/40 uppercase tracking-widest">Frequency</span>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-white transition-colors">Daily Service</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 group-hover:text-white/40 uppercase tracking-widest">Capacity</span>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-white transition-colors">{bus.totalSeats} Requisites</span>
                    </div>
                  </div>
                </div>

                {/* Center: Route Timeline */}
                <div className="flex-1 p-8 overflow-x-auto">
                  <div className="flex items-start gap-8 min-w-max h-full">
                    {bus.route.map((stop, i) => (
                      <div key={i} className="flex flex-col items-center min-w-[120px] text-center relative group/stop">
                        <div className="mb-4 relative">
                          <div className="w-5 h-5 rounded-full bg-white border-4 border-emerald-500 z-10 relative group-hover/stop:scale-125 transition-transform" />
                          {i < bus.route.length - 1 && (
                            <div className="absolute top-[9px] left-[20px] w-[calc(100%+32px)] h-[2px] bg-slate-100 group-hover:bg-emerald-500/10 transition-colors" />
                          )}
                        </div>
                        <span className="font-black text-sm text-slate-900 mb-1">{stop.station?.name}</span>
                        <div className="flex items-center justify-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                          <Clock size={12} />
                          {stop.departureTime}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Actions */}
                <div className="p-6 bg-slate-50 xl:bg-white xl:border-l border-slate-50 flex xl:flex-col justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="icon" variant="ghost" className="w-12 h-12 rounded-2xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-400 transition-all" onClick={() => {
                    setEditingBus(bus);
                    setFormData({
                      busNumber: bus.busNumber,
                      busType: bus.busType,
                      totalSeats: bus.totalSeats,
                      route: bus.route.map(r => ({ station: r.station?._id, arrivalTime: r.arrivalTime, departureTime: r.departureTime })),
                      daysRunning: bus.daysRunning,
                    });
                    setIsOpen(true);
                  }}>
                    <Edit2 size={18} />
                  </Button>
                  <Button size="icon" variant="ghost" className="w-12 h-12 rounded-2xl bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition-all" onClick={() => handleDelete(bus._id)}>
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageBuses;
