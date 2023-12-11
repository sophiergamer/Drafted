"use client"
import Link from 'next/link';
import {useState} from 'react'
import { useRouter } from 'next/navigation';

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
<div className=" w-full max-w-sm border border-sky-900 rounded-lg shadow p-7">
<form onSubmit={signUserIn} className="w-full max-w-sm bg-sky-300 border border-sky-800 rounded-lg shadow p-7">
        <h5 className="text-xl font-medium text-slate ">Please log in below</h5>
        <br/>
            <label className="block mb-2 text-sm font-medium text-sky-800">Username:</label>
            <input required type="text" name="username" value={user.username} onChange={handleLogIn} className=" border border-slate text-black text-sm rounded-lg block w-full p-2.5"/>
        <br/>
            <label className="block mb-2 text-sm font-medium text-sky-800">Password:</label>
            <input required type="text" name="password" value={user.password} onChange={handleLogIn} className=" border border-slate text-black text-sm rounded-lg block w-full p-2.5"/>
            <button className="text-white font-medium rounded-lg text-sm p-2 m-2 text-center  bg-sky-500 hover:bg-sky-600" type="submit">Login to Drafted</button>
          </form>
    </div>
<br/>

<p>not yet using Drafted? <Link className="hover:underline"href="signup">sign up now!</Link></p>
</div>
)
}
