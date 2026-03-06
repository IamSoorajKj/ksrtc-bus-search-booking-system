import { API_URL } from '../config';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
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
            setError(err.response?.data?.message || 'Something went wrong. Try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">

            <div className="w-full max-w-md relative z-10">

                {/* Back */}
                <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    Back to Login
                </Link>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-border overflow-hidden">


                    <div className="p-8">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                            style={{ background: 'linear-gradient(135deg, #1a6e3c, #16a34a)' }}>
                            <Mail className="w-8 h-8 text-white" />
                        </div>

                        <h1 className="font-heading font-black text-2xl text-center text-foreground mb-1">Forgot Password?</h1>
                        <p className="text-sm text-muted-foreground text-center mb-7">
                            Enter your email and we'll send you an OTP to reset your password.
                        </p>

                        {/* Error */}
                        {error && (
                            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-muted/30 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all disabled:opacity-50"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !email}
                                className="w-full h-12 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
                                style={{ background: isLoading ? '#166534' : 'linear-gradient(135deg, #16a34a, #1a6e3c)' }}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Sending OTP…
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Send OTP
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="text-xs text-center text-muted-foreground mt-6">
                            Remember your password?{' '}
                            <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
