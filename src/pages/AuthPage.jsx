import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, User, Mail, Lock, Loader2 } from 'lucide-react';

export default function AuthPage() {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!isLogin && !formData.displayName) {
      setError('Please enter a trainer name');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await signup(formData.email, formData.password, formData.displayName);
    }

    if (!result.success) {
      // Parse Firebase error messages
      let errorMessage = result.error;
      if (result.error.includes('auth/email-already-in-use')) {
        errorMessage = 'This email is already registered';
      } else if (result.error.includes('auth/invalid-email')) {
        errorMessage = 'Please enter a valid email address';
      } else if (result.error.includes('auth/wrong-password') || result.error.includes('auth/user-not-found')) {
        errorMessage = 'Invalid email or password';
      } else if (result.error.includes('auth/invalid-credential')) {
        errorMessage = 'Invalid email or password';
      }
      setError(errorMessage);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-poke-red to-red-700 border-4 border-gray-700 animate-pulse-slow" />
              <div className="absolute left-0 right-0 top-1/2 h-1.5 bg-gray-700 -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-4 border-gray-700" />
            </div>
          </div>
          <h1 className="font-display text-xl text-poke-text mb-2">Living Dex Tracker</h1>
          <p className="text-poke-text-light">Track your Pokémon collection across all games</p>
        </div>

        {/* Auth Card */}
        <div className="glass rounded-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-poke-border">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                isLogin 
                  ? 'text-poke-yellow border-b-2 border-poke-yellow' 
                  : 'text-poke-text-light hover:text-poke-text'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                !isLogin 
                  ? 'text-poke-yellow border-b-2 border-poke-yellow' 
                  : 'text-poke-text-light hover:text-poke-text'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-poke-text mb-2">
                  Trainer Name
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-poke-text-light" />
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    placeholder="Ash Ketchum"
                    className="w-full pl-10 pr-4 py-3 bg-poke-dark border border-poke-border rounded-lg text-poke-text placeholder-poke-text-light focus:outline-none focus:ring-2 focus:ring-poke-yellow/50 focus:border-transparent transition-all"
                    maxLength={30}
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-poke-text mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-poke-text-light" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="trainer@pokemon.com"
                  className="w-full pl-10 pr-4 py-3 bg-poke-dark border border-poke-border rounded-lg text-poke-text placeholder-poke-text-light focus:outline-none focus:ring-2 focus:ring-poke-yellow/50 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-poke-text mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-poke-text-light" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-poke-dark border border-poke-border rounded-lg text-poke-text placeholder-poke-text-light focus:outline-none focus:ring-2 focus:ring-poke-yellow/50 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-poke-text-light hover:text-poke-text transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-poke-red to-red-600 hover:from-poke-red hover:to-red-500 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-poke-text-light text-xs mt-6">
          Track your Living Dex progress across all Pokémon games
        </p>
      </div>
    </div>
  );
}
