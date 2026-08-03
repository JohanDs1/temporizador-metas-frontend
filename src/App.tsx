import './App.css'
import { GoalDashboard } from './pages/goal-dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginScreen } from './pages/login-screen';

function App() {
  const isLoggedIn = true;

  return (
    <Router>
      <Routes>
        //Logica simple por el momento
        <Route path="/" element={isLoggedIn ? <GoalDashboard /> : <LoginScreen />} />
      </Routes>
    </Router>
  )
}

export default App;
