"use client"
import Link from 'next/link';
import {useState} from 'react'

export default function LogIn(){
const [user, setUser] = useState({username:"", password:""})

function handleLogIn(event){
    event.preventDefault();
    setLogIn({...user, [event.target.name]:event.target.value})
}

const userCred = {username:user.username, password:user.password}

function signUserIn(event){
    event.preventDefault();
    fetch('/api/login', {
        method: "POST", 
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(userCred)
    })
    .then(response=>response.json)
    .then(data=>setUser(data))
}

return(
<div>
<form onSubmit={signUserIn} className="space-y-6">
        <h5 className="text-xl font-medium text-slate dark:text-whiteish">Please log in below!</h5>
            <label className="block mb-2 text-sm font-medium ">Username:</label>
            <input required type="text" name="username" value={user.username} onChange={handleLogIn} className=" border border-slate text-black text-sm rounded-lg block w-full p-2.5"/>
  
            <label className="block mb-2 text-sm font-medium text-slate dark:text-white">Password:</label>
            <input required type="text" name="password" value={user.password} onChange={handleLogIn} className=" border border-slate text-black text-sm rounded-lg block w-full p-2.5"/>
            <button className="w-full text-whiteish font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Login to Drafted</button>
          </form>
<p>not yet using drafted? <Link href="signup">sign up now!</Link></p>
</div>
)
}
