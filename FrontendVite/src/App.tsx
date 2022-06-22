import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import FormLogin from './Componets/FormLogin'
import FormCreateUser from './Componets/FormCreateUser'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:userId" element={<Home />} />
        <Route path="/form/login" element={<FormLogin />} />
        <Route path="/form/create-login" element={<FormCreateUser />} />
      </Routes>
    </Router>
  )
}

export default App
