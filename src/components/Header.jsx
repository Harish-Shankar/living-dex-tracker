import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSave } from '../contexts/SaveContext';
import { LogOut, User, ChevronDown, Menu, X } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  const { currentSave, closeSave, getCompletionStats } = useSave();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const stats = currentSave ? getCompletionStats() : null;

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-poke-border">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-poke-red to-red-700 border-2 border-gray-700" />
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-700 -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-gray-700" />
            </div>
            <div>
              <h1 className="font-display text-xs sm:text-sm text-poke-text leading-tight">
                Living Dex
              </h1>
              <p className="text-[10px] text-poke-text-light font-body">Tracker</p>
            </div>
          </div>

          {/* Current Save Info (Desktop) */}
          {currentSave && (
            <div className="hidden md:flex items-center gap-4">
              <div className="text-center">
                <p className="text-sm font-semibold text-poke-text">{currentSave.name}</p>
                <p className="text-xs text-poke-text-light">{currentSave.gameId.toUpperCase()}</p>
              </div>
              <div className="h-8 w-px bg-poke-border" />
              <div className="text-center">
                <p className="text-sm font-semibold text-poke-yellow">
                  {stats?.caught}/{stats?.total}
                </p>
                <p className="text-xs text-poke-text-light">{stats?.percentage}% Complete</p>
              </div>
              <button
                onClick={closeSave}
                className="px-3 py-1.5 text-xs bg-poke-dark hover:bg-poke-darker rounded-lg transition-colors border border-poke-border text-poke-text"
              >
                Switch Save
              </button>
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 hover:bg-poke-dark rounded-lg transition-colors text-poke-text"
            >
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Desktop User Menu */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-poke-dark rounded-lg transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-poke-blue to-blue-700 flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium max-w-[100px] truncate text-poke-text">
                  {user?.displayName || 'Trainer'}
                </span>
                <ChevronDown size={14} className={`transition-transform text-poke-text-light ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-poke-card border border-poke-border rounded-lg shadow-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-poke-border">
                    <p className="text-sm font-medium truncate text-poke-text">{user?.displayName}</p>
                    <p className="text-xs text-poke-text-light truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-poke-dark transition-colors flex items-center gap-2 text-red-500"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pt-4 border-t border-poke-border">
            {currentSave && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-poke-text">{currentSave.name}</p>
                    <p className="text-xs text-poke-text-light">{currentSave.gameId.toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-poke-yellow">
                      {stats?.caught}/{stats?.total}
                    </p>
                    <p className="text-xs text-poke-text-light">{stats?.percentage}%</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    closeSave();
                    setShowMobileMenu(false);
                  }}
                  className="w-full px-3 py-2 text-sm bg-poke-dark hover:bg-poke-darker rounded-lg transition-colors border border-poke-border text-poke-text"
                >
                  Switch Save
                </button>
              </div>
            )}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-poke-blue to-blue-700 flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-poke-text">{user?.displayName}</p>
                  <p className="text-xs text-poke-text-light">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-red-500 hover:bg-poke-dark rounded-lg transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
