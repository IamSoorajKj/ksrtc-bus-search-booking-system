import React, { useEffect, useState } from 'react';
import { Bus, MapPin, Users, TrendingUp, ArrowUpRight, Activity, Clock } from 'lucide-react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminOverview = () => {
  const [stats, setStats] = useState({
    buses: 0,
    locations: 0,
    bookings: 0, // Placeholder for future implementation
    passengers: 0 // Placeholder
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [busesRes, locsRes] = await Promise.all([
          axios.get('http://localhost:8000/bus/all'),
          axios.get('http://localhost:8000/location/all')
        ]);
        setStats({
          buses: busesRes.data.data?.length || 0,
          locations: locsRes.data.data?.length || 0,
          bookings: 124, // Mocked for design
          passengers: 1450 // Mocked for design
        });
      } catch (error) {
        // Silently fail, stats will stay at 0
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cards = [
    { title: 'Total Buses', value: stats.buses, icon: Bus, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+2 this week' },
    { title: 'Active Stations', value: stats.locations, icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-50', trend: 'All regions' },
    { title: 'Total Bookings', value: stats.bookings, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50', trend: '+12% growth' },
    { title: 'Passengers Today', value: stats.passengers, icon: Users, color: 'text-rose-600', bg: 'bg-rose-50', trend: 'Peak travel' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Performance</h2>
          <p className="text-slate-500 font-medium">Real-time statistics for KSRTC Operations</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
            <Clock size={20} />
          </div>
          <div className="pr-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Last Update</p>
            <p className="text-xs font-bold text-slate-700">Just now</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <Card key={i} className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-2xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform duration-500`}>
                  <card.icon size={24} />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-emerald-500 transition-colors">
                  <ArrowUpRight size={16} />
                </div>
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">{card.title}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-black text-slate-900">{loading ? '...' : card.value}</h3>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{card.trend}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics & Activity Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 p-10 border border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Activity size={120} className="text-emerald-500" />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-black text-slate-900 mb-2">Network Health</h3>
            <p className="text-slate-500 text-sm mb-8">All stations and buses are currently operating within normal parameters.</p>

            <div className="space-y-6">
              {[
                { label: 'Server Latency', value: '42ms', color: 'bg-emerald-500', width: '85%' },
                { label: 'Database Sync', value: '100%', color: 'bg-blue-500', width: '100%' },
                { label: 'API Availability', value: '99.9%', color: 'bg-amber-500', width: '99.9%' }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-slate-900">{item.value}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Bus size={150} />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-1">Fleet Management</h3>
            <p className="text-white/40 text-xs font-normal mb-8">Quickly manage your KSRTC assets</p>

            <div className="space-y-3">
              <button className="w-full py-4 px-6 rounded-2xl bg-white/10 hover:bg-emerald-500 transition-colors text-sm font-bold flex items-center justify-between group">
                <span>Add New Bus</span>
                <Bus size={18} className="text-white/40 group-hover:text-white" />
              </button>
              <button className="w-full py-4 px-6 rounded-2xl bg-white/10 hover:bg-emerald-500 transition-colors text-sm font-bold flex items-center justify-between group">
                <span>Add New Station</span>
                <MapPin size={18} className="text-white/40 group-hover:text-white" />
              </button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <Users size={20} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-white/40">Active Admins</p>
                <p className="text-lg font-black text-emerald-400">1 Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
