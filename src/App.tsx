import './App.css'
import { GoalDashboard } from './pages/goal-dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginScreen } from './pages/login-screen';
import { useAuthStore } from './stores/auth-store';

function App() {
  const { user, logout } = useAuthStore()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoalDashboard username={user?.username || ''} onLogout={logout} />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

      </Routes>
    </Router>
  )
}

export default App;
