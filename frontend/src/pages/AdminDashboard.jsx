import React from 'react';
import { LayoutDashboard, MapPin, BusFront, ArrowLeft, ChevronRight } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Locations', path: '/admin/locations', icon: MapPin },
    { name: 'Buses', path: '/admin/buses', icon: BusFront },
  ];

  const isActive = (item) => item.exact
    ? location.pathname === item.path
    : location.pathname.startsWith(item.path);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 shrink-0 hidden md:flex flex-col relative z-20 shadow-2xl overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #062214 0%, #04140a 100%)' }}>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* Logo Section */}
        <div className="px-8 py-8 relative">
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition-transform duration-300">
              <BusFront className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-heading font-black text-white text-xl leading-tight tracking-tight">KSRTC</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/80">Admin Console</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 relative">
          <div className="px-4 mb-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Main Menu</p>
          </div>
          {menuItems.map((item) => {
            const active = isActive(item);
            return (
              <Link key={item.path} to={item.path}
                className={`group flex items-center gap-3.5 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 relative ${active
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                  }`}>
                {active && (
                  <div className="absolute inset-0 bg-white/10 rounded-2xl animate-in fade-in duration-500"
                    style={{ border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }} />
                )}
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-emerald-500 rounded-r-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                )}
                <item.icon className={`w-5 h-5 shrink-0 transition-colors duration-300 ${active ? 'text-emerald-400' : 'group-hover:text-white/80'}`} />
                <span className="relative z-10">{item.name}</span>
                {active && <ChevronRight className="w-4 h-4 ml-auto text-white/30" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer info & Logout-style action */}
        <div className="px-6 pb-8 relative">
          <div className="p-5 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Quick Navigation</p>
            <Link to="/" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-xs font-bold group">
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                <ArrowLeft className="w-4 h-4 text-white" />
              </div>
              Public Website
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] relative">
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />

        {/* Top Header Bar */}
        <header className="sticky top-0 z-10 h-20 bg-white/80 dark:bg-card/80 backdrop-blur-xl border-b border-slate-200/60 px-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              <span>Admin</span>
              {location.pathname !== '/admin' && (
                <> <ChevronRight className="w-3 h-3" /> <span className="text-emerald-600">Dashboard</span></>
              )}
            </div>
            <h1 className="font-heading font-black text-xl text-slate-900 capitalize">
              {location.pathname === '/admin' ? 'Overview' : location.pathname.split('/admin/')[1]}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-100/50">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">System Live</span>
            </div>

            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                <LayoutDashboard size={20} />
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-black text-slate-900 leading-none mb-1 uppercase tracking-tight">System Admin</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Verified</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto px-10 py-10 relative">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
