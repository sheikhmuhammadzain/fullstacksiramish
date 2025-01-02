import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Login from "./components/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Logindemo from "./components/logindemo"
import DemoSignup from "./components/DemoSignup"
import DemoHome from "./components/DemoHome"
import DemoProtectedRoute from "./components/DemoProtectedRoute"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<DemoSignup />} />
        <Route path="/demo" element={<Logindemo />} />
        <Route
          path="/home"
          element={
            <DemoProtectedRoute>
              <DemoHome />
            </DemoProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
