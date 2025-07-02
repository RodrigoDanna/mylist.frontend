import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import TaskList from './pages/TaskList/TaskList'
import ChangePasswordPage from './pages/ChangePassword/ChangePassword'
import EditTask from './pages/EditTask/EditTask'
import AddTask from './pages/AddTask/AddTask'
import PrivateRoute from './components/PrivateRoute'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Recover } from './pages/Recover'
import { isAuthenticated } from './utils/auth'
import Logout from './pages/Logout'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover" element={<Recover />} />
        <Route
          path="/list"
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <PrivateRoute>
              <ChangePasswordPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-task/:id"
          element={
            <PrivateRoute>
              <EditTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-task"
          element={
            <PrivateRoute>
              <AddTask />
            </PrivateRoute>
          }
        />
        {/* Default route: redirect based on authentication */}
        <Route
          path="*"
          element={
            isAuthenticated() ? <Navigate to="/list" replace /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
