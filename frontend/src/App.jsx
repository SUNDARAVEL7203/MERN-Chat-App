import { Route, Routes , Navigate} from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import SettingsPage from "./pages/SettingsPage"
import SignUpPage from "./pages/SignUpPage"
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import { useThemeStore } from "./store/useThemeStore.js"


function App() {
  const { authUser, checkAuth, isCheckingAuth , onlineUsers } = useAuthStore()
  const {theme} = useThemeStore()

console.log({onlineUsers})

  useEffect(() => {
   checkAuth()
  }, [checkAuth]);

  console.log({ authUser })

  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )

  return (
    <>
      <div data-theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to ="/login"/>}></Route>
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to = "/" />}></Route>
          <Route path="/profile" element={authUser ?  <ProfilePage /> : <Navigate to ="/login" />}></Route>
          <Route path="/settings" element={  <SettingsPage />}></Route>
          <Route path="/signup" element={  !authUser ? <SignUpPage />  : <Navigate to = "/" />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
