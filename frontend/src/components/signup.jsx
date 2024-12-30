import { useState } from "react"
import { BottomWarning } from "../Helpers/BottomWarning"
import { Button } from "../Helpers/Button"
import { Heading } from "../Helpers/Heading"
import { InputBox } from "../Helpers/InputBox"
import { SubHeading } from "../Helpers/SubHeading"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
 const Signup = () => {
  const [firstName,setfirstName]=useState("");
  const [lastName,setlastName]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const navigate=useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e=>{setfirstName(e.target.value)}} placeholder="John" label={"First Name"} />
        <InputBox onChange={e=>{setlastName(e.target.value)}} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={e=>{setemail(e.target.value)}} placeholder="rishi@gmail.com" label={"Email"} />
        <InputBox onChange={e=>{setpassword(e.target.value)}} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onPress={async ()=>{
           const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
              username:email,
              firstName:firstName,
              lastName:lastName,
              password:password
            });
            localStorage.setItem("token",response.data.token);
            navigate('/dashboard');
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}
export default Signup;