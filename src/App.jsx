import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SaveProvider, useSave } from './contexts/SaveContext';
import Header from './components/Header';
import AuthPage from './pages/AuthPage';
import GameSelectionPage from './pages/GameSelectionPage';
import TrackerPage from './pages/TrackerPage';

function AppContent() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { currentSave } = useSave();

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mb-4 mx-auto">
            <div className="relative w-full h-full animate-bounce-subtle">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-poke-red to-red-700 border-4 border-poke-dark" />
              <div className="absolute left-0 right-0 top-1/2 h-1.5 bg-poke-dark -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-4 border-poke-dark" />
            </div>
          </div>
          <p className="text-gray-400 animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth page if not logged in
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  // Show main app
  return (
    <>
      <Header />
      {currentSave ? <TrackerPage /> : <GameSelectionPage />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <SaveProvider>
        <AppContent />
      </SaveProvider>
    </AuthProvider>
  );
}

export default App;
