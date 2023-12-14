"use client"
import Link from 'next/link';
import {useState} from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Drafted from "../Drafted.png"
import draftedCopy from "../draftedCopy.png"

export default function LogIn(){
const [user, setUser] = useState({username:"", password:""})

const router = useRouter()

function handleLogIn(event){
    event.preventDefault();
    setUser({...user, [event.target.name]:event.target.value})
}

const userCred = {username:user.username, password:user.password}

function signUserIn(event){
    event.preventDefault();
    fetch('/api/login', {
        method: "POST", 
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(userCred)
    })
    .then(response=>response.json())
    .then(data=>{setUser(data)
    if (user){router.push("/dashboard")}
        })
}

return(
<div className='p-8'>
  <div className='flex p-5'>
    <div className=" w-full max-w-sm rounded-lg  p-7 ">
    <form onSubmit={signUserIn} className="w-full max-w-sm bg-sky-300 flex-none border border-sky-800 rounded-lg shadow p-7 font-rethink">
        <h5 className="text-xl text-slate ">Please log in below</h5>
        <br/>
            <label className="block mb-2 text-sm  text-sky-800">Username:</label>
            <input required type="text" name="username" value={user.username} onChange={handleLogIn} className=" border border-slate text-black text-sm rounded-lg block w-full p-2.5"/>
        <br/>
            <label className="block mb-2 text-sm  text-sky-800">Password:</label>
            <input required type="text" name="password" value={user.password} onChange={handleLogIn} className=" border border-slate text-black text-sm rounded-lg block w-full p-2.5"/>
            <button className="text-white rounded-lg text-sm p-2 mt-4 text-center  bg-sky-500 hover:bg-sky-600" type="submit">Login to Drafted</button>
          </form>
          <p>not yet using Drafted? <Link className="hover:underline"href="signup">sign up now!</Link></p>
        </div>
<br/>
<Image className="flex-auto p-7 rounded-full w-3/5 h-3/5" src={draftedCopy}
                  alt="logo"
                 height="500"
                  width="500"/>
</div>
</div>
)
}
