import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthForm from './components/AuthForm/AuthForm'
import TaskList from './pages/TaskList/TaskList'
import ChangePasswordPage from './pages/ChangePassword/ChangePassword'
import EditTask from './pages/EditTask/EditTask'
import AddTask from './pages/AddTask/AddTask'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthForm type="login" onSubmit={handleLogin} />} />
        <Route path="/register" element={<AuthForm type="register" onSubmit={handleRegister} />} />
        <Route path="/recover" element={<AuthForm type="recover" onSubmit={handleRecover} />} />
        <Route path="/list" element={
          <PrivateRoute>
            <TaskList />
          </PrivateRoute>
        } />
        <Route path="/change-password" element={
          <PrivateRoute>
            <ChangePasswordPage />
          </PrivateRoute>
        } />
        <Route path="/edit-task/:id" element={
          <PrivateRoute>
            <EditTask />
          </PrivateRoute>
        } />
        <Route path="/add-task" element={
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

function handleLogin(data: any) {
  console.log(data)
}

function handleRegister(data: any) {
  console.log(data)
}

function handleRecover(data: any) {
  console.log(data)
}
