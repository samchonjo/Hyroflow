import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import TechnicianDashboard from './pages/TechnicianDashboard';

function MainApp() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-message">Loading campus portal...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">W</div>
          <div>
            <p className="brand-title">HydroFlow</p>
            <small>
              {user.role === 'student'
                ? 'Student Water Portal'
                : user.role === 'technician'
                  ? 'Technician Console'
                  : 'Admin Operations'}
            </small>
          </div>
        </div>

        <div className="account-box">
          <div>
            <strong>{user.name}</strong>
            <small>
              {user.role === 'student'
                ? `${user.hostelBlock ?? 'Student'} • ${user.roomNumber ?? 'Room N/A'}`
                : user.email}
            </small>
          </div>
          <button type="button" onClick={logout} className="logout-button">
            Sign Out
          </button>
        </div>
      </header>

      <main className="content-wrap">
        {user.role === 'student' && <StudentDashboard student={user} />}
        {user.role === 'technician' && <TechnicianDashboard />}
        {user.role === 'admin' && <AdminDashboard />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
