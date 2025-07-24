import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Signup from "./pages/Signup"
import Projects from "./pages/Projects"
import Dashboard from "./pages/Dashboard"
import Users from "./pages/Users"
import Settings from "./pages/Settings"
import Adminl from "./pages/Adminl"
import Login from "./pages/Login"
import "./app.css"
import Create from "./pages/Create"
import AddContact from "./componenets/AddContact"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/projects" element={<Projects/>}/>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/users" element={<Users/>}/>
      <Route path="/settings" element={<Settings/>}/>
      <Route path="/create" element={<Create/>}/>
      <Route path="/addContact" element={<AddContact/>}/>
      <Route path="/admin@123" element={<Adminl/>} />
    </Routes>
      
    </>
  )
}

export default App
