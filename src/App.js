// GLOBAL CSS
import './App.css';
// ROUTES
import RoutesApp from './routes';
// CONTEXTS
import { AuthProvider } from './contexts/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
// HOOKS
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';
// REACT-TOASTIFY
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return <p>Loading...</p>
  }

  return (
    <div className="App">
      <ToastContainer autoClose={3000}/>
      <AuthProvider value={{ user }}>
        <RoutesApp />
      </AuthProvider>
    </div>
  );
}

export default App;
