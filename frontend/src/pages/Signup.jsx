import { API_URL } from '../config';
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2, BusFront, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({ username: "", email: "", password: "" })
    const [error, setError] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (error) setError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post(`${API_URL}/user/register`, formData, {
                headers: { "Content-Type": "application/json" }
            })
            if (res.data.success) {
                navigate('/login')
                toast.success(res.data.message)
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
            setError(errorMsg)
            toast.error(errorMsg)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Panel */}
            <div className="hidden lg:flex flex-col justify-between p-12 text-white relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #1a6e3c 0%, #0f4525 55%, #071a0b 100%)' }}>
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

                <div className="flex items-center gap-2.5 relative z-10">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                        <BusFront className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="font-heading font-bold text-xl leading-tight">KSRTC</div>
                        <div className="text-xs text-white/70 uppercase tracking-wider">Kerala</div>
                    </div>
                </div>

                <div className="relative z-10 space-y-4">
                    <div className="text-5xl font-heading font-extrabold leading-tight">
                        Join<br />Kerala's Bus<br />Network
                    </div>
                    <p className="text-white/75 text-base max-w-xs leading-relaxed">
                        Create your free account and start booking bus tickets across Kerala in minutes.
                    </p>
                    <ul className="space-y-2 pt-1">
                        {["Free account, always", "Instant booking confirmation", "Access to 5000+ routes"].map(t => (
                            <li key={t} className="flex items-center gap-2 text-sm text-white/80">
                                <span className="w-4 h-4 bg-accent/80 rounded-full flex items-center justify-center text-[10px]">✓</span>
                                {t}
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="text-white/40 text-xs relative z-10">© {new Date().getFullYear()} Kerala State Road Transport Corporation</p>
            </div>

            {/* Right Panel - Form */}
            <div className="flex items-center justify-center px-6 py-12 bg-background">
                <div className="w-full max-w-sm space-y-7 animate-in fade-in slide-in-from-bottom-6 duration-700">

                    {/* Mobile Only Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shadow-inner">
                            <BusFront className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <div className="font-heading font-extrabold text-lg text-foreground tracking-tight">KSRTC Kerala</div>
                            <div className="h-0.5 w-8 bg-primary rounded-full" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h1 className="font-heading font-bold text-3xl text-foreground">Create account</h1>
                        <p className="text-muted-foreground text-sm">Join KSRTC Kerala's booking platform</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <Label htmlFor="username" className="font-medium text-foreground">Full Name</Label>
                            <Input
                                id="username"
                                name="username"
                                className="glass-input h-11"
                                placeholder="Enter Your Name"
                                value={formData.username}
                                onChange={handleChange}
                                type="text"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="font-medium text-foreground">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                className="glass-input h-11"
                                placeholder="Enter your Email ID"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="password" className="font-medium text-foreground">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    className="glass-input h-11 pr-10"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type={showPassword ? "text" : "password"}
                                    required
                                />
                                <button type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <Button type="submit"
                            className="w-full h-11 font-semibold bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 transition-all"
                            disabled={isLoading}>
                            {isLoading ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating account...</>
                            ) : (
                                <><span>Create Account</span><ArrowRight className="ml-2 h-4 w-4" /></>
                            )}
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                            By registering, you agree to KSRTC's terms of service and privacy policy.
                        </p>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
