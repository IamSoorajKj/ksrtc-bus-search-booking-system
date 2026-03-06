import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, MapPin, Loader2 } from 'lucide-react';
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
import axios from 'axios';
import { toast } from 'sonner';

const ManageLocations = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    district: "",
    stationCode: "",
  });

  const fetchLocations = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:8000/location/all');
      if (res.data.success) {
        setLocations(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch locations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      setIsLoading(true);
      let res;
      if (editingLocation) {
        res = await axios.put(`http://localhost:8000/location/update/${editingLocation._id}`, formData, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      } else {
        res = await axios.post('http://localhost:8000/location/add', formData, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      }

      if (res.data.success) {
        toast.success(res.data.message);
        setIsOpen(false);
        setEditingLocation(null);
        setFormData({ name: "", district: "", stationCode: "" });
        fetchLocations();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this location?")) return;
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.delete(`http://localhost:8000/location/delete/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchLocations();
      }
    } catch (error) {
      toast.error("Failed to delete location");
    }
  };

  const filteredLocations = locations.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header & Stats */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manage Stations</h2>
          <p className="text-slate-500 font-medium">Coordinate and update KSRTC terminal locations</p>
          <div className="flex gap-4 pt-4">
            <div className="px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-0.5">Total Stations</p>
              <p className="text-xl font-black text-emerald-900 leading-tight">{locations.length}</p>
            </div>
            <div className="px-4 py-2 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-0.5">Districts</p>
              <p className="text-xl font-black text-blue-900 leading-tight">
                {new Set(locations.map(l => l.district)).size}
              </p>
            </div>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={(val) => {
          setIsOpen(val);
          if (!val) {
            setEditingLocation(null);
            setFormData({ name: "", district: "", stationCode: "" });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="h-16 px-10 rounded-[2rem] bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-200 hover:scale-105 transition-all duration-300">
              <Plus className="w-5 h-5 mr-3" /> Add New Station
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px] rounded-[3rem] p-10 border-none shadow-2xl">
            <DialogHeader className="mb-6 text-left">
              <DialogTitle className="text-2xl font-black text-slate-900">{editingLocation ? 'Modify' : 'Initialize'} Station</DialogTitle>
              <DialogDescription className="font-medium text-slate-500">
                Configure terminal parameters for the transport network.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Station Name</Label>
                <Input
                  placeholder="e.g., Thiruvananthapuram Central"
                  className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-emerald-500 font-bold"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">District</Label>
                <Input
                  placeholder="e.g., Thiruvananthapuram"
                  className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-emerald-500 font-bold"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Station Code</Label>
                <Input
                  placeholder="e.g., TVM"
                  className="h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white focus:ring-emerald-500 font-bold"
                  value={formData.stationCode}
                  onChange={(e) => setFormData({ ...formData, stationCode: e.target.value })}
                />
              </div>
              <DialogFooter className="pt-6">
                <Button type="submit" disabled={isLoading} className="h-16 w-full rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors">
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingLocation ? 'Apply Updates' : 'Save Station')}
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
          placeholder="Filter stations by name, district or code..."
          className="h-20 pl-16 rounded-[2.5rem] bg-white border-slate-100 shadow-xl shadow-slate-200/40 text-lg font-bold placeholder:font-medium focus:ring-emerald-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Station Grid */}
      {isLoading && locations.length === 0 ? (
        <div className="w-full py-40 flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
          <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Accessing Servers...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLocations.map((loc) => (
            <Card key={loc._id} className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden bg-white">
              {/* Card visual accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-[4rem] group-hover:bg-emerald-500/10 transition-colors" />

              <CardHeader className="p-8 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-500">
                    <MapPin size={24} />
                  </div>
                  <div className="flex gap-1 py-1 px-1 bg-slate-50 border border-slate-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white hover:text-emerald-600 rounded-lg text-slate-400" onClick={() => {
                      setEditingLocation(loc);
                      setFormData({ name: loc.name, district: loc.district, stationCode: loc.stationCode || "" });
                      setIsOpen(true);
                    }}>
                      <Edit2 size={14} />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white hover:text-rose-500 rounded-lg text-slate-400" onClick={() => handleDelete(loc._id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                  {loc.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-50">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">District</span>
                    <span className="text-xs font-black text-slate-900 group-hover:text-emerald-600 transition-colors uppercase">{loc.district}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Station Code</span>
                    <span className="text-xs font-black text-slate-400 group-hover:text-slate-900 transition-colors">
                      {loc.stationCode || 'N/A'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredLocations.length === 0 && !isLoading && (
            <div className="col-span-full py-32 rounded-[3.5rem] bg-white border-2 border-dashed border-slate-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 mb-6">
                <MapPin size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">No Stations Detected</h3>
              <p className="text-slate-400 font-medium max-w-[300px]">We couldn't find any stations matching your current filter.</p>
              <Button variant="link" className="mt-4 text-emerald-600 font-black uppercase tracking-widest text-xs" onClick={() => setSearchQuery('')}>Clear Search</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageLocations;
