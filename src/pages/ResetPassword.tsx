import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { PasswordStrength, validatePassword } from '../components/PasswordStrength';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [validCode, setValidCode] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const verifyCode = async () => {
      if (!oobCode) {
        setError('Invalid password reset link');
        setVerifying(false);
        return;
      }

      try {
        const email = await verifyPasswordResetCode(auth, oobCode);
        setUserEmail(email);
        setValidCode(true);
      } catch (err: any) {
        console.error('Code verification error:', err);
        switch (err.code) {
          case 'auth/expired-action-code':
            setError('This password reset link has expired');
            break;
          case 'auth/invalid-action-code':
            setError('This password reset link is invalid or has already been used');
            break;
          default:
            setError('Invalid password reset link');
        }
      } finally {
        setVerifying(false);
      }
    };

    verifyCode();
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePassword(newPassword)) {
      setError('Password does not meet all requirements');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!oobCode) {
      setError('Invalid password reset link');
      return;
    }

    setLoading(true);

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccessMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      console.error('Password reset error:', err);
      switch (err.code) {
        case 'auth/expired-action-code':
          setError('This password reset link has expired');
          break;
        case 'auth/invalid-action-code':
          setError('This password reset link is invalid or has already been used');
          break;
        case 'auth/weak-password':
          setError('Password is too weak');
          break;
        default:
          setError('Failed to reset password. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = validatePassword(newPassword) && newPassword === confirmPassword && newPassword.length > 0;

  if (verifying) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="flex flex-col items-center gap-4">
            <span className="w-12 h-12 border-4 border-[#4E342E] border-t-transparent rounded-full animate-spin"></span>
            <p className="text-[#3E2723]">Verifying reset link...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!validCode) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 md:p-10">
          <div className="mb-8">
            <Logo showTagline size="lg" />
          </div>

          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <AlertCircle size={48} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-semibold text-[#3E2723]">Invalid Reset Link</h1>
            <p className="text-[#6B4423]">{error}</p>
            <Button
              onClick={() => navigate('/login')}
              fullWidth
              className="mt-6"
            >
              Back to Login
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 md:p-10">
        <div className="mb-8">
          <Logo showTagline size="lg" />
        </div>

        <h1 className="text-2xl font-semibold text-center mb-2 text-[#3E2723]">
          Reset Your Password
        </h1>
        <p className="text-sm text-center text-[#6B4423] mb-8">
          Enter a new password for {userEmail}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="w-full">
            <label className="block text-sm font-medium text-[#3E2723] mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 pr-12 bg-[#FAF8F3] border border-[#E0D7C6] rounded-lg text-[#3E2723] placeholder-[#A08A6D] focus:outline-none focus:ring-2 focus:ring-[#4E342E] focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B4423] hover:text-[#4E342E] transition-colors duration-200"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-[#3E2723] mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 pr-12 bg-[#FAF8F3] border border-[#E0D7C6] rounded-lg text-[#3E2723] placeholder-[#A08A6D] focus:outline-none focus:ring-2 focus:ring-[#4E342E] focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B4423] hover:text-[#4E342E] transition-colors duration-200"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {newPassword && (
            <div className="p-4 bg-[#FAF8F3] border border-[#E0D7C6] rounded-lg">
              <PasswordStrength password={newPassword} />
            </div>
          )}

          {confirmPassword && newPassword !== confirmPassword && (
            <div className="text-sm text-red-600">
              Passwords do not match
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            size="lg"
            disabled={loading || !isFormValid}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Resetting Password...
              </span>
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6B4423]">
          Remember your password?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-[#4E342E] hover:underline font-semibold"
          >
            Back to Login
          </button>
        </p>
      </Card>
    </div>
  );
}
