import { API_URL } from '../config';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, Lock, Eye, EyeOff, CheckCircle2, ShieldCheck } from 'lucide-react';

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

    const strengthColor = { strong: '#16a34a', medium: '#f59e0b', weak: '#ef4444' }[strength] || '#e2e8f0';
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
                setTimeout(() => navigate('/login'), 2200);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white rounded-3xl shadow-xl border border-border overflow-hidden">

                    <div className="p-8">
                        {success ? (
                            <div className="flex flex-col items-center gap-4 py-6">
                                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                                </div>
                                <div className="text-center">
                                    <div className="font-heading font-bold text-xl text-foreground">Password Updated! 🎉</div>
                                    <div className="text-sm text-muted-foreground mt-1">Redirecting to login…</div>
                                </div>
                                <div className="flex gap-1.5 mt-2">
                                    {[0, 1, 2].map(i => (
                                        <span key={i} className="w-2 h-2 rounded-full bg-primary block"
                                            style={{ animation: `bounce 0.9s ease-in-out ${i * 0.18}s infinite` }} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                                    style={{ background: 'linear-gradient(135deg, #1a6e3c, #16a34a)' }}>
                                    <Lock className="w-8 h-8 text-white" />
                                </div>

                                <h1 className="font-heading font-black text-2xl text-center mb-1">New Password</h1>
                                <p className="text-sm text-muted-foreground text-center mb-7">
                                    Setting password for <span className="font-semibold text-primary">{email}</span>
                                </p>

                                {error && (
                                    <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* New password */}
                                    <div>
                                        <div className="relative">
                                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                type={showNew ? 'text' : 'password'}
                                                placeholder="New password"
                                                value={newPassword}
                                                onChange={e => setNewPassword(e.target.value)}
                                                required disabled={isLoading}
                                                className="w-full h-12 pl-10 pr-11 rounded-xl border border-border bg-muted/30 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all disabled:opacity-50"
                                            />
                                            <button type="button" onClick={() => setShowNew(!showNew)}
                                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                                                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {/* Strength bar */}
                                        {newPassword && (
                                            <div className="mt-2">
                                                <div className="h-1 bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full transition-all duration-500"
                                                        style={{ width: strengthWidth, background: strengthColor }} />
                                                </div>
                                                <div className="text-[10px] mt-1 font-semibold capitalize" style={{ color: strengthColor }}>
                                                    {strength} password
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Confirm password */}
                                    <div className="relative">
                                        <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type={showConfirm ? 'text' : 'password'}
                                            placeholder="Confirm password"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            required disabled={isLoading}
                                            className={`w-full h-12 pl-10 pr-11 rounded-xl border bg-muted/30 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all disabled:opacity-50 ${confirmPassword && confirmPassword !== newPassword ? 'border-red-400' : 'border-border'
                                                }`}
                                        />
                                        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading || !newPassword || !confirmPassword}
                                        className="w-full h-12 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] mt-2"
                                        style={{ background: isLoading ? '#166534' : 'linear-gradient(135deg, #16a34a, #1a6e3c)' }}
                                    >
                                        {isLoading ? (
                                            <><Loader2 className="w-4 h-4 animate-spin" />Updating Password…</>
                                        ) : (
                                            <><Lock className="w-4 h-4" />Update Password</>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
