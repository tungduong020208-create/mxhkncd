import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Messages from './pages/Messages';
import Explore from './pages/Explore';
import Community from './pages/Community';
import Settings from './pages/Settings';
import Saved from './pages/Saved';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Help from './pages/Help';
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AppContent({ focusMode, setFocusMode }) {
  const location = useLocation();
  const authPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {!authPage && <Navbar focusMode={focusMode} onToggleFocus={() => setFocusMode((prev) => !prev)} />}
      <main
        className={`mx-auto w-full max-w-[1400px] px-4 py-6 ${authPage ? 'grid' : focusMode ? 'grid' : 'grid gap-6 lg:grid-cols-[240px_1fr_320px]'}`}
      >
        {!authPage && !focusMode && <Sidebar />}
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              }
            />
            <Route
              path="/community"
              element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved"
              element={
                <ProtectedRoute>
                  <Saved />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/help"
              element={
                <ProtectedRoute>
                  <Help />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        {!authPage && !focusMode && <RightPanel />}
      </main>
    </div>
  );
}

function App() {
  const [focusMode, setFocusMode] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <AppContent focusMode={focusMode} setFocusMode={setFocusMode} />
      </Router>
    </AuthProvider>
  );
}

export default App;
