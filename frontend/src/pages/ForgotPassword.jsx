import { API_URL } from '../config';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, BusFront, ArrowRight, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            setIsLoading(true);
            const res = await axios.post(`${API_URL}/user/forgot-password`, { email });
            if (res.data.success) {
                toast.success('OTP sent to your email!');
                navigate(`/verify-otp/${email}`);
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Something went wrong. Try again.';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Panel - Same as Login */}
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
                        Account<br />Recovery
                    </div>
                    <p className="text-white/75 text-base max-w-xs leading-relaxed">
                        Don't worry, it happens. Enter your email to receive a secure OTP for password reset.
                    </p>
                </div>

                <p className="text-white/40 text-xs relative z-10">© {new Date().getFullYear()} Kerala State Road Transport Corporation</p>
            </div>

            {/* Right Panel - Form */}
            <div className="flex items-center justify-center px-6 py-12 bg-background">
                <div className="w-full max-w-sm space-y-7 animate-in fade-in slide-in-from-bottom-6 duration-700">

                    {/* Back Link */}
                    <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                    </Link>

                    {/* Branding */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shadow-inner">
                            <BusFront className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <div className="font-heading font-extrabold text-lg text-foreground tracking-tight">KSRTC Kerala</div>
                            <div className="h-0.5 w-full bg-primary rounded-full mt-0.5" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h1 className="font-heading font-bold text-3xl text-foreground">Forgot Password?</h1>
                        <p className="text-muted-foreground text-sm">Recover your KSRTC account</p>
                    </div>

                    {error && (
                        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-700 animate-in fade-in">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="font-medium text-foreground">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                className="glass-input h-11"
                                placeholder="Enter your registered email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <Button type="submit"
                            className="w-full h-11 font-semibold bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 transition-all"
                            disabled={isLoading || !email}>
                            {isLoading ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending OTP...</>
                            ) : (
                                <><span>Send OTP</span><ArrowRight className="ml-2 h-4 w-4" /></>
                            )}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        Remembered your password?{" "}
                        <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
