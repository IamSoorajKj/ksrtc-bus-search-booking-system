import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loader2, ShieldCheck, RotateCcw, ArrowLeft, CheckCircle2 } from 'lucide-react';

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
    if (!/^\d?$/.test(value)) return; // digits only
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
      const res = await axios.post(`http://localhost:8000/user/verify-otp/${email}`, { otp: code });
      if (res.data.success || res.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate(`/change-password/${email}`), 1800);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const filled = otp.filter(Boolean).length;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">

      <div className="w-full max-w-md relative z-10">
        <Link to="/forgot-password" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Wrong email?
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-border overflow-hidden">

          <div className="p-8">
            {/* Success state */}
            {success ? (
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </div>
                <div className="text-center">
                  <div className="font-heading font-bold text-xl text-foreground">Verified! ✓</div>
                  <div className="text-sm text-muted-foreground mt-1">Redirecting to reset password…</div>
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
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                  style={{ background: 'linear-gradient(135deg, #1a6e3c, #16a34a)' }}>
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>

                <h1 className="font-heading font-black text-2xl text-center mb-1">Enter OTP</h1>
                <p className="text-sm text-muted-foreground text-center mb-7">
                  We sent a 6-digit code to{' '}
                  <span className="font-semibold text-foreground">{email}</span>
                </p>

                {/* Progress bar */}
                <div className="h-1 bg-muted rounded-full mb-6 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${(filled / 6) * 100}%`, background: 'linear-gradient(90deg, #16a34a, #4ade80)' }} />
                </div>

                {/* OTP Boxes */}
                <div className="flex justify-center gap-2 mb-3" onPaste={handlePaste}>
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
                      className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all focus:outline-none bg-muted/30 ${digit ? 'border-primary bg-primary/5 text-primary' : 'border-border text-foreground'
                        } ${error ? 'border-red-400' : ''} disabled:opacity-50`}
                    />
                  ))}
                </div>

                {/* Error */}
                {error && (
                  <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 text-center">
                    {error}
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-3 mt-5">
                  <button
                    onClick={handleVerify}
                    disabled={isLoading || filled < 6}
                    className="w-full h-12 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                    style={{ background: isLoading ? '#166534' : 'linear-gradient(135deg, #16a34a, #1a6e3c)' }}
                  >
                    {isLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />Verifying…</>
                    ) : (
                      <><ShieldCheck className="w-4 h-4" />Verify Code</>
                    )}
                  </button>

                  <button
                    onClick={clearOtp}
                    disabled={isLoading}
                    className="w-full h-10 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Clear
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
