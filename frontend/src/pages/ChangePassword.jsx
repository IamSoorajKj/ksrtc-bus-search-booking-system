import { API_URL } from '../config';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, BusFront, Eye, EyeOff, Lock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ChangePassword = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const strength = newPassword.length >= 8
        ? (newPassword.match(/[A-Z]/) && newPassword.match(/\d/) ? 'strong' : 'medium')
        : newPassword.length > 0 ? 'weak' : '';

    const strengthColor = { strong: 'bg-emerald-500', medium: 'bg-amber-500', weak: 'bg-rose-500' }[strength] || 'bg-muted';
    const strengthLabelColor = { strong: 'text-emerald-600', medium: 'text-amber-600', weak: 'text-rose-600' }[strength] || 'text-muted-foreground';
    const strengthWidth = { strong: '100%', medium: '60%', weak: '30%' }[strength] || '0%';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (newPassword !== confirmPassword) { setError("Passwords don't match"); return; }
        if (newPassword.length < 8) { setError('Password must be at least 8 characters'); return; }
        try {
            setIsLoading(true);
            const res = await axios.post(`${API_URL}/user/change-password/${email}`, { newPassword, confirmPassword });
            if (res.data.success || res.status === 200) {
                setSuccess(true);
                toast.success("Password Updated Successfully!");
                setTimeout(() => navigate('/login'), 2200);
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
                        Secure<br />Access
                    </div>
                    <p className="text-white/75 text-base max-w-xs leading-relaxed">
                        Create a strong, memorable password to keep your KSRTC account safe and protected.
                    </p>
                </div>

                <p className="text-white/40 text-xs relative z-10">© {new Date().getFullYear()} Kerala State Road Transport Corporation</p>
            </div>

            {/* Right Panel - Content */}
            <div className="flex items-center justify-center px-6 py-12 bg-background">
                <div className="w-full max-w-sm space-y-7 animate-in fade-in slide-in-from-bottom-6 duration-700">

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
                        <h1 className="font-heading font-bold text-3xl text-foreground">Set New Password</h1>
                        <p className="text-muted-foreground text-sm">Security update for {email}</p>
                    </div>

                    {success ? (
                        <div className="flex flex-col items-center gap-4 py-6 animate-in zoom-in-95 duration-500">
                            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center shadow-sm">
                                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                            </div>
                            <div className="text-center">
                                <div className="font-heading font-bold text-xl text-foreground">Success! 🎉</div>
                                <div className="text-sm text-muted-foreground mt-1 text-center">Your password has been updated. Redirecting to login…</div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-700 animate-in fade-in">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-1.5">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="newPassword"
                                            type={showNew ? 'text' : 'password'}
                                            placeholder="Min. 8 characters"
                                            value={newPassword}
                                            onChange={e => setNewPassword(e.target.value)}
                                            required disabled={isLoading}
                                            className="glass-input h-11 pr-10"
                                        />
                                        <button type="button" onClick={() => setShowNew(!showNew)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                                            {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>

                                    {/* Strength bar */}
                                    {newPassword && (
                                        <div className="mt-2 space-y-1">
                                            <div className="h-1 bg-muted rounded-full overflow-hidden">
                                                <div className={`h-full transition-all duration-500 ${strengthColor}`}
                                                    style={{ width: strengthWidth }} />
                                            </div>
                                            <div className={`text-[10px] font-bold uppercase tracking-wider ${strengthLabelColor}`}>
                                                {strength} password
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirm ? 'text' : 'password'}
                                            placeholder="Repeat new password"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            required disabled={isLoading}
                                            className={`glass-input h-11 pr-10 ${confirmPassword && confirmPassword !== newPassword ? 'border-red-400 focus:ring-red-400/10' : ''}`}
                                        />
                                        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <Button type="submit"
                                    className="w-full h-11 font-semibold bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 transition-all mt-2"
                                    disabled={isLoading || !newPassword || !confirmPassword}>
                                    {isLoading ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Updating...</>
                                    ) : (
                                        <><span>Update Password</span><ArrowRight className="ml-2 h-4 w-4" /></>
                                    )}
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
