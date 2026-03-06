import { LayoutDashboard, LogOut, Menu, User, X, BusFront, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getData } from '@/context/userContext'
import axios from 'axios'
import { toast } from 'sonner'

const Navbar = () => {
    const { user, setUser } = getData()
    const navigate = useNavigate()
    const accessToken = localStorage.getItem("accessToken")
    const [mobileOpen, setMobileOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleScroll = (e, targetId) => {
        if (window.location.pathname === '/') {
            e.preventDefault();
            if (targetId === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }

    const logoutHandler = async () => {
        if (isLoggingOut) return
        setIsLoggingOut(true)
        setMobileOpen(false)
        try {
            await axios.post(`https://ksrtc-bus-search-booking-system.onrender.com/user/logout`, {}, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
        } catch (_) { /* proceed anyway */ }
        // Small delay so animation is visible
        setTimeout(() => {
            localStorage.clear()
            setUser(null)
            toast.success('Signed out successfully')
            setIsLoggingOut(false)
            navigate('/')
        }, 1200)
    }

    return (
        <>
            {/* ── Logout overlay ── */}
            {isLoggingOut && (
                <div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4"
                    style={{
                        background: 'rgba(0,0,0,0.55)',
                        backdropFilter: 'blur(8px)',
                        animation: 'fadeIn 0.2s ease'
                    }}
                >
                    <div className="bg-white rounded-2xl px-10 py-8 flex flex-col items-center gap-4 shadow-2xl">
                        <div className="relative w-14 h-14">
                            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
                                style={{ animation: 'spin 0.8s linear infinite' }} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <BusFront className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                        <div className="font-heading font-bold text-foreground">Signing out…</div>
                        <div className="text-xs text-muted-foreground">See you next time! 👋</div>
                    </div>
                </div>
            )}
            <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/90 dark:bg-card/90 backdrop-blur-md shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-primary/30 transition-shadow" style={{ background: 'linear-gradient(135deg, #1a6e3c 0%, #0f4525 100%)' }}>
                                <BusFront className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-heading font-bold text-lg text-primary leading-tight tracking-tight">KSRTC</span>
                                <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase leading-tight">Kerala</span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
                            <Link to="/" onClick={(e) => handleScroll(e, 'home')} className="hover:text-primary transition-colors">Home</Link>
                            <Link to="/#routes" onClick={(e) => handleScroll(e, 'routes')} className="hover:text-primary transition-colors">Services</Link>
                            <Link to="/#about" onClick={(e) => handleScroll(e, 'about')} className="hover:text-primary transition-colors">About</Link>
                            <Link to="/#contact" onClick={(e) => handleScroll(e, 'contact')} className="hover:text-primary transition-colors">Contact</Link>
                        </nav>

                        {/* Auth Section */}
                        <div className="flex items-center gap-3">
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="outline-none hidden md:block">
                                        <div className="p-1 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={user?.avatar} />
                                                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                                                    {user?.username ? user.username[0].toUpperCase() : "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-64 shadow-xl border-border/50 p-1.5">
                                        <DropdownMenuLabel className="p-3 mb-1 rounded-lg bg-muted/30">
                                            <div className="flex flex-col gap-1 overflow-hidden">
                                                <p className="font-bold text-sm text-foreground truncate">{user.username}</p>
                                                <p className="text-xs text-muted-foreground truncate font-medium">{user.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className="mx-1" />
                                        <div className="py-1">
                                            <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer rounded-md py-2.5 px-3 transition-colors hover:bg-primary/5 focus:bg-primary/5">
                                                <User className="mr-3 h-4 w-4 text-muted-foreground group-hover:text-primary" />
                                                <span className="font-medium text-sm">Account Settings</span>
                                            </DropdownMenuItem>
                                            {user.role === 'admin' && (
                                                <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer rounded-md py-2.5 px-3 transition-colors hover:bg-primary/5 focus:bg-primary/5">
                                                    <LayoutDashboard className="mr-3 h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium text-sm">Admin Dashboard</span>
                                                </DropdownMenuItem>
                                            )}
                                        </div>
                                        <DropdownMenuSeparator className="mx-1" />
                                        <DropdownMenuItem onClick={logoutHandler} className="cursor-pointer rounded-md py-2.5 px-3 text-destructive focus:text-destructive focus:bg-destructive/5 mt-1 transition-colors font-semibold text-sm">
                                            <LogOut className="mr-3 h-4 w-4" /> Sign Out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex gap-2 items-center">
                                    <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-1.5">
                                        Login
                                    </Link>
                                    <Link to="/signup" className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                                        Register
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Toggle */}
                            <button className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
                                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Overlay */}
                    {mobileOpen && (
                        <div className="md:hidden absolute top-full left-0 w-full z-50 bg-white/95 dark:bg-card/95 backdrop-blur-md border-b border-border/50 shadow-xl py-4 px-6 flex flex-col gap-3 text-sm font-semibold animate-in fade-in slide-in-from-top-1 duration-200">
                            <Link to="/" className="flex items-center gap-3 hover:text-primary transition-colors pl-1" onClick={(e) => { setMobileOpen(false); handleScroll(e, 'home'); }}>
                                Home
                            </Link>
                            <Link to="/#routes" className="flex items-center gap-3 hover:text-primary transition-colors pl-1" onClick={(e) => { setMobileOpen(false); handleScroll(e, 'routes'); }}>
                                Services
                            </Link>
                            <Link to="/#about" className="flex items-center gap-3 hover:text-primary transition-colors pl-1" onClick={(e) => { setMobileOpen(false); handleScroll(e, 'about'); }}>
                                About
                            </Link>
                            <Link to="/#contact" className="flex items-center gap-3 hover:text-primary transition-colors pl-1" onClick={(e) => { setMobileOpen(false); handleScroll(e, 'contact'); }}>
                                Contact
                            </Link>

                            <div className="pt-2 mt-2 border-t border-border/40 flex flex-col gap-4">
                                {user && (
                                    <>
                                        <Link to="/profile" className="flex items-center gap-3 hover:text-primary transition-colors text-foreground" onClick={() => setMobileOpen(false)}>
                                            <User className="w-4 h-4 text-muted-foreground" /> My Profile
                                        </Link>
                                        {user.role === 'admin' && (
                                            <Link to="/admin" className="flex items-center gap-3 hover:text-primary transition-colors text-foreground" onClick={() => setMobileOpen(false)}>
                                                <LayoutDashboard className="w-4 h-4 text-muted-foreground" /> Admin Dashboard
                                            </Link>
                                        )}
                                        <button onClick={() => { logoutHandler(); setMobileOpen(false); }} className="flex items-center gap-3 hover:text-destructive transition-colors text-destructive text-left font-bold">
                                            <LogOut className="w-4 h-4" /> Sign Out
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </header>
        </>
    )
}

export default Navbar
