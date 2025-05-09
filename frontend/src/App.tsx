import { useContext, useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import { getLocalStorage, setLocalStorage } from './utils/LocalStorage'
import AuthProvider from './contexts/AuthProvider'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import TaskManager from './components/TaskList/TaskManager'

function App() {
  const [user, setUser] = useState(null)  

  const handleLogin = async (email, password) => {
    try {
      // Check hardcoded admin/user first
      if (email === 'admin@me.com' && password === '123') {
        const adminUser = { 
          email, 
          role: 'admin',
          id: 'admin001' // Add ID for consistency
        }
        setUser(adminUser)
        localStorage.setItem('loggedInEmployeeId', 'admin001')
        return
      }
      
      if (email === 'user@me.com' && password === '123') {
        const regularUser = {
          email,
          role: 'user',
          id: 'user001'
        }
        setUser(regularUser)
        localStorage.setItem('loggedInEmployeeId', 'user001')
        return
      }

      // Check employee data in localStorage
      const employees = JSON.parse(localStorage.getItem('employees') || '[]')
      const foundEmployee = employees.find(
        emp => emp.email === email && emp.password === password
      )

      if (foundEmployee) {
        const employeeUser = { 
          email: foundEmployee.email,
          role: 'employee',
          id: foundEmployee.id,
          name: foundEmployee.name,
          ...foundEmployee
        }
        setUser(employeeUser)
        localStorage.setItem('loggedInEmployeeId', foundEmployee.id)
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      console.error("[AUTH] Login error:", error)
      throw error // This allows the Login component to catch and display the error
    }
  }

  const handleLogout = () => {
    console.log("[AUTH] User logged out")
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('loggedInEmployeeId')
  }

  useEffect(() => {
    // Initialize localStorage if needed
    setLocalStorage()
    getLocalStorage()
    
    // Check for existing session
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        console.log("[AUTH] Found existing session:", parsedUser)
        setUser(parsedUser)
        
        // Ensure loggedInEmployeeId is also set
        if (parsedUser.id && !localStorage.getItem('loggedInEmployeeId')) {
          localStorage.setItem('loggedInEmployeeId', parsedUser.id)
        }
      } catch (error) {
        console.error("[AUTH] Error parsing user data:", error)
        localStorage.removeItem('user')
        localStorage.removeItem('loggedInEmployeeId')
      }
    }
  }, [])

  useEffect(() => {
    // Persist user data to localStorage when it changes
    if (user) {
      console.log("[AUTH] User state updated:", user)
      localStorage.setItem('user', JSON.stringify(user))
      
      // Ensure ID is always set
      if (user.id) {
        localStorage.setItem('loggedInEmployeeId', user.id)
      }
    }
  }, [user])

  return (
    <Routes>
      <Route path="/" element={!user ? <Login handleLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
      
      <Route 
        path="/dashboard" 
        element={user ? (
          user.role === 'admin' ? (
            <AdminDashboard handleLogout={handleLogout} />
          ) : (
            <EmployeeDashboard user={user} handleLogout={handleLogout} />
          )
        ) : (
          <Navigate to="/" />
        )} 
      />

      {/* Add a new route for the Task Manager */}
      <Route 
        path="/tasks" 
        element={user ? (
          <TaskManager />
        ) : (
          <Navigate to="/" />
        )}
      />
    </Routes>
  )
}

export default App