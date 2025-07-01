import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthForm from './components/AuthForm/AuthForm'
import TaskList from './pages/TaskList/TaskList'
import ChangePasswordPage from './pages/ChangePassword/ChangePassword'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthForm type="login" onSubmit={handleLogin} />} />
        <Route path="/register" element={<AuthForm type="register" onSubmit={handleRegister} />} />
        <Route path="/recover" element={<AuthForm type="recover" onSubmit={handleRecover} />} />
        <Route path="/list" element={<TaskList />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function handleLogin(data: any) {
  console.log(data);
}

function handleRegister(data: any) {
  console.log(data);
}

function handleRecover(data: any) {
  console.log(data);
}
