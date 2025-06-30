import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthForm from './components/AuthForm/AuthForm'
import TaskList from './pages/TaskList/TaskList'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthForm type="login" onSubmit={handleLogin} />} />
        <Route path="/register" element={<AuthForm type="register" onSubmit={handleRegister} />} />
        <Route path="/recover" element={<AuthForm type="recover" onSubmit={handleRecover} />} />
        <Route path="/list" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  )
}

function handleLogin(data: any) {
  // call login API
}

function handleRegister(data: any) {
  // call register API
}

function handleRecover(data: any) {
  // call recover API
}
