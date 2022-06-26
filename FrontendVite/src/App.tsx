import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import FormLogin from './pages/FormLogin'
import FormCreateUser from './pages/FormCreateUser'
import AdminServer from './pages/AdminServer'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminServer />} />
        <Route path="/" element={<Home />} />
        <Route path="/:userId" element={<Home />} />
        <Route path="/form/login" element={<FormLogin />} />
        <Route path="/form/create-login" element={<FormCreateUser />} />
      </Routes>
    </Router>
  )
}

export default App
