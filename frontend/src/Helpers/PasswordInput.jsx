import React, {useState} from "react";
import { FaRegEye ,FaRegEyeSlash} from 'react-icons/fa';
function PasswordInput({value,onChange,placeholder}){
    const [isShowpassword,setIsShowPassword]=useState(false);
    const toggleShowPassword=()=>{
        setIsShowPassword(!isShowpassword);
    }
return(
     <div className="flex items-center bg-transparent border=[1.5px] px-5 rounded mt-1">
        <input 
        value={value}
        onChange={onChange}
        type={isShowpassword ? "text": "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
        />
       {isShowpassword?(<FaRegEye 
       size={22}
       className="text-primary cursor-pointer"
       onClick={()=>toggleShowPassword()}
       />):(<FaRegEye
       size={22} className="text-slate-400 cursor-pointer"
       onClick={()=>toggleShowPassword()} />)}
        
     </div>
)
}

export default PasswordInput