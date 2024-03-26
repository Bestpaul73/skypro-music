import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './Pages/MainLayout/MainLayout'
// import { Login } from './Pages/Login/login'
import { Favorites } from './Pages/Favorites/Favorites'
// import { Register } from './Pages/Register'
import { NotFound } from './Pages/not-found'
import { Category } from './Pages/Category/Category'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import { UserContext } from './App'
import { useContext } from 'react'
import AuthPage from './Pages/Auth/AuthPage'
import CenterBlockContent from './components/CenterBlockContent/CenterBlockContent'
import { MainTracks } from './Pages/MainTracks/MainTracks'

export const AppRoutes = () => {
  const { user } = useContext(UserContext)

  return (
    <Routes>
      <Route path="/login" element={<AuthPage isLoginMode={true} />} />
      <Route path="/register" element={<AuthPage isLoginMode={false} />} />

      <Route
        element={
          <ProtectedRoute redirectPath={'/login'} isAllowed={Boolean(user)} />
        }
      >
        <Route path="/" element={<MainLayout />}>
          {/* <Route index element={<CenterBlockContent />} /> */}
          <Route index element={<MainTracks />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/category/:id" element={<Category />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
