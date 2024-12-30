import React from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signin from "./components/Signin"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import SendMoney from "./components/SendMoney"
function App() {

  return (
    <BrowserRouter>
         <Routes>
          <Route element={<Signin />} path="/signin"></Route>
          <Route element={<Signup />} path="/signup"></Route>
          <Route element={<Dashboard />} path="/dashboard"></Route>
          <Route element={<SendMoney />} path="/send" />
         </Routes>
    </BrowserRouter>
  )
}

export default App
