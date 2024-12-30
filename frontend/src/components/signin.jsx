import { FaUserGraduate } from "react-icons/fa"
import { BottomWarning } from "../Helpers/BottomWarning"
import { Button } from "../Helpers/Button"
import { Heading } from "../Helpers/Heading"
import { InputBox } from "../Helpers/InputBox"
import { SubHeading } from "../Helpers/SubHeading"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
 const Signin = () => {
    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const navigate=useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e=>{setusername(e.target.value)}} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={e=>{setpassword(e.target.value)}} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onPress={async ()=>{
           const response= await axios.post("http://localhost:3000/api/v1/user/signin",{
              username:username,
              password:password
            });
            localStorage.setItem("token",response.data.token)
            navigate('/dashboard')
          }} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}
export default Signin;

