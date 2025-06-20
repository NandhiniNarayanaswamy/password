import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/Register";
import PasswordReset from "./components/PasswordReset";
import ResetPasswordForm from "./components/ResetPasswordForm";
import LoginForm from "./components/LoginForm";
import "./App.css"


function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
          <Route path="/login" element={<LoginForm />} />

        </Routes>
      </Router>

    </div>
  )

}

export default App