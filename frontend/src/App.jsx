import React from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signin from "./components/signin"
import Signup from "./components/signup"
import Update from "./components/update"
function App() {

  return (
    <BrowserRouter>
         <Routes>
          <Route element={<Signin />} path="/signin"></Route>
          <Route element={<Signup />} path="/signup"></Route>
          <Route element={<Update />} path="/update"></Route>
         </Routes>
    </BrowserRouter>
  )
}

export default App
