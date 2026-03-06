import { API_URL } from '../config';
import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, BusFront, ArrowLeft, ShieldCheck, CheckCircle2, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const VerifyOTP = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => { inputRefs.current[0]?.focus(); }, []);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const clearOtp = () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) { setError('Please enter all 6 digits'); return; }
    setError('');
    try {
      setIsLoading(true);
      const res = await axios.post(`${API_URL}/user/verify-otp/${email}`, { otp: code });
      if (res.data.success || res.status === 200) {
        setSuccess(true);
        toast.success("OTP Verified Successfully!");
        setTimeout(() => navigate(`/change-password/${email}`), 1800);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Invalid OTP. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const filled = otp.filter(Boolean).length;

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
            Security<br />Check
          </div>
          <p className="text-white/75 text-base max-w-xs leading-relaxed">
            We've sent a 6-digit verification code to your email. Please enter it to continue.
          </p>
        </div>

        <p className="text-white/40 text-xs relative z-10">© {new Date().getFullYear()} Kerala State Road Transport Corporation</p>
      </div>

      {/* Right Panel - Content */}
      <div className="flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-sm space-y-7 animate-in fade-in slide-in-from-bottom-6 duration-700">

          {/* Back Link */}
          <Link to="/forgot-password" disabled={success} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group disabled:opacity-50">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Change Email
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
            <h1 className="font-heading font-bold text-3xl text-foreground">Verify OTP</h1>
            <p className="text-muted-foreground text-sm">Validating for {email}</p>
          </div>

          {success ? (
            <div className="flex flex-col items-center gap-4 py-6 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
              <div className="text-center">
                <div className="font-heading font-bold text-xl text-foreground">Verified! ✓</div>
                <div className="text-sm text-muted-foreground mt-1 text-center">Redirecting to reset password…</div>
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

              <div className="space-y-6">
                {/* Progress bar */}
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(filled / 6) * 100}%` }} />
                </div>

                <div className="flex justify-between gap-2" onPaste={handlePaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => (inputRefs.current[i] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleChange(i, e.target.value)}
                      onKeyDown={e => handleKeyDown(i, e)}
                      disabled={isLoading || success}
                      className={`w-full h-12 text-center text-xl font-bold rounded-xl border transition-all focus:outline-none bg-muted/30 ${digit ? 'border-primary ring-2 ring-primary/10 text-primary' : 'border-border text-foreground'
                        } ${error ? 'border-red-400' : ''} disabled:opacity-50`}
                    />
                  ))}
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleVerify}
                    className="w-full h-11 font-semibold bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 transition-all"
                    disabled={isLoading || filled < 6}>
                    {isLoading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Verifying...</>
                    ) : (
                      <><span>Verify Code</span><ShieldCheck className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>

                  <button
                    onClick={clearOtp}
                    disabled={isLoading}
                    className="w-full h-10 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Form
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
